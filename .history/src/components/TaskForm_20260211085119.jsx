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
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="text"
        placeholder="Task title"
        className="w-full border p-3 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
      />

      <textarea
        placeholder="Task description (optional)"
        className="w-full border p-3 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
        rows={2}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          Priority
          <select
            className="mt-1 w-full border p-2 rounded"
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
            className="mt-1 w-full border p-2 rounded"
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
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
