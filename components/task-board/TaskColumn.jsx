export default function TaskColumn({ title, count, children, onAddTask }) {
  return (
    <section className="flex min-h-[420px] flex-col rounded-xl border border-slate-200 bg-slate-100/70">
      <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500">{count}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3">{children}</div>

      <button
        type="button"
        onClick={onAddTask}
        className="mx-3 mb-3 rounded-lg border border-dashed border-slate-300 py-2 text-sm text-slate-500 transition hover:border-blue-400 hover:bg-white hover:text-blue-700"
      >
        + Add task
      </button>
    </section>
  );
}
