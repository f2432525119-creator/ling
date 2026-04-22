import { MessageBubble } from "@/components/narrative/MessageBubble";
import { TypingIndicator } from "@/components/narrative/TypingIndicator";
import type { NarrativeMessage } from "@/types/narrative";

type MessageListProps = {
  messages: NarrativeMessage[];
  isTyping?: boolean;
};

export function MessageList({ messages, isTyping = false }: MessageListProps) {
  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isTyping ? <TypingIndicator /> : null}
    </div>
  );
}
