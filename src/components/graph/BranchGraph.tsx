"use client";

import { useEffect, useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";

import { useGraphStore } from "@/stores/useGraphStore";
import { useNarrativeStore } from "@/stores/useNarrativeStore";

const NODE_TYPES = {};
const EDGE_TYPES = {};

export function BranchGraph() {
  const graphNodes = useGraphStore((state) => state.nodes);
  const graphEdges = useGraphStore((state) => state.edges);
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const rebuildFromNarrative = useGraphStore((state) => state.rebuildFromNarrative);
  const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);
  const narrativeNodes = useNarrativeStore((state) => state.nodes);
  const currentNodeId = useNarrativeStore((state) => state.currentNodeId);

  useEffect(() => {
    rebuildFromNarrative(narrativeNodes, currentNodeId);
  }, [narrativeNodes, currentNodeId, rebuildFromNarrative]);

  const displayNodes = useMemo(
    () =>
      graphNodes.map((node) => {
        const isSelected = node.id === selectedNodeId;
        const isCurrent = node.data?.isCurrent;

        return {
          ...node,
          style: {
            borderRadius: 12,
            border: isCurrent
              ? "2px solid rgba(22, 163, 74, 0.8)"
              : isSelected
                ? "2px solid rgba(37, 99, 235, 0.85)"
                : "1px solid rgba(15, 23, 42, 0.2)",
            boxShadow: isCurrent
              ? "0 0 0 4px rgba(22, 163, 74, 0.18)"
              : isSelected
                ? "0 0 0 4px rgba(37, 99, 235, 0.14)"
                : "none",
            padding: 10,
            width: 220,
            background: "rgba(255,255,255,0.98)",
            color: "rgba(15, 23, 42, 0.88)",
            fontSize: 12,
            lineHeight: 1.4,
          },
        };
      }),
    [graphNodes, selectedNodeId],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={displayNodes}
        edges={graphEdges}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        fitView
        panOnDrag
        zoomOnPinch
        zoomOnScroll
        selectionOnDrag
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
        }}
        onPaneClick={() => setSelectedNodeId(null)}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} />
        <MiniMap pannable zoomable />
        <Controls showInteractive />
      </ReactFlow>
    </div>
  );
}
