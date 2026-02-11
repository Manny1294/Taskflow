import { useState } from "react";

function TaskForm({ addTask }) {
  // Local state for the input field
  const [title, setTitle] = useState("");

  // Runs when the form is submitted
  function handleSubmit(e) {
    e.preventDefault();

    // Prevent adding empty tasks
    if (!title.trim()) return;

    // Send the title up to the parent component (App)
    addTask(title);

    // Clear the input after submit
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

      <button type="submit" className="bg-blue-600 text-white px-6 rounded">
        Add
      </button>
    </form>
  );
}

export default TaskForm;
