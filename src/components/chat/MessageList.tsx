import type { NarrativeMessage } from "@/types/narrative";

type MessageListProps = {
  messages: NarrativeMessage[];
};

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      {messages.map((message) => (
        <article
          key={message.id}
          className={`rounded-xl px-3 py-2 text-sm leading-relaxed animate-fade-in ${
            message.role === "user"
              ? "ml-auto w-[85%] bg-primary text-white"
              : "mr-auto w-[90%] border border-border bg-card text-secondary"
          }`}
        >
          {message.content}
        </article>
      ))}
    </div>
  );
}
