import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="border-b border-slate-800 bg-[#080d1a] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        <div className="flex items-center gap-7">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-blue-500 text-xs font-black">T</span>
            TaskFlow
          </Link>
          <span className="hidden h-5 w-px bg-slate-800 sm:block" />
          <span className="hidden text-xs font-medium text-slate-400 sm:block">Personal workspace</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-slate-500 md:block">Tasks</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold">JD</span>
        </div>
      </div>
    </header>
  );
}
