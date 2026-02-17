import { useEffect, useState } from "react";
import { createTask, listTasks, markTaskCompleted } from "../api/client";

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load tasks when the page opens.
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");
      const data = await listTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTask(event) {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      setSaving(true);
      setError("");
      await createTask({
        title: title.trim(),
        description: description.trim(),
      });

      // Reset form and refresh list after successful create.
      setTitle("");
      setDescription("");
      await loadTasks();
    } catch (err) {
      setError(err.message || "Failed to create task");
    } finally {
      setSaving(false);
    }
  }

  async function handleMarkCompleted(taskId) {
    try {
      setError("");
      await markTaskCompleted(taskId);
      await loadTasks();
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Task Page</h2>

      {error && (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form
        onSubmit={handleCreateTask}
        className="space-y-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
      >
        <h3 className="font-medium">Create Task</h3>

        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task title"
          className="w-full rounded border border-[var(--color-border)] p-2"
          maxLength={100}
        />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Task description"
          className="w-full rounded border border-[var(--color-border)] p-2"
          rows={3}
          maxLength={500}
        />

        <button
          type="submit"
          disabled={saving}
          className="rounded bg-[var(--color-primary)] px-4 py-2 text-white disabled:opacity-60"
        >
          {saving ? "Creating..." : "Create Task"}
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="font-medium">Tasks</h3>

        {loading && (
          <p className="text-sm text-[var(--color-text-secondary)]">
            Loading tasks...
          </p>
        )}

        {!loading && tasks.length === 0 && (
          <p className="text-sm text-[var(--color-text-secondary)]">
            No tasks found for this tenant.
          </p>
        )}

        {!loading &&
          tasks.map((task) => (
            <article
              key={task.id}
              className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="font-medium">{task.title}</p>
                <span className="text-xs uppercase text-[var(--color-text-secondary)]">
                  {task.status}
                </span>
              </div>

              <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
                {task.description || "No description"}
              </p>

              <button
                type="button"
                disabled={task.status === "completed"}
                onClick={() => handleMarkCompleted(task.id)}
                className="rounded bg-[var(--color-success)] px-3 py-2 text-sm text-white disabled:opacity-60"
              >
                {task.status === "completed"
                  ? "Already Completed"
                  : "Mark as Completed"}
              </button>
            </article>
          ))}
      </div>
    </section>
  );
}
