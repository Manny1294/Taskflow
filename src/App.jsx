import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";

function App() {
  // Keep tasks in localStorage so they persist after refresh/browser close
  const [tasks, setTasks] = useLocalStorage("taskflow_tasks", []);
  // Track the active filter for the list
  const [filter, setFilter] = useState("all");

  // Add one new task
  function addTask(formData) {
    const now = Date.now();

    const newTask = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description || "",
      priority: formData.priority || "medium",
      status: formData.status || "todo",
      createdAt: now,
      updatedAt: now,
    };

    // Create a new array with the new task added
    setTasks([...tasks, newTask]);
  }

  // Delete a task by its id
  function deleteTask(id) {
    // Keep only tasks that do NOT match the id
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  }

  // Update a task by its id
  function updateTask(id, updates) {
    const now = Date.now();

    const updated = tasks.map((task) => {
      if (task.id !== id) return task;

      return {
        ...task,
        ...updates,
        updatedAt: now,
      };
    });

    setTasks(updated);
  }

  // Toggle a task between done and todo
  function toggleComplete(id) {
    const updated = tasks.map((task) => {
      if (task.id !== id) return task;

      const nextStatus = task.status === "done" ? "todo" : "done";

      return {
        ...task,
        status: nextStatus,
        updatedAt: Date.now(),
      };
    });

    setTasks(updated);
  }

  // Build the visible list based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6 text-[var(--color-text)]">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">TaskFlow</h1>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto">
        <TaskForm addTask={addTask} />
        <FilterButtons filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          totalTasks={tasks.length}
          currentFilter={filter}
          deleteTask={deleteTask}
          updateTask={updateTask}
          toggleComplete={toggleComplete}
        />
      </main>
    </div>
  );
}

export default App;
