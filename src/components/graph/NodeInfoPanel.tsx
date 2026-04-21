"use client";

import { useGraphStore } from "@/stores/useGraphStore";
import { useNarrativeStore } from "@/stores/useNarrativeStore";

export function NodeInfoPanel() {
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const nodeData = useNarrativeStore((state) =>
    state.nodes.find((node) => node.id === selectedNodeId),
  );

  if (!selectedNodeId || !nodeData) return null;


  const checks = (nodeData.meta as { requiresChecks?: string[] }).requiresChecks;

  return (
    <div className="absolute right-4 top-4 z-20 w-72 rounded-lg border border-neutral-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
      <h3 className="mb-3 border-b border-neutral-100 pb-2 text-sm font-semibold text-neutral-800">
        节点详情 ({nodeData.id})
      </h3>
      <div className="space-y-3 text-xs text-neutral-600">
        <div>
          <span className="font-medium text-neutral-800">摘要: </span>
          {nodeData.narration || "无"}
        </div>
        <div>
          <span className="font-medium text-neutral-800">分支类型: </span>
          {nodeData.meta.arc || "标准叙事"}
        </div>
        {checks && checks.length > 0 ? (
          <div className="rounded bg-neutral-100 p-2">
            <span className="font-medium text-neutral-800">必要检定: </span>
            {checks.join(", ")}
          </div>
        ) : null}
      </div>
    </div>
  );
}
