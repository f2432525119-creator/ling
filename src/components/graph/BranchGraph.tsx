"use client";

import { useEffect, useMemo, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type EdgeTypes,
  type NodeTypes,
} from "reactflow";

import { useGraphStore } from "@/stores/useGraphStore";
import { useNarrativeStore } from "@/stores/useNarrativeStore";

const NODE_TYPES: NodeTypes = {};
const EDGE_TYPES: EdgeTypes = {};

export function BranchGraph() {
  const graphNodes = useGraphStore((state) => state.nodes);
  const graphEdges = useGraphStore((state) => state.edges);
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);

  const narrativeNodes = useNarrativeStore((state) => state.nodes);
  const narrativeNodeCount = useNarrativeStore((state) => state.nodes.length);
  const currentNodeId = useNarrativeStore((state) => state.currentNodeId);

  const latestNarrativeNodesRef = useRef(narrativeNodes);
  const lastBuildRef = useRef<{ count: number; currentNodeId: string | null } | null>(null);

  useEffect(() => {
    latestNarrativeNodesRef.current = narrativeNodes;
  }, [narrativeNodes]);

  useEffect(() => {
    const lastBuild = lastBuildRef.current;
    if (
      lastBuild &&
      lastBuild.count === narrativeNodeCount &&
      lastBuild.currentNodeId === currentNodeId
    ) {
      return;
    }

    lastBuildRef.current = {
      count: narrativeNodeCount,
      currentNodeId,
    };

    useGraphStore
      .getState()
      .rebuildFromNarrative(latestNarrativeNodesRef.current, currentNodeId);
  }, [narrativeNodeCount, currentNodeId]);

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

  const displayEdges = useMemo(() => graphEdges, [graphEdges]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={displayNodes}
        edges={displayEdges}
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
