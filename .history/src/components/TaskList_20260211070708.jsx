import TaskItem from "./TaskItem";

export default function TaskList({ tasks, deleteTask }) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 && <p className="text-gray-500">No tasks yet...</p>}

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
}
