import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  totalTasks,
  currentFilter,
  deleteTask,
  updateTask,
  toggleComplete,
}) {
  // No tasks created at all
  const hasNoTasksAtAll = totalTasks === 0;
  // Tasks exist, but none match the selected filter
  const hasNoTasksForFilter = totalTasks > 0 && tasks.length === 0;

  // Friendlier text for the selected filter
  const filterLabelMap = {
    all: "All",
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  return (
    <div className="space-y-3">
      {/* Empty state when user has not created any tasks yet */}
      {hasNoTasksAtAll && (
        <p className="text-[var(--color-text-secondary)]">No tasks yet...</p>
      )}

      {/* Empty state when tasks exist but none match current filter */}
      {hasNoTasksForFilter && (
        <p className="text-[var(--color-text-secondary)]">
          No tasks match the "{filterLabelMap[currentFilter] || currentFilter}"
          filter.
        </p>
      )}

      {/* Render each visible task */}
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
