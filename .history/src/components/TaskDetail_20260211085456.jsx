export default function TaskDetail({ task }) {
  return (
    <div className="mt-3 text-sm text-gray-700 space-y-1">
      <p>
        <span className="font-semibold">Description:</span>{" "}
        {task.description ? task.description : "No description"}
      </p>
      <p>
        <span className="font-semibold">Priority:</span> {task.priority}
      </p>
      <p>
        <span className="font-semibold">Status:</span> {task.status}
      </p>
    </div>
  );
}
