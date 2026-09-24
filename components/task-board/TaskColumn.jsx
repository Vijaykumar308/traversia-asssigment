export default function TaskColumn({ status, title, count, accent, children, onAddTask, isDragOver, onDragOver, onDragLeave, onTaskDrop }) {
  const handleDrop = (event) => {
    event.preventDefault();
    const taskId = Number(event.dataTransfer.getData("text/plain"));

    if (taskId) onTaskDrop(taskId, status);
  };

  return (
    <section
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        onDragOver();
      }}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
      className={`flex min-h-[460px] flex-col border-t-2 bg-slate-900/70 transition ${isDragOver ? "border-blue-500 bg-blue-950/40" : accent}`}
    >
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300">{title}</h2>
          <span className="flex h-5 min-w-5 items-center justify-center rounded bg-slate-800 px-1.5 text-[11px] font-semibold text-slate-400 shadow-sm">{count}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-2 pb-2">{children}</div>

      <button
        type="button"
        onClick={onAddTask}
        className="mx-2 mb-2 rounded border border-dashed border-slate-700 py-2 text-xs font-medium text-slate-500 transition hover:border-blue-500 hover:bg-slate-800 hover:text-blue-300"
      >
        + Add task
      </button>
    </section>
  );
}
