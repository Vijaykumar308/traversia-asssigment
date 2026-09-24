"use client";

import { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskCreationModal from "./TaskCreationModal";
import TaskCard from "./TaskCard";
import TaskDeleteDialog from "./TaskDeleteDialog";
import TaskToolbar from "./TaskToolbar";

const columns = [
  { title: "To Do", status: "todo", accent: "border-slate-300" },
  { title: "In Progress", status: "in-progress", accent: "border-amber-400" },
  { title: "Done", status: "done", accent: "border-emerald-500" },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragOverStatus, setDragOverStatus] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
    const currentTask = tasks.find((task) => task.id === taskId);

    if (!currentTask || currentTask.status === status) return;

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

  const handleTaskDrop = async (taskId, status) => {
    setDragOverStatus("");
    await updateStatus(taskId, status);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const deleteSelectedTask = async () => {
    if (!taskToDelete) return;

    setIsDeleting(true);
    const response = await fetch(`/api/tasks/${taskToDelete.id}`, { method: "DELETE" });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to delete task.");
    } else {
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskToDelete.id));
      setTaskToDelete(null);
    }

    setIsDeleting(false);
  };

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || (task.priority || "medium") === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
  const completedCount = tasks.filter((task) => task.status === "done").length;
  const completionPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <TaskToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        onCreate={openCreateModal}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Personal workspace / Board</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">My tasks</h1>
            <p className="mt-2 text-sm text-slate-400">Plan, prioritize, and keep work moving.</p>
          </div>
          <div className="min-w-56">
            <div className="mb-2 flex justify-between text-xs text-slate-500">
              <span>Completion</span>
              <span className="font-semibold text-slate-200">{completionPercent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${completionPercent}%` }} />
            </div>
            <div className="mt-2 flex gap-4 text-xs text-slate-500">
              <span><strong className="text-slate-200">{tasks.length}</strong> total</span>
              <span><strong className="text-slate-200">{completedCount}</strong> completed</span>
            </div>
          </div>
        </div>

        {error && <p className="mb-4 rounded-lg border border-red-900/60 bg-red-950/60 px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}

        {isLoading ? (
          <p className="border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-400">Loading tasks...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {columns.map((column) => {
              const columnTasks = visibleTasks.filter((task) => task.status === column.status);

              return (
                <TaskColumn
                  key={column.status}
                  status={column.status}
                  title={column.title}
                  count={columnTasks.length}
                  accent={column.accent}
                  isDragOver={dragOverStatus === column.status}
                  onDragOver={() => setDragOverStatus(column.status)}
                  onDragLeave={() => setDragOverStatus("")}
                  onTaskDrop={handleTaskDrop}
                  onAddTask={openCreateModal}
                >
                  {columnTasks.length > 0 ? columnTasks.map((task) => <TaskCard key={task.id} task={task} onStatusChange={updateStatus} onDragStart={() => setDragOverStatus("")} onEdit={openEditModal} onDelete={setTaskToDelete} />) : <p className="px-1 py-8 text-center text-sm text-slate-400">Drop a task here</p>}
                </TaskColumn>
              );
            })}
          </div>
        )}
      </main>

      <TaskCreationModal
        isOpen={isModalOpen}
        taskToEdit={editingTask}
        onClose={closeTaskModal}
        onTaskCreated={(task) => setTasks((currentTasks) => [...currentTasks, task])}
        onTaskUpdated={(updatedTask) => {
          setTasks((currentTasks) => currentTasks.map((task) => task.id === updatedTask.id ? updatedTask : task));
          closeTaskModal();
        }}
      />
      <TaskDeleteDialog task={taskToDelete} isDeleting={isDeleting} onCancel={() => setTaskToDelete(null)} onConfirm={deleteSelectedTask} />
    </div>
  );
}
