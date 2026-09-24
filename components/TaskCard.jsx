export default function TaskCard({ task, onStatusChange }) {
  const { id, title, description, dueDate, status } = task;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between">
        <span className="text-xs font-medium text-gray-500">TASK-{id}</span>
      </div>

      <h3 className="text-sm font-medium leading-5 text-gray-900">{title}</h3>

      {description && <p className="mt-2 text-xs leading-5 text-gray-500">{description}</p>}

      {dueDate && <p className="mt-3 text-xs text-gray-500">Due {dueDate}</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        <label className="sr-only" htmlFor={`status-${id}`}>Task status</label>
        <select
          id={`status-${id}`}
          value={status}
          onChange={(event) => onStatusChange(id, event.target.value)}
          className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600 outline-none focus:border-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
