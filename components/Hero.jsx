"use client";

import { useEffect, useState } from "react";
import ActionBanner from "./ActionBanner";
import Column from "./Column";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskCreationModal";

const STORAGE_KEY = "taskflow-tasks";
const initialTasks = [
  {
    id: 101,
    title: "Design task management dashboard",
    description: "Create a clear dashboard layout for tracking work.",
    dueDate: "",
    status: "todo",
  },
  {
    id: 102,
    title: "Create reusable button components",
    description: "Build the shared buttons used across the app.",
    dueDate: "",
    status: "in-progress",
  },
  {
    id: 103,
    title: "Setup project structure",
    description: "Organize the starter files for TaskFlow.",
    dueDate: "",
    status: "done",
  },
];

const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
];

export default function Hero() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    setTasks(savedTasks ? JSON.parse(savedTasks) : initialTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const updateStatus = (taskId, status) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const visibleTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ActionBanner
        search={search}
        onSearchChange={setSearch}
        onCreate={() => setIsModalOpen(true)}
      />

      <main className="p-4 sm:p-6">
        <div className="mb-5">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              TaskFlow
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              A simple place to track your work
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = visibleTasks.filter((task) => task.status === column.status);

            return (
              <Column
                key={column.status}
                title={column.title}
                count={columnTasks.length}
                onAddTask={() => setIsModalOpen(true)}
              >
                {columnTasks.length > 0 ? (
                  columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onStatusChange={updateStatus} />
                  ))
                ) : (
                  <p className="px-1 py-3 text-center text-sm text-gray-400">No tasks</p>
                )}
              </Column>
            );
          })}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={(task) => setTasks((currentTasks) => [...currentTasks, task])}
      />
    </div>
  );
}
