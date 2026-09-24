export default function TaskCard({ task, onStatusChange, onDragStart, onEdit, onDelete }) {
  const { id, title, description, dueDate, status, priority = "medium" } = task;

  return (
    <article
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(id));
        onDragStart(id);
      }}
      className="group cursor-grab rounded border border-slate-700 bg-slate-800 p-3 shadow-sm transition hover:-translate-y-px hover:border-blue-500 hover:shadow-lg hover:shadow-slate-950/30 active:cursor-grabbing"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Task {id}</p>
        <span className={`rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${priority === "high" ? "bg-red-50 text-red-700" : priority === "low" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
          {priority}
        </span>
      </div>
      <h3 className="mt-2 text-[13px] font-semibold leading-5 text-slate-100">{title}</h3>

      {description && <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>}
      {dueDate && <p className="mt-3 text-xs font-medium text-amber-300">Due {dueDate}</p>}

      <div className="mt-3 flex items-center gap-3 border-t border-slate-700 pt-3">
        <button type="button" onClick={() => onEdit(task)} className="text-xs font-medium text-blue-400 opacity-80 hover:text-blue-300 group-hover:opacity-100">Edit</button>
        <button type="button" onClick={() => onDelete(task)} className="text-xs font-medium text-slate-500 opacity-80 hover:text-red-400 group-hover:opacity-100">Delete</button>
      </div>

      <div className="mt-4">
        <label className="sr-only" htmlFor={`status-${id}`}>Task status</label>
        <select
          id={`status-${id}`}
          value={status}
          onChange={(event) => onStatusChange(id, event.target.value)}
          className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs font-medium text-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-950"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </article>
  );
}
