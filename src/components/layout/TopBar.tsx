import { useSessionStore } from "@/stores/useSessionStore";

export function TopBar() {
  const bookTitle = useSessionStore((state) => state.bookTitle);
  const mode = useSessionStore((state) => state.mode);

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-white/80 px-4 py-4 backdrop-blur sm:px-6">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.2em] text-black/45">Book</p>
        <h1 className="truncate text-base font-medium text-black/85">{bookTitle}</h1>
      </div>
      <span className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-xs text-black/60">
        {mode}
      </span>
    </header>
  );
}
