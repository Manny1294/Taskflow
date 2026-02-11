import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    addTask(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter task..."
        className="flex-1 border p-3 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-6 rounded">Add</button>
    </form>
  );
}

export default TaskForm;
