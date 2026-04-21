import { create } from "zustand";

import { sampleNodes } from "@/data/mock/sampleNodes";
import { useGraphStore } from "@/stores/useGraphStore";
import { useSessionStore } from "@/stores/useSessionStore";
import { useWorldStore } from "@/stores/useWorldStore";
import type {
  NarrativeApiRequest,
  NarrativeApiResponse,
  NarrativeMessage,
  NarrativeMode,
  NarrativeNode,
} from "@/types/narrative";

type NarrativeStore = {
  nodes: NarrativeNode[];
  currentNodeId: string;
  messages: NarrativeMessage[];
  isGenerating: boolean;
  error: string | null;
  commitNarrativeTurn: (args: {
    response: NarrativeApiResponse;
    userText: string;
  }) => void;
  requestNarrative: (userInput: string, selectedChoiceId?: string | null) => Promise<NarrativeApiResponse | null>;
  setCurrentNodeId: (nodeId: string) => void;
  resetNarrative: () => void;
};

const rootNode = sampleNodes[0];

export const useNarrativeStore = create<NarrativeStore>((set, get) => ({
  nodes: sampleNodes,
  currentNodeId: rootNode.id,
  messages: [
    {
      id: "msg-root",
      role: "narrator",
      content: rootNode.narration,
      nodeId: rootNode.id,
    },
  ],
  isGenerating: false,
  error: null,
  commitNarrativeTurn: ({ response, userText }) => {
    const parentId = get().currentNodeId;
    const nextNodeId =
      typeof response.next_node_meta.id === "string" &&
      response.next_node_meta.id.trim().length > 0
        ? response.next_node_meta.id
        : `node-local-${Date.now()}`;

    const nextNode: NarrativeNode = {
      id: nextNodeId,
      parentId,
      narration: response.narration,
      choices: response.choices,
      meta: {
        id: nextNodeId,
        title: response.next_node_meta.title ?? "剧情推进",
        arc: response.next_node_meta.arc ?? "剧情推进",
      },
    };

    const updatedNodes = [...get().nodes, nextNode];

    set((state) => {
      const userMessage: NarrativeMessage = {
        id: `msg-user-${Date.now()}`,
        role: "user",
        content: userText,
        nodeId: parentId,
      };
      const narrationMessage: NarrativeMessage = {
        id: `msg-narrator-${Date.now() + 1}`,
        role: "narrator",
        content: response.narration,
        nodeId: nextNode.id,
      };
      return {
        nodes: updatedNodes,
        currentNodeId: nextNode.id,
        messages: [...state.messages, userMessage, narrationMessage],
      };
    });

    // 1) narrative is already updated above
    // 2) world store update
    useWorldStore.getState().applyStateUpdate(response.state_update);
    // 3) graph store rebuild
    useGraphStore.getState().rebuildFromNarrative(
      updatedNodes,
      nextNode.id,
    );
  },
  requestNarrative: async (userInput, selectedChoiceId = null) => {
    set({ isGenerating: true, error: null });
    try {
      const worldState = useWorldStore.getState().worldState;
      const session = useSessionStore.getState();
      const currentNodeId = get().currentNodeId;
      const currentNode = get().nodes.find((node) => node.id === currentNodeId);
      const recentEvents = get()
        .messages.filter((message) => message.role === "narrator")
        .slice(-3)
        .map((message) => message.content);

      const mode: NarrativeMode = session.mode === "sandbox" ? "user_driven" : "mixed";
      const payload: NarrativeApiRequest = {
        mode,
        user_input: { text: userInput, selected_choice_id: selectedChoiceId },
        world_state: {
          tick: worldState.tick,
          timeline: worldState.timeline,
          location: worldState.location,
          weather: worldState.weather,
          tension: worldState.tension,
          flags: worldState.flags.slice(0, 15),
          characters: worldState.characters,
          relations: worldState.relations,
        },
        current_node: {
          id: currentNode?.id ?? currentNodeId,
          type: "choice_point",
          summary: currentNode?.narration ?? "剧情继续推进",
        },
        history_summary: {
          recent_events: recentEvents,
          locked_facts: worldState.flags.slice(0, 5),
          current_objective: session.bookTitle,
        },
        runtime: {
          use_mock: false,
        },
      };

      const res = await fetch("/api/narrative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        set({ error: `narrative request failed with status ${res.status}` });
        return null;
      }

      const data = (await res.json()) as Partial<NarrativeApiResponse>;
      if (
        typeof data.narration !== "string" ||
        !Array.isArray(data.choices) ||
        !data.state_update ||
        !data.next_node_meta
      ) {
        set({ error: "narrative response missing required fields" });
        return null;
      }

      return data as NarrativeApiResponse;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "unexpected narrative request error";
      set({ error: message });
      return null;
    } finally {
      set({ isGenerating: false });
    }
  },
  setCurrentNodeId: (nodeId) => {
    const nodeExists = get().nodes.some((node) => node.id === nodeId);
    if (!nodeExists) return;

    set({ currentNodeId: nodeId });
  },
  resetNarrative: () => {
    set({
      nodes: sampleNodes,
      currentNodeId: rootNode.id,
      messages: [
        {
          id: "msg-root",
          role: "narrator",
          content: rootNode.narration,
          nodeId: rootNode.id,
        },
      ],
      isGenerating: false,
      error: null,
    });
    useGraphStore.getState().rebuildFromNarrative(sampleNodes, rootNode.id);
  },
}));
