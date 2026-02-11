export default function TaskItem({ task, deleteTask }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      {/* Task title */}
      <p>{task.title}</p>

      {/* Delete button removes the task by id */}
      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}
