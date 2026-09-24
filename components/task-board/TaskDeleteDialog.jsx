"use client";

export default function TaskDeleteDialog({ task, isDeleting, onCancel, onConfirm }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl shadow-black/40">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-lg text-red-600">!</div>
        <h2 className="mt-4 text-lg font-semibold">Delete this task?</h2>
        <p className="mt-2 text-sm leading-5 text-slate-500">
          &quot;{task.title}&quot; will be permanently removed from this board.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} disabled={isDeleting} className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
            {isDeleting ? "Deleting..." : "Delete task"}
          </button>
        </div>
      </div>
    </div>
  );
}
