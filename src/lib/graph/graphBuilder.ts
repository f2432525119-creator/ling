import type { StoryGraphEdge, StoryGraphNode } from "@/types/graph";
import type { NarrativeNode, NarrativeNodeType } from "@/types/narrative";

const COLUMN_GAP = 280;
const ROW_GAP = 170;

type BuildGraphInput = {
  narrativeNodes: NarrativeNode[];
  currentNodeId: string;
  selectedNodeId?: string | null;
};

function normalizeNodeType(type: NarrativeNode["meta"]["type"]): NarrativeNodeType {
  if (
    type === "scene" ||
    type === "decision" ||
    type === "event" ||
    type === "transition" ||
    type === "revelation" ||
    type === "consequence"
  ) {
    return type;
  }
  return "scene";
}

function normalizeImportance(importance: number | undefined, type: NarrativeNodeType): number {
  if (typeof importance === "number") return Math.min(1, Math.max(0, importance));
  if (type === "decision" || type === "revelation") return 0.9;
  if (type === "consequence") return 0.8;
  if (type === "event") return 0.75;
  if (type === "transition") return 0.55;
  return 0.65;
}

function buildDepthMap(narrativeNodes: NarrativeNode[]): Map<string, number> {
  const nodeById = new Map(narrativeNodes.map((node) => [node.id, node]));
  const depthById = new Map<string, number>();

  const getDepth = (nodeId: string): number => {
    if (depthById.has(nodeId)) return depthById.get(nodeId) ?? 0;
    const node = nodeById.get(nodeId);
    if (!node || !node.parentId) {
      depthById.set(nodeId, 0);
      return 0;
    }
    if (!nodeById.has(node.parentId)) {
      depthById.set(nodeId, 0);
      return 0;
    }
    const depth = getDepth(node.parentId) + 1;
    depthById.set(nodeId, depth);
    return depth;
  };

  for (const node of narrativeNodes) getDepth(node.id);
  return depthById;
}

function getCurrentPathNodeSet(
  narrativeNodes: NarrativeNode[],
  currentNodeId: string,
): Set<string> {
  const set = new Set<string>();
  const nodeById = new Map(narrativeNodes.map((node) => [node.id, node]));

  let cursor: string | null = currentNodeId;
  while (cursor) {
    set.add(cursor);
    const node = nodeById.get(cursor);
    cursor = node?.parentId ?? null;
  }

  return set;
}

export function buildGraphFromNarrative({
  narrativeNodes,
  currentNodeId,
  selectedNodeId,
}: BuildGraphInput): { nodes: StoryGraphNode[]; edges: StoryGraphEdge[] } {
  const depthById = buildDepthMap(narrativeNodes);
  const laneCounter = new Map<number, number>();
  const currentPathNodeSet = getCurrentPathNodeSet(narrativeNodes, currentNodeId);
  const nodeById = new Map(narrativeNodes.map((node) => [node.id, node]));

  const nodes = narrativeNodes.map((node) => {
    const semanticType = normalizeNodeType(node.meta.type);
    const depth = depthById.get(node.id) ?? 0;
    const lane = laneCounter.get(depth) ?? 0;
    laneCounter.set(depth, lane + 1);
    const isOrphan = Boolean(node.parentId && !nodeById.has(node.parentId));

    return {
      id: node.id,
      position: {
        x: depth * COLUMN_GAP,
        y: lane * ROW_GAP,
      },
      data: {
        title: node.meta.title,
        arc: node.meta.arc,
        semanticType,
        importance: normalizeImportance(node.meta.importance, semanticType),
        preview: node.narration.slice(0, 68),
        choiceCount: node.choices.length,
        isCurrent: node.id === currentNodeId,
        isSelected: node.id === selectedNodeId,
        isRoot: node.parentId === null,
        isOrphan,
      },
      type: `${semanticType}Node`,
    } satisfies StoryGraphNode;
  });

  const edges = narrativeNodes
    .filter((node) => node.parentId)
    .map((node) => {
      const isActivePath =
        currentPathNodeSet.has(node.id) && currentPathNodeSet.has(node.parentId as string);

      return {
        id: `edge-${node.parentId}-${node.id}`,
        source: node.parentId!,
        target: node.id,
        animated: isActivePath,
        data: { isActivePath },
      } satisfies StoryGraphEdge;
    });

  return { nodes, edges };
}
