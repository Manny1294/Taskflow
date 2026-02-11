export default function TaskDetail({ task }) {
  return (
    <div className="mt-3 text-sm text-[var(--color-text-secondary)] space-y-1">
      {/* Description */}
      <p>
        <span className="font-semibold">Description:</span>{" "}
        {task.description ? task.description : "No description"}
      </p>
      {/* Priority */}
      <p>
        <span className="font-semibold">Priority:</span> {task.priority}
      </p>
      {/* Status */}
      <p>
        <span className="font-semibold">Status:</span> {task.status}
      </p>
    </div>
  );
}
