import { create } from "zustand";

import { buildGraphFromNarrative } from "@/lib/graph/graphBuilder";
import type { StoryGraphEdge, StoryGraphNode } from "@/types/graph";
import type { NarrativeNode } from "@/types/narrative";

type GraphStore = {
  nodes: StoryGraphNode[];
  edges: StoryGraphEdge[];
  selectedNodeId: string | null;
  focusedNodeId: string | null;
  lastRebuildAt: number;
  rebuildFromNarrative: (
    narrativeNodes: NarrativeNode[],
    currentNodeId: string,
    options?: { selectedNodeId?: string | null },
  ) => void;
  selectNode: (nodeId: string | null) => void;
  focusNode: (nodeId: string | null) => void;
  resetGraph: () => void;
};

export const useGraphStore = create<GraphStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  focusedNodeId: null,
  lastRebuildAt: 0,
  rebuildFromNarrative: (narrativeNodes, currentNodeId, options) => {
    const prevSelectedNodeId = options?.selectedNodeId ?? get().selectedNodeId;
    const fallbackSelectedNodeId = narrativeNodes.some((node) => node.id === prevSelectedNodeId)
      ? prevSelectedNodeId
      : currentNodeId;

    const { nodes, edges } = buildGraphFromNarrative({
      narrativeNodes,
      currentNodeId,
      selectedNodeId: fallbackSelectedNodeId,
    });

    set({
      nodes,
      edges,
      selectedNodeId: fallbackSelectedNodeId,
      lastRebuildAt: Date.now(),
    });
  },
  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
  focusNode: (nodeId) => set({ focusedNodeId: nodeId }),
  resetGraph: () =>
    set({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      focusedNodeId: null,
      lastRebuildAt: Date.now(),
    }),
}));
