"use client";

import { useEffect } from "react";
import ReactFlow, { Background, Controls } from "reactflow";

import { useGraphStore } from "@/stores/useGraphStore";
import { useNarrativeStore } from "@/stores/useNarrativeStore";

export function BranchGraph() {
  const graphNodes = useGraphStore((state) => state.nodes);
  const graphEdges = useGraphStore((state) => state.edges);
  const rebuildFromNarrative = useGraphStore((state) => state.rebuildFromNarrative);
  const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);
  const narrativeNodes = useNarrativeStore((state) => state.nodes);
  const currentNodeId = useNarrativeStore((state) => state.currentNodeId);

  useEffect(() => {
    rebuildFromNarrative(narrativeNodes, currentNodeId);
  }, [narrativeNodes, currentNodeId, rebuildFromNarrative]);

  return (
    <div className="h-full w-full">
      <div className="border-b border-black/10 px-4 py-3 text-sm text-black/60">
        分支树
      </div>
      <div className="h-[calc(100%-49px)] w-full">
        <ReactFlow
          nodes={graphNodes}
          edges={graphEdges}
          fitView
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
