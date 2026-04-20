import type { StoryGraphEdge, StoryGraphNode } from "@/types/graph";
import type { NarrativeNode } from "@/types/narrative";

type BuildGraphInput = {
  narrativeNodes: NarrativeNode[];
  currentNodeId: string;
};

export function buildGraphFromNarrative({
  narrativeNodes,
  currentNodeId,
}: BuildGraphInput): { nodes: StoryGraphNode[]; edges: StoryGraphEdge[] } {
  const nodes = narrativeNodes.map((node, index) => ({
    id: node.id,
    position: {
      x: (index % 3) * 280,
      y: Math.floor(index / 3) * 180,
    },
    data: {
      label: node.meta.title,
      arc: node.meta.arc,
      isCurrent: node.id === currentNodeId,
    },
    type: "default",
  }));

  const edges = narrativeNodes
    .filter((node) => node.parentId)
    .map((node) => ({
      id: `edge-${node.parentId}-${node.id}`,
      source: node.parentId!,
      target: node.id,
      animated: node.id === currentNodeId,
    }));

  return { nodes, edges };
}
