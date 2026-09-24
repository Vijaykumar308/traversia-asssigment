import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-950">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">T</span>
          Task Flow
        </Link>
        <span className="text-xs font-medium text-slate-400">Personal workspace</span>
      </div>
    </header>
  );
}
