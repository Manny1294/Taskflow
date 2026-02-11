import { useState } from "react";
import TaskDetail from "./TaskDetail";
import TaskEditForm from "./TaskEditForm";

export default function TaskItem({
  task,
  deleteTask,
  updateTask,
  toggleComplete,
}) {
  // Local UI state for showing details and edit form
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Save updates from the edit form
  function handleSave(updates) {
    updateTask(task.id, updates);
    setIsEditing(false);
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <div className="flex justify-between items-center gap-3">
        {/* Task title */}
        <p className="font-medium">{task.title}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleComplete(task.id)}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            {task.status === "done" ? "Mark Todo" : "Mark Done"}
          </button>

          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          {/* Delete button removes the task by id */}
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit form */}
      {isEditing && (
        <TaskEditForm task={task} onSave={handleSave} />
      )}

      {/* Details toggle */}
      {!isEditing && (
        <div>
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="text-sm text-blue-700"
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>

          {showDetails && <TaskDetail task={task} />}
        </div>
      )}
    </div>
  );
}
