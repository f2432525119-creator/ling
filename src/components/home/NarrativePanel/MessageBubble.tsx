"use client";

import { clsx } from "clsx";
import { NarrativeMessage } from "./types";
import { useTypewriter } from "./useTypewriter";

interface MessageBubbleProps {
  message: NarrativeMessage;
  /** 是否启用打字机效果 */
  enableTypewriter?: boolean;
  /** 打字速度 */
  typewriterSpeed?: number;
  /** 是否为最新消息（用于触发打字机效果） */
  isLatest?: boolean;
}

export function MessageBubble({
  message,
  enableTypewriter = false,
  typewriterSpeed = 30,
  isLatest = false,
}: MessageBubbleProps) {
  const { displayText, isTyping } = useTypewriter({
    text: message.content,
    enabled: enableTypewriter && isLatest,
    speed: typewriterSpeed,
  });

  const content = enableTypewriter && isLatest ? displayText : message.content;

  // 根据角色返回不同的样式配置
  const getRoleConfig = () => {
    switch (message.role) {
      case "narrator":
        return {
          alignment: "center" as const,
          containerClass: "mx-auto max-w-[90%]",
          bubbleClass:
            "bg-elevated border border-border text-secondary italic",
          labelClass: "text-tertiary",
          label: "旁白",
        };
      case "character":
        return {
          alignment: "left" as const,
          containerClass: "mr-auto max-w-[85%]",
          bubbleClass: "bg-card border border-border text-foreground",
          labelClass: "text-primary font-medium",
          label: message.characterName || "角色",
        };
      case "user":
        return {
          alignment: "right" as const,
          containerClass: "ml-auto max-w-[85%]",
          bubbleClass: "bg-primary text-white",
          labelClass: "text-secondary",
          label: "你",
        };
      default:
        return {
          alignment: "left" as const,
          containerClass: "mr-auto max-w-[85%]",
          bubbleClass: "bg-card border border-border text-foreground",
          labelClass: "text-tertiary",
          label: "",
        };
    }
  };

  const config = getRoleConfig();

  return (
    <div
      className={clsx(
        "animate-fade-in flex flex-col gap-1",
        config.containerClass
      )}
    >
      {/* 角色标签 */}
      <span
        className={clsx(
          "text-xs",
          config.labelClass,
          config.alignment === "right" && "text-right",
          config.alignment === "center" && "text-center"
        )}
      >
        {config.label}
      </span>

      {/* 消息气泡 */}
      <div
        className={clsx(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed",
          config.bubbleClass,
          message.role === "narrator" && "text-center"
        )}
      >
        {content}
        {/* 打字机光标 */}
        {isTyping && (
          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current" />
        )}
      </div>
    </div>
  );
}
