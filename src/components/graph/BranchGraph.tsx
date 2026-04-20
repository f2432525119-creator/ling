"use client";

import { useEffect, useRef } from "react";
import ReactFlow, { Background, Controls, ReactFlowInstance } from "reactflow";

import { graphNodeTypes } from "@/components/graph/nodeTypes";
import { useGraphStore } from "@/stores/useGraphStore";
import { useNarrativeStore } from "@/stores/useNarrativeStore";

export function BranchGraph() {
  const graphNodes = useGraphStore((state) => state.nodes);
  const graphEdges = useGraphStore((state) => state.edges);
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const focusedNodeId = useGraphStore((state) => state.focusedNodeId);
  const lastRebuildAt = useGraphStore((state) => state.lastRebuildAt);
  const rebuildFromNarrative = useGraphStore((state) => state.rebuildFromNarrative);
  const selectNode = useGraphStore((state) => state.selectNode);
  const focusNode = useGraphStore((state) => state.focusNode);

  const narrativeNodes = useNarrativeStore((state) => state.nodes);
  const currentNodeId = useNarrativeStore((state) => state.currentNodeId);

  const flowRef = useRef<ReactFlowInstance | null>(null);

  useEffect(() => {
    rebuildFromNarrative(narrativeNodes, currentNodeId, { selectedNodeId });
  }, [narrativeNodes, currentNodeId, selectedNodeId, rebuildFromNarrative]);

  useEffect(() => {
    if (!flowRef.current || !focusedNodeId) return;
    const node = graphNodes.find((item) => item.id === focusedNodeId);
    if (!node) return;
    flowRef.current.setCenter(node.position.x + 120, node.position.y + 60, {
      zoom: 1,
      duration: 300,
    });
  }, [focusedNodeId, graphNodes]);

  useEffect(() => {
    if (!flowRef.current || graphNodes.length === 0) return;
    flowRef.current.fitView({ duration: 200, padding: 0.2 });
  }, [lastRebuildAt, graphNodes.length]);

  return (
    <div className="h-full w-full">
      <div className="border-b border-black/10 px-4 py-3 text-sm text-black/60">分支图</div>
      <div className="h-[calc(100%-49px)] w-full">
        <ReactFlow
          nodes={graphNodes}
          edges={graphEdges}
          nodeTypes={graphNodeTypes}
          onInit={(instance) => {
            flowRef.current = instance;
          }}
          onNodeClick={(_, node) => {
            selectNode(node.id);
            focusNode(node.id);
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
