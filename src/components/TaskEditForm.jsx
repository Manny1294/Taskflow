import { useState } from "react";

export default function TaskEditForm({ task, onSave }) {
  // Local state for the edit form
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "medium");
  const [status, setStatus] = useState(task.status || "todo");

  // Runs when the edit form is submitted
  function handleSubmit(e) {
    e.preventDefault();

    // Prevent saving empty titles
    if (!title.trim()) return;

    // Send updates back to the parent
    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        className="w-full border p-2 rounded bg-[var(--color-surface)] text-[var(--color-text)]"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
      />

      <textarea
        className="w-full border p-2 rounded bg-[var(--color-surface)] text-[var(--color-text)]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
        rows={3}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          Priority
          <select
            className="mt-1 w-full border p-2 rounded bg-[var(--color-surface)] text-[var(--color-text)]"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className="text-sm">
          Status
          <select
            className="mt-1 w-full border p-2 rounded bg-[var(--color-surface)] text-[var(--color-text)]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:brightness-95"
      >
        Save Changes
      </button>
    </form>
  );
}
