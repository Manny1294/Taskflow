import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // add task
  function addTask(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      status: "todo",
    };

    setTasks([...tasks, newTask]);
  }

  // delete task
  function deleteTask(id) {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">TaskFlow</h1>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto">
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </main>
    </div>
  );
}

export default App;
