"use client";

import { type FormEvent, useState } from "react";

import { InputBox } from "@/components/chat/InputBox";
import { MessageList } from "@/components/chat/MessageList";
import { useNarrativeStore } from "@/stores/useNarrativeStore";

export function ChatPanel() {
  const [text, setText] = useState("");
  const messages = useNarrativeStore((state) => state.messages);
  const isGenerating = useNarrativeStore((state) => state.isGenerating);
  const requestNarrative = useNarrativeStore((state) => state.requestNarrative);
  const commitNarrativeTurn = useNarrativeStore((state) => state.commitNarrativeTurn);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim() || isGenerating) {
      return;
    }

    const value = text.trim();
    setText("");

    const response = await requestNarrative(value);
    commitNarrativeTurn(value, response);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-black/10 px-4 py-3 text-sm text-black/60">
        对话叙事
      </div>
      <MessageList messages={messages} />
      <InputBox
        value={text}
        onValueChange={setText}
        onSubmit={handleSubmit}
        loading={isGenerating}
      />
    </div>
  );
}
