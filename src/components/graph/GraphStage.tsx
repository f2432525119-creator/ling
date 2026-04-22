"use client";

import { BranchGraph } from "@/components/graph/BranchGraph";
import { NodeDetailsOverlay } from "@/components/graph/NodeDetailsOverlay";
import { useGraphStore } from "@/stores/useGraphStore";
import { useNarrativeStore } from "@/stores/useNarrativeStore";

export function GraphStage() {
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);
  const narrativeNodes = useNarrativeStore((state) => state.nodes);

  const selectedNode = narrativeNodes.find((node) => node.id === selectedNodeId);

  return (
    <section className="flex h-full min-h-0 flex-col">
      <header className="flex items-center justify-between border-b border-black/10 px-4 py-3 text-sm text-black/60">
        <span>分支树</span>
        <span className="text-xs text-black/40">缩放 / 平移 / 选择</span>
      </header>
      <div className="relative min-h-0 flex-1">
        <BranchGraph />
        {selectedNode ? (
          <NodeDetailsOverlay node={selectedNode} onClose={() => setSelectedNodeId(null)} />
        ) : null}
      </div>
    </section>
  );
}
