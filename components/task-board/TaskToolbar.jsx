export default function TaskToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onCreate,
}) {
  return (
    <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Projects</span>
          <span className="text-slate-700">/</span>
          <span className="font-semibold text-slate-200">My tasks</span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          <label className="relative sm:w-64">
            <span className="sr-only">Search tasks</span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search tasks"
              className="w-full rounded border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-950 sm:w-60"
            />
            <span className="absolute left-3 top-2.5 text-slate-400">⌕</span>
          </label>
          <label className={statusFilter !== "all" ? "rounded bg-blue-950/70" : ""}>
            <span className="sr-only">Filter by status</span>
            <select
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value)}
              className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-950 sm:w-auto"
            >
              <option value="all">All statuses</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>
          <label className={priorityFilter !== "all" ? "rounded bg-blue-950/70" : ""}>
            <span className="sr-only">Filter by priority</span>
            <select
              value={priorityFilter}
              onChange={(event) => onPriorityFilterChange(event.target.value)}
              className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-950 sm:w-auto"
            >
              <option value="all">All priorities</option>
              <option value="high">High priority</option>
              <option value="medium">Medium priority</option>
              <option value="low">Low priority</option>
            </select>
          </label>
          <button
            type="button"
            onClick={onCreate}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            + New task
          </button>
        </div>
      </div>
    </div>
  );
}
