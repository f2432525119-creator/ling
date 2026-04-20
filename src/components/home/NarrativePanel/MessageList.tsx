"use client";

import { useEffect, useRef } from "react";
import { NarrativeMessage } from "./types";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: NarrativeMessage[];
  enableTypewriter?: boolean;
  typewriterSpeed?: number;
}

export function MessageList({
  messages,
  enableTypewriter = false,
  typewriterSpeed = 30,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 space-y-4 overflow-y-auto p-4 scroll-smooth"
    >
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          enableTypewriter={enableTypewriter}
          typewriterSpeed={typewriterSpeed}
          isLatest={index === messages.length - 1}
        />
      ))}
    </div>
  );
}
