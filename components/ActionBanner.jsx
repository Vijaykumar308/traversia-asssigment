export default function ActionBanner({ search, onSearchChange, onCreate }) {
  return (
    <div className="border-b bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="relative flex-1 sm:max-w-xs">
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">⌕</span>
        </div>

        <button
          onClick={onCreate}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create task
        </button>
      </div>
    </div>
  );
}
