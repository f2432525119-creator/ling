"use client";

import ReactFlow, { Background, Controls } from "reactflow";

import { useGraphStore } from "@/stores/useGraphStore";

import { NodeInfoPanel } from "./NodeInfoPanel";

export function BranchGraph() {
  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);
  const onNodesChange = useGraphStore((state) => state.onNodesChange);
  const onEdgesChange = useGraphStore((state) => state.onEdgesChange);
  const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-[#FAFAFA]"
      >
        <Background color="#ccc" gap={16} />
        <Controls showInteractive={false} className="border-neutral-200 shadow-sm" />
      </ReactFlow>

      <NodeInfoPanel />
    </div>
  );
}
