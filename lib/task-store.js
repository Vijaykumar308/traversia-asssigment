const initialTasks = [
  {
    id: 101,
    title: "Design task management dashboard",
    description: "Create a clear dashboard layout for tracking work.",
    dueDate: "",
    status: "todo",
    priority: "high",
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: 102,
    title: "Create reusable button components",
    description: "Build the shared buttons used across the app.",
    dueDate: "",
    status: "in-progress",
    priority: "medium",
    createdAt: "2026-01-11T09:00:00.000Z",
  },
  {
    id: 103,
    title: "Setup project structure",
    description: "Organize the starter files for TaskFlow.",
    dueDate: "",
    status: "done",
    priority: "low",
    createdAt: "2026-01-12T09:00:00.000Z",
  },
];

const store = globalThis.__taskflowStore ?? {
  tasks: initialTasks,
  nextId: 104,
};

globalThis.__taskflowStore = store;

export function getTasks() {
  return store.tasks;
}

export function createTask({ title, description = "", dueDate = "", priority = "medium" }) {
  const task = {
    id: store.nextId,
    title: title.trim(),
    description: description.trim(),
    dueDate,
    status: "todo",
    priority,
    createdAt: new Date().toISOString(),
  };

  store.nextId += 1;
  store.tasks.push(task);

  return task;
}

export function updateTaskStatus(id, status) {
  return updateTask(id, { status });
}

export function updateTask(id, changes) {
  const task = store.tasks.find((item) => item.id === id);

  if (!task) return null;

  Object.assign(task, changes);
  return task;
}

export function deleteTask(id) {
  const taskIndex = store.tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) return null;

  const [deletedTask] = store.tasks.splice(taskIndex, 1);
  return deletedTask;
}
