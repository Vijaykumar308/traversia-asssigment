import React from 'react'

export default function ActionBanner() {
  return (
    <div className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: filters */}
        <div className="flex items-center gap-2">
          <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Filters
          </button>

          <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600">
            Assignee
          </button>

          <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600">
            Priority
          </button>

          <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600">
            Labels
          </button>

          <button className="px-2 text-sm text-blue-600 hover:underline">
            Clear filters
          </button>
        </div>

        {/* Right: search + actions */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-64 rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              ⌕
            </span>
          </div>

          <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Sort
          </button>

          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            + Create
          </button>
        </div>
      </div>
    </div>
  );
}
