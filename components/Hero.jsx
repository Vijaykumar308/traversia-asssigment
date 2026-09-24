import React from 'react'
import ActionBanner from './ActionBanner'
import TaskCard from './TaskCard';
import Column from './Column';


export default function Hero() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ActionBanner />

      <main className="p-6">
        {/* Board header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              My Tasks
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your team's work
            </p>
          </div>

          <div className="flex -space-x-2">
            {["JD", "AM", "SK", "RK"].map((user) => (
              <div
                key={user}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs font-semibold text-blue-700"
              >
                {user}
              </div>
            ))}
          </div>
        </div>

        {/* Jira-style board */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Column title="To Do" count={4}>
            <TaskCard
              id="TASK-101"
              title="Design task management dashboard"
              priority="High"
              assignee="JD"
              labels={["UI", "Design"]}
            />

            <TaskCard
              id="TASK-102"
              title="Create reusable button components"
              priority="Medium"
              assignee="AM"
              labels={["Frontend"]}
            />

            <TaskCard
              id="TASK-103"
              title="Add user authentication flow"
              priority="High"
              assignee="RK"
              labels={["Auth", "Backend"]}
            />
         </Column>

          <Column title="In Progress" count={2}>
            <TaskCard
              id="TASK-98"
              title="Implement project board"
              priority="High"
              assignee="SK"
              labels={["Frontend", "React"]}
            />

            <TaskCard
              id="TASK-99"
              title="Build task filtering system"
              priority="Medium"
              assignee="JD"
              labels={["Feature"]}
            />
          </Column>

          <Column title="Done" count={3}>
            <TaskCard
              id="TASK-94"
              title="Setup project structure"
              priority="Low"
              assignee="AM"
              labels={["Setup"]}
            />

            <TaskCard
              id="TASK-95"
              title="Create database schema"
              priority="Medium"
              assignee="RK"
              labels={["Database"]}
            />
          </Column>
        </div>
      </main>
    </div>
  );
}
