"use client";

import { useEffect, useRef } from "react";

import type { NarrativeMessage } from "@/types/narrative";

type MessageListProps = {
  messages: NarrativeMessage[];
};

export function MessageList({ messages }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
              message.role === "user"
                ? "bg-neutral-800 text-white"
                : "border border-neutral-200 bg-neutral-100 text-neutral-800"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
