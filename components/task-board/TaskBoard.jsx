"use client";

import { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskCreationModal from "./TaskCreationModal";
import TaskCard from "./TaskCard";
import TaskToolbar from "./TaskToolbar";

const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load tasks.");
        return response.json();
      })
      .then((data) => setTasks(data.tasks))
      .catch((loadError) => setError(loadError.message))
      .finally(() => setIsLoading(false));
  }, []);

  const updateStatus = async (taskId, status) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to update task.");
      return;
    }

    setTasks((currentTasks) => currentTasks.map((task) => task.id === taskId ? data.task : task));
  };

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || (task.priority || "medium") === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <TaskToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        onCreate={() => setIsModalOpen(true)}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="mb-7">
          <p className="text-sm font-medium text-slate-500">A focused view of your work</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Keep momentum, one task at a time.</h1>
        </div>

        {error && <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}

        {isLoading ? (
          <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">Loading tasks...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {columns.map((column) => {
              const columnTasks = visibleTasks.filter((task) => task.status === column.status);

              return (
                <TaskColumn key={column.status} title={column.title} count={columnTasks.length} onAddTask={() => setIsModalOpen(true)}>
                  {columnTasks.length > 0 ? columnTasks.map((task) => <TaskCard key={task.id} task={task} onStatusChange={updateStatus} />) : <p className="px-1 py-8 text-center text-sm text-slate-400">No tasks here</p>}
                </TaskColumn>
              );
            })}
          </div>
        )}
      </main>

      <TaskCreationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTaskCreated={(task) => setTasks((currentTasks) => [...currentTasks, task])} />
    </div>
  );
}
