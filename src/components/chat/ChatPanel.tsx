"use client";

import { InputBox } from "@/components/chat/InputBox";
import { MessageList } from "@/components/chat/MessageList";
import { useNarrativeStore } from "@/stores/useNarrativeStore";

export function ChatPanel() {
  const messages = useNarrativeStore((state) => state.messages);
  const isGenerating = useNarrativeStore((state) => state.isGenerating);
  const currentNode = useNarrativeStore((state) => state.currentNode);
  const submitTurn = useNarrativeStore((state) => state.submitTurn);
  const error = useNarrativeStore((state) => state.error);

  async function handleSubmit(userInput: string) {
    const text = userInput.trim();
    if (!text || isGenerating) return;

    try {
      await submitTurn(text);
    } catch {
      // 错误状态建议由 store 统一维护
    }
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-500">
        对话叙事
      </div>

      <MessageList messages={messages} />

      {error ? (
        <div className="border-t border-red-100 bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {currentNode?.choices && currentNode.choices.length > 0 ? (
        <div className="flex flex-col gap-2 border-t border-neutral-100 bg-[#FAFAFA] p-4">
          <span className="mb-1 text-xs text-neutral-400">选择行动或直接输入...</span>
          {currentNode.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              disabled={isGenerating}
              onClick={() => handleSubmit(choice.text)}
              className="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-left text-sm text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:bg-neutral-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {choice.text}
            </button>
          ))}
        </div>
      ) : null}

      <InputBox onSubmit={handleSubmit} loading={isGenerating} />
    </div>
  );
}
