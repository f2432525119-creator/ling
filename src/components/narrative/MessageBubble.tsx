import type { NarrativeMessage } from "@/types/narrative";

type MessageBubbleProps = {
  message: NarrativeMessage;
};

const roleLabel: Record<NarrativeMessage["role"], string> = {
  narrator: "Narrator",
  character: "Character",
  user: "You",
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const bubbleClassName =
    message.role === "user"
      ? "ml-auto w-[85%] bg-black text-white"
      : message.role === "character"
        ? "mr-auto w-[90%] border border-indigo-200 bg-indigo-50 text-indigo-900"
        : "mr-auto w-[90%] border border-black/10 bg-white text-black/80";

  return (
    <article className={`rounded-xl px-3 py-2 text-sm leading-6 ${bubbleClassName}`}>
      <p className="mb-1 text-[10px] uppercase tracking-[0.15em] opacity-60">{roleLabel[message.role]}</p>
      <p>{message.content}</p>
    </article>
  );
}
