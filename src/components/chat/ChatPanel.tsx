"use client";

import { InputBox } from "@/components/chat/InputBox";
import { MessageList } from "@/components/chat/MessageList";
import { useNarrativeStore } from "@/stores/useNarrativeStore";

export function ChatPanel() {
  const messages = useNarrativeStore((state) => state.messages);
  const isGenerating = useNarrativeStore((state) => state.isGenerating);
  const requestNarrative = useNarrativeStore((state) => state.requestNarrative);
  const commitNarrativeTurn = useNarrativeStore((state) => state.commitNarrativeTurn);

  async function handleSubmit(userInput: string) {
    const response = await requestNarrative(userInput);
    if (!response) return;
    commitNarrativeTurn({ userText: userInput, response });
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-black/10 px-4 py-3 text-sm text-black/60">
        对话叙事
      </div>
      <MessageList messages={messages} />
      <InputBox onSubmit={handleSubmit} loading={isGenerating} />
    </div>
  );
}
