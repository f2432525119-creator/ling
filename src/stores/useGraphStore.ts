import { create } from "zustand";

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
  setSelectedNodeId: (nodeId: string | null) => void;
};

export const useGraphStore = create<GraphStore>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  rebuildFromNarrative: (narrativeNodes, currentNodeId) => {
    const { nodes, edges } = buildGraphFromNarrative({
      narrativeNodes,
      currentNodeId,
    });
    set({ nodes, edges, selectedNodeId: currentNodeId });
  },
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
}));
