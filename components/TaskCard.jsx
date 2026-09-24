export default function TaskCard({ id, title, priority, assignee, labels }) {
  return (
    <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow">
      <div className="mb-2 flex items-start justify-between">
        <span className="text-xs font-medium text-gray-500">{id}</span>

        <button className="text-gray-400 opacity-0 transition group-hover:opacity-100">
          •••
        </button>
      </div>

      <h3 className="mb-3 text-sm font-medium leading-5 text-gray-900">
        {title}
      </h3>

      <div className="mb-4 flex flex-wrap gap-1">
        {labels.map((label) => (
          <span
            key={label}
            className="rounded bg-gray-100 px-2 py-1 text-[11px] text-gray-600"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`rounded px-2 py-1 text-[11px] font-medium ${
            priority === "High"
              ? "bg-red-50 text-red-600"
              : priority === "Medium"
              ? "bg-yellow-50 text-yellow-700"
              : "bg-green-50 text-green-600"
          }`}
        >
          {priority}
        </span>

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
          {assignee}
        </div>
      </div>
    </div>
  );
}
