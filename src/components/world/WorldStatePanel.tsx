"use client";

import { ConsistencyIndicator } from "@/components/world/ConsistencyIndicator";
import { useWorldStore } from "@/stores/useWorldStore";

function StateCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-3">
      <p className="text-black/45">{label}</p>
      <p className="mt-1 font-medium text-black/85">{value}</p>
    </div>
  );
}

export function WorldStatePanel() {
  const worldState = useWorldStore((state) => state.worldState);
  const warnings = useWorldStore((state) => state.warnings);

  const latestWarnings = warnings.slice(-3).reverse();
  const pendingEffects = worldState.delayedEffects.filter((effect) => effect.status === "pending");

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-black/10 px-4 py-3 text-sm text-black/60">世界状态</div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        <section className="grid grid-cols-2 gap-3">
          <StateCard label="时间线" value={worldState.timeline} />
          <StateCard label="地点" value={worldState.location} />
          <StateCard label="天气" value={worldState.weather} />
          <StateCard label="紧张度" value={worldState.tension} />
          <StateCard label="Tick" value={worldState.tick} />
          <StateCard label="待触发效果" value={pendingEffects.length} />
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-3">
          <p className="text-xs uppercase tracking-[0.15em] text-black/45">State Update</p>
          <p className="mt-2 text-xs text-black/55">last_update_id</p>
          <p className="font-mono text-xs text-black/80">{worldState.lastUpdateId ?? "(none yet)"}</p>

          <div className="mt-3 space-y-2">
            <p className="text-xs text-black/55">recent update events</p>
            {latestWarnings.length === 0 ? (
              <p className="text-xs text-black/45">暂无更新告警事件。</p>
            ) : (
              latestWarnings.map((warning) => (
                <article key={`${warning.code}-${warning.tick}-${warning.message}`} className="rounded-md border border-black/10 bg-black/[0.02] p-2">
                  <p className="text-[11px] text-black/70">[{warning.code}] tick={warning.tick}</p>
                  <p className="text-xs text-black/80">{warning.message}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-3">
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-black/45">Flags</p>
          <div className="flex flex-wrap gap-2">
            {worldState.flags.map((flag) => (
              <span key={flag} className="rounded-full border border-black/10 px-2 py-1 text-xs text-black/70">
                {flag}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-3">
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-black/45">Characters</p>
          <div className="space-y-2">
            {Object.values(worldState.characters).map((character) => (
              <article key={character.id} className="rounded-md border border-black/10 p-2">
                <p className="text-xs font-medium text-black/80">{character.name}</p>
                <p className="text-xs text-black/55">关系: {character.relationLabel ?? "未知"}</p>
                <p className="text-xs text-black/55">信任: {character.trust ?? 0}</p>
              </article>
            ))}
          </div>
        </section>

        <ConsistencyIndicator status={worldState.tension > 80 ? "warning" : "stable"} />
      </div>
    </div>
  );
}
