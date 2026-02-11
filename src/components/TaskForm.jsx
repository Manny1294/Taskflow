import { useState } from "react";

function TaskForm({ addTask }) {
  // Local state for each form field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");

  // Runs when the form is submitted
  function handleSubmit(e) {
    e.preventDefault();

    // Prevent adding empty tasks
    if (!title.trim()) return;

    // Send the full task data up to the parent component (App)
    addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    });

    // Clear the input after submit
    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("todo");
  }

  return (
    // TASK TITLE
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="text"
        placeholder="Task title"
        className="w-full border p-3 rounded bg-[var(--color-surface)] text-[var(--color-text)]"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
      />

      {/* TASK DESCRIPTION */}
      <textarea
        placeholder="Task description (optional)"
        className="w-full border p-3 rounded bg-[var(--color-surface)] text-[var(--color-text)]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
        rows={3}
      />

      {/* TASK PRIORITY */}
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

        {/* TASK STATUS */}
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
        className="bg-[var(--color-primary)] text-white px-6 py-2 rounded hover:brightness-95"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
