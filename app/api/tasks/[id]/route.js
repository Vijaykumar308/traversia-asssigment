import { deleteTask, updateTask } from "@/lib/task-store";

const validStatuses = new Set(["todo", "in-progress", "done"]);
const validPriorities = new Set(["low", "medium", "high"]);

export async function PATCH(request, { params }) {
  const body = await request.json();
  const { id } = await params;
  const changes = {};

  if (body.status !== undefined) {
    if (!validStatuses.has(body.status)) {
      return Response.json({ error: "Invalid task status." }, { status: 400 });
    }
    changes.status = body.status;
  }

  if (body.priority !== undefined) {
    if (!validPriorities.has(body.priority)) {
      return Response.json({ error: "Invalid task priority." }, { status: 400 });
    }
    changes.priority = body.priority;
  }

  for (const field of ["title", "description", "dueDate"]) {
    if (body[field] !== undefined) {
      if (typeof body[field] !== "string" || (field === "title" && !body[field].trim())) {
        return Response.json({ error: `Invalid task ${field}.` }, { status: 400 });
      }
      changes[field] = field === "title" || field === "description" ? body[field].trim() : body[field];
    }
  }

  if (Object.keys(changes).length === 0) {
    return Response.json({ error: "No task changes provided." }, { status: 400 });
  }

  const task = updateTask(Number(id), changes);

  if (!task) {
    return Response.json({ error: "Task not found." }, { status: 404 });
  }

  return Response.json({ task });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const task = deleteTask(Number(id));

  if (!task) {
    return Response.json({ error: "Task not found." }, { status: 404 });
  }

  return Response.json({ task });
}
