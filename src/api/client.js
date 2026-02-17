// Base URL for the backend API.
// You can override this in a .env file with VITE_API_BASE_URL.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";

// Read the active demo user/tenant from environment variables.
// Defaults point to tenant 1 admin for easy local testing.
function getSessionFromEnv() {
  return {
    tenantId: import.meta.env.VITE_TENANT_ID || "1",
    userId: import.meta.env.VITE_USER_ID || "1",
    role: import.meta.env.VITE_USER_ROLE || "admin",
  };
}

// Small shared request helper so every API call uses the same headers and error handling.
async function apiRequest(path, options = {}) {
  const session = getSessionFromEnv();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "x-tenant-id": String(options.tenantId || session.tenantId),
      "x-user-id": String(options.userId || session.userId),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const responseBody = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  // Convert non-2xx responses into normal JavaScript errors
  // so pages can show user-friendly messages.
  if (!response.ok) {
    const message =
      typeof responseBody === "string"
        ? responseBody
        : responseBody?.message || "Request failed";
    throw new Error(message);
  }

  return responseBody;
}

// Expose session details so UI can decide if user is admin.
export function getCurrentSession() {
  return getSessionFromEnv();
}

// GET /tasks
export function listTasks() {
  return apiRequest("/tasks");
}

// POST /tasks
export function createTask(taskData) {
  return apiRequest("/tasks", {
    method: "POST",
    body: {
      title: taskData.title,
      description: taskData.description,
      status: "pending",
    },
  });
}

// PATCH /tasks/:id
export function markTaskCompleted(taskId) {
  return apiRequest(`/tasks/${taskId}`, {
    method: "PATCH",
    body: { status: "completed" },
  });
}

// POST /tasks/export
export function triggerExport() {
  return apiRequest("/tasks/export", { method: "POST" });
}

// GET /exports/:id
export function fetchExportStatus(jobId) {
  return apiRequest(`/exports/${jobId}`);
}

// Build full file URL for CSV download links.
export function getExportDownloadUrl(fileUrl) {
  return `${API_BASE_URL}${fileUrl}`;
}
