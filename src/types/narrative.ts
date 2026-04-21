import type { StateUpdate, WorldState } from "@/types/world";

export type StoryChoice = {
  id: string;
  text: string;
  intent?: string;
  risk_level?: number;
};

export type StoryNodeMeta = {
  id: string;
  title: string;
  arc: string;
};

export type NarrativeNode = {
  id: string;
  parentId: string | null;
  narration: string;
  choices: StoryChoice[];
  meta: StoryNodeMeta;
};

export type NarrativeMessage = {
  id: string;
  role: "user" | "narrator";
  content: string;
  nodeId: string;
};

export type NarrativeApiNodeMeta = {
  id: string;
  title?: string;
  arc?: string;
  type?: string;
};

export type NarrativeApiResponse = {
  narration: string;
  choices: StoryChoice[];
  state_update: StateUpdate;
  next_node_meta: NarrativeApiNodeMeta;
  meta?: NarrativeApiMeta;
};

export type StructuredAIResponse = NarrativeApiResponse;

export type NarrativeMode = "ai_driven" | "user_driven" | "mixed";

export type HistorySummary = {
  recent_events: string[];
  locked_facts: string[];
  current_objective?: string;
};

export type NarrativeApiRequest = {
  mode: NarrativeMode;
  user_input: {
    text: string;
    selected_choice_id?: string | null;
  };
  world_state: Pick<
    WorldState,
    "tick" | "timeline" | "location" | "weather" | "tension" | "flags" | "characters" | "relations"
  >;
  current_node: {
    id: string;
    type: string;
    summary: string;
  };
  history_summary: HistorySummary;
  runtime?: {
    use_mock?: boolean;
    request_id?: string;
  };
};

export type NarrativeApiMeta = {
  fallback_used: boolean;
  warnings?: string[];
  parser_warnings?: string[];
};
