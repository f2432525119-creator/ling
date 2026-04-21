import {
  applyEdgeChanges,
  applyNodeChanges,
  type EdgeChange,
  type NodeChange,
} from "reactflow";
import { create } from "zustand";

import { sampleNodes } from "@/data/mock/sampleNodes";
import { buildGraphFromNarrative } from "@/lib/graph/graphBuilder";
import type { StoryGraphEdge, StoryGraphNode } from "@/types/graph";
import type { NarrativeNode } from "@/types/narrative";

type GraphStore = {
  nodes: StoryGraphNode[];
  edges: StoryGraphEdge[];
  selectedNodeId: string | null;
  rebuildFromNarrative: (
    narrativeNodes: NarrativeNode[],
    currentNodeId: string,
  ) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
};

const rootNodeId = sampleNodes[0]?.id ?? null;
const initialGraph = rootNodeId
  ? buildGraphFromNarrative({
      narrativeNodes: sampleNodes,
      currentNodeId: rootNodeId,
    })
  : { nodes: [], edges: [] };

export const useGraphStore = create<GraphStore>((set) => ({
  nodes: initialGraph.nodes,
  edges: initialGraph.edges,
  selectedNodeId: rootNodeId,
  rebuildFromNarrative: (narrativeNodes, currentNodeId) => {
    const { nodes, edges } = buildGraphFromNarrative({
      narrativeNodes,
      currentNodeId,
    });
    set({ nodes, edges, selectedNodeId: currentNodeId });
  },
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
}));
