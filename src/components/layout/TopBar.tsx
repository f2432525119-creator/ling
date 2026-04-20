import { useSessionStore } from "@/stores/useSessionStore";

export function TopBar() {
  const bookTitle = useSessionStore((state) => state.bookTitle);
  const mode = useSessionStore((state) => state.mode);

  return (
    <header className="flex items-center justify-between border-b border-black/10 px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-black/45">Book</p>
        <h1 className="text-base font-medium text-black/85">{bookTitle}</h1>
      </div>
      <span className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/60">
        {mode}
      </span>
    </header>
  );
}
