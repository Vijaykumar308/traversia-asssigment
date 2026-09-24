export default function TaskCard({ task, onStatusChange }) {
  const { id, title, description, dueDate, status, priority = "medium" } = task;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Task {id}</p>
        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${priority === "high" ? "bg-red-50 text-red-700" : priority === "low" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
          {priority}
        </span>
      </div>
      <h3 className="mt-2 text-sm font-semibold leading-5 text-slate-900">{title}</h3>

      {description && <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>}
      {dueDate && <p className="mt-3 text-xs font-medium text-amber-700">Due {dueDate}</p>}

      <div className="mt-4">
        <label className="sr-only" htmlFor={`status-${id}`}>Task status</label>
        <select
          id={`status-${id}`}
          value={status}
          onChange={(event) => onStatusChange(id, event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </article>
  );
}
