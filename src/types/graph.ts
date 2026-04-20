import type { Edge, Node } from "reactflow";

import type { NarrativeNodeType } from "@/types/narrative";

export type StoryGraphNodeData = {
  title: string;
  arc: string;
  semanticType: NarrativeNodeType;
  importance: number;
  preview: string;
  choiceCount: number;
  isCurrent: boolean;
  isSelected: boolean;
  isRoot: boolean;
  isOrphan: boolean;
};

export type StoryGraphEdgeData = {
  isActivePath: boolean;
};

export type StoryGraphNode = Node<StoryGraphNodeData>;
export type StoryGraphEdge = Edge<StoryGraphEdgeData>;
