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
            className="bg-green-600 text-white p-2 rounded"
            aria-label={task.status === "done" ? "Mark todo" : "Mark done"}
            title={task.status === "done" ? "Mark todo" : "Mark done"}
          >
            {task.status === "done" ? (
              // Arrow to return to todo
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7v6h6" />
                <path d="M3 13c2.5-3 6-5 10-5 4.5 0 7.5 2.5 8.5 6" />
              </svg>
            ) : (
              // Checkmark
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="bg-blue-600 text-white p-2 rounded"
            aria-label={isEditing ? "Cancel edit" : "Edit task"}
            title={isEditing ? "Cancel edit" : "Edit task"}
          >
            {isEditing ? (
              // X icon for cancel
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            ) : (
              // Pencil icon for edit
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            )}
          </button>

          {/* Delete button removes the task by id */}
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white p-2 rounded"
            aria-label="Delete task"
            title="Delete task"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="M6 6l1 14h10l1-14" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit form */}
      {isEditing && <TaskEditForm task={task} onSave={handleSave} />}

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
