"use client";

import { ConsistencyIndicator } from "@/components/world/ConsistencyIndicator";
import { useWorldStore } from "@/stores/useWorldStore";

export function WorldStatePanel() {
  const worldState = useWorldStore((state) => state.worldState);

  return (
    <div className="h-full p-4">
      <div className="mb-4 text-sm text-secondary">世界状态</div>
      <div className="space-y-3 text-sm">
        <div className="rounded-lg border border-border bg-card p-3 transition-colors duration-200 hover:border-border-strong">
          <p className="text-tertiary">时间线</p>
          <p className="mt-1 font-medium text-foreground">{worldState.timeline}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 transition-colors duration-200 hover:border-border-strong">
          <p className="text-tertiary">地点</p>
          <p className="mt-1 font-medium text-foreground">{worldState.location}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 transition-colors duration-200 hover:border-border-strong">
          <p className="text-tertiary">紧张度</p>
          <p className="mt-1 font-medium text-foreground">{worldState.tension}</p>
        </div>
        <ConsistencyIndicator status={worldState.tension > 80 ? "warning" : "stable"} />
      </div>
    </div>
  );
}
