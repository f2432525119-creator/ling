"use client";

import { ConsistencyIndicator } from "@/components/world/ConsistencyIndicator";
import { useWorldStore } from "@/stores/useWorldStore";

export function WorldStatePanel() {
  const worldState = useWorldStore((state) => state.worldState);

  return (
    <div className="h-full p-4">
      <div className="mb-4 text-sm text-black/60">世界状态</div>
      <div className="space-y-3 text-sm">
        <div className="rounded-lg border border-black/10 p-3">
          <p className="text-black/45">时间线</p>
          <p className="mt-1 font-medium">{worldState.timeline}</p>
        </div>
        <div className="rounded-lg border border-black/10 p-3">
          <p className="text-black/45">地点</p>
          <p className="mt-1 font-medium">{worldState.location}</p>
        </div>
        <div className="rounded-lg border border-black/10 p-3">
          <p className="text-black/45">紧张度</p>
          <p className="mt-1 font-medium">{worldState.tension}</p>
        </div>
        <ConsistencyIndicator status={worldState.tension > 80 ? "warning" : "stable"} />
      </div>
    </div>
  );
}
