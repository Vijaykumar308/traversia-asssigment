export default function Column({ title, count, children }) {
  return (
    <section className="flex min-h-[600px] flex-col rounded-lg bg-gray-100/70">
      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>

          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
            {count}
          </span>
        </div>

        <button className="text-gray-500 hover:text-gray-800">•••</button>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-3 px-3 pb-3">{children}</div>

      {/* Add task */}
      <button className="mx-3 mb-3 rounded-md border border-dashed border-gray-300 py-2 text-sm text-gray-500 hover:border-gray-400 hover:bg-white hover:text-gray-700">
        + Add task
      </button>
    </section>
  );
}