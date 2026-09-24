import { updateTaskStatus } from "@/lib/task-store";

const validStatuses = new Set(["todo", "in-progress", "done"]);

export async function PATCH(request, { params }) {
  const { status } = await request.json();
  const { id } = await params;

  if (!validStatuses.has(status)) {
    return Response.json({ error: "Invalid task status." }, { status: 400 });
  }

  const task = updateTaskStatus(Number(id), status);

  if (!task) {
    return Response.json({ error: "Task not found." }, { status: 404 });
  }

  return Response.json({ task });
}
