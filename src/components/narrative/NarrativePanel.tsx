"use client";

import { InputBox } from "@/components/chat/InputBox";
import { ChoiceActions } from "@/components/narrative/ChoiceActions";
import { MessageList } from "@/components/narrative/MessageList";
import { useNarrativeStore } from "@/stores/useNarrativeStore";
import type { StoryChoice } from "@/types/narrative";

export function NarrativePanel() {
  const messages = useNarrativeStore((state) => state.messages);
  const nodes = useNarrativeStore((state) => state.nodes);
  const currentNodeId = useNarrativeStore((state) => state.currentNodeId);
  const isGenerating = useNarrativeStore((state) => state.isGenerating);
  const error = useNarrativeStore((state) => state.error);
  const requestNarrative = useNarrativeStore((state) => state.requestNarrative);
  const commitNarrativeTurn = useNarrativeStore((state) => state.commitNarrativeTurn);

  const currentNode = nodes.find((node) => node.id === currentNodeId);
  const choices = currentNode?.choices ?? [];

  async function runNarrativeTurn(userText: string, selectedChoiceId: string | null = null) {
    const response = await requestNarrative(userText, selectedChoiceId);
    if (!response) return;

    commitNarrativeTurn({
      response,
      userText,
    });
  }

  async function handleChoice(choice: StoryChoice) {
    await runNarrativeTurn(choice.text, choice.id);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-black/10 px-4 py-3 text-sm text-black/60">对话叙事</div>
      {error ? (
        <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
          生成失败：{error}
        </div>
      ) : null}
      <MessageList messages={messages} isTyping={isGenerating} />
      <ChoiceActions choices={choices} disabled={isGenerating} onChoose={handleChoice} />
      <InputBox onSubmit={runNarrativeTurn} loading={isGenerating} />
    </div>
  );
}
