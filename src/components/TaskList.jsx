import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  deleteTask,
  updateTask,
  toggleComplete,
}) {
  return (
    <div className="space-y-3">
      {/* Empty state when there are no tasks */}
      {tasks.length === 0 && (
        <p className="text-[var(--color-text-secondary)]">No tasks yet...</p>
      )}

      {/* Render each task */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          updateTask={updateTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}
