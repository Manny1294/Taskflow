import { useEffect, useMemo, useState } from "react";
import {
  fetchExportStatus,
  getExportDownloadUrl,
  triggerExport,
} from "../api/client";

export default function ExportPage() {
  const [jobId, setJobId] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Build full browser URL only when fileUrl exists.
  const downloadUrl = useMemo(() => {
    if (!fileUrl) return "";
    return getExportDownloadUrl(fileUrl);
  }, [fileUrl]);

  async function startExport() {
    try {
      setLoading(true);
      setError("");
      setStatus("starting");
      setProgress(0);
      setFileUrl("");

      const result = await triggerExport();
      setJobId(String(result.jobId));
      setStatus("waiting");
    } catch (err) {
      setError(err.message || "Failed to start export");
      setStatus("");
    } finally {
      setLoading(false);
    }
  }

  // Poll job status every 2 seconds until completion/failure.
  useEffect(() => {
    if (!jobId) return undefined;
    if (status === "completed" || status === "failed") return undefined;

    const intervalId = window.setInterval(async () => {
      try {
        const result = await fetchExportStatus(jobId);
        setStatus(result.status || "");
        setProgress(result.progress || 0);

        if (result.fileUrl) {
          setFileUrl(result.fileUrl);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch export status");
        setStatus("failed");
      }
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [jobId, status]);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Admin Export Page</h2>

      {error && (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <button
          type="button"
          onClick={startExport}
          disabled={loading}
          className="rounded bg-[var(--color-primary)] px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Starting Export..." : "Export Tasks"}
        </button>
      </div>

      {jobId && (
        <div className="space-y-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
          <p>
            <span className="font-medium">Job ID:</span> {jobId}
          </p>
          <p>
            <span className="font-medium">Status:</span> {status || "unknown"}
          </p>
          <p>
            <span className="font-medium">Progress:</span> {progress}%
          </p>

          {downloadUrl && (
            <a
              href={downloadUrl}
              className="inline-block rounded bg-[var(--color-success)] px-3 py-2 text-white"
            >
              Download CSV
            </a>
          )}
        </div>
      )}
    </section>
  );
}
