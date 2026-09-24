"use client";

import { useState } from "react";

const emptyTask = { title: "", description: "", dueDate: "", priority: "medium" };

export default function TaskCreationModal({ isOpen, onClose, onTaskCreated }) {
  const [task, setTask] = useState(emptyTask);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setTask((currentTask) => ({ ...currentTask, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Unable to create task.");

      onTaskCreated(data.task);
      setTask(emptyTask);
      onClose();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">New task</p>
            <h2 className="mt-1 text-xl font-semibold">Create a task</h2>
          </div>
          <button type="button" onClick={onClose} className="text-2xl leading-none text-slate-400 hover:text-slate-700" aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="task-title">Task title</label>
            <input id="task-title" type="text" name="title" value={task.title} onChange={handleChange} placeholder="What needs to be done?" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="task-description">Description <span className="font-normal text-slate-400">(optional)</span></label>
            <textarea id="task-description" name="description" value={task.description} onChange={handleChange} placeholder="Add a little context" rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="task-due-date">Due date <span className="font-normal text-slate-400">(optional)</span></label>
            <input id="task-due-date" type="date" name="dueDate" value={task.dueDate} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="task-priority">Priority</label>
            <select id="task-priority" name="priority" value={task.priority} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Creating..." : "Create task"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
