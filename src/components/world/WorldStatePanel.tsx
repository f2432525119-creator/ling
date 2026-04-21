"use client";

import { useWorldStore } from "@/stores/useWorldStore";

export function WorldStatePanel() {
  const worldState = useWorldStore((state) => state.worldState);

  if (!worldState) {
    return <div className="p-6 text-sm text-neutral-400">世界尚未构建...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="border-b border-neutral-200 pb-3 text-sm font-medium text-neutral-500">
        当前世界状态
      </div>

      <section className="space-y-1">
        <h4 className="text-xs font-semibold uppercase text-neutral-400">Time & Location</h4>
        <div className="text-sm text-neutral-800">{worldState.timeline}</div>
        <div className="text-sm text-neutral-600">{worldState.location}</div>
      </section>

      <section className="space-y-2">
        <div className="flex justify-between text-xs">
          <h4 className="font-semibold uppercase text-neutral-400">Tension</h4>
          <span className="text-neutral-600">{worldState.tension}/100</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full bg-neutral-800 transition-all duration-500 ease-in-out"
            style={{ width: `${Math.min(100, Math.max(0, worldState.tension))}%` }}
          />
        </div>
      </section>

      <section className="space-y-2">
        <h4 className="text-xs font-semibold uppercase text-neutral-400">Active Flags</h4>
        <div className="flex flex-wrap gap-2">
          {worldState.flags?.length > 0 ? (
            worldState.flags.map((flag) => (
              <span key={flag} className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-700">
                {flag}
              </span>
            ))
          ) : (
            <span className="text-xs text-neutral-400">暂无标记</span>
          )}
        </div>
      </section>

      <section className="space-y-2">
        <h4 className="text-xs font-semibold uppercase text-neutral-400">Relations</h4>
        <ul className="space-y-2 text-sm text-neutral-700">
          {Object.entries(worldState.relations || {}).map(([character, status]) => (
            <li key={character} className="flex justify-between border-b border-neutral-50 pb-1">
              <span>{character}</span>
              <span className="text-neutral-500">{status as string}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
