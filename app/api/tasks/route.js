import { createTask, getTasks } from "@/lib/task-store";

const validStatuses = new Set(["todo", "in-progress", "done"]);
const validPriorities = new Set(["low", "medium", "high"]);

export async function GET() {
  return Response.json({ tasks: getTasks() });
}

export async function POST(request) {
  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";

  if (!title) {
    return Response.json({ error: "Task title is required." }, { status: 400 });
  }

  if (body.status && !validStatuses.has(body.status)) {
    return Response.json({ error: "Invalid task status." }, { status: 400 });
  }

  if (body.priority && !validPriorities.has(body.priority)) {
    return Response.json({ error: "Invalid task priority." }, { status: 400 });
  }

  const task = createTask({
    title,
    description: typeof body.description === "string" ? body.description : "",
    dueDate: typeof body.dueDate === "string" ? body.dueDate : "",
    priority: validPriorities.has(body.priority) ? body.priority : "medium",
  });

  return Response.json({ task }, { status: 201 });
}
