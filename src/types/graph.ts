import type { Edge, Node } from "reactflow";

export type StoryGraphNodeData = {
  label: string;
  arc: string;
  isCurrent: boolean;
};

export type StoryGraphNode = Node<StoryGraphNodeData>;
export type StoryGraphEdge = Edge;
