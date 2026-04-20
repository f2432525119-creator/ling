"use client";

import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  /** 完整文本 */
  text: string;
  /** 是否启用打字机效果 */
  enabled?: boolean;
  /** 每个字符的延迟时间（ms） */
  speed?: number;
  /** 开始前的延迟（ms） */
  delay?: number;
}

interface UseTypewriterReturn {
  /** 当前显示的文本 */
  displayText: string;
  /** 是否正在打字 */
  isTyping: boolean;
  /** 是否已完成 */
  isComplete: boolean;
}

export function useTypewriter({
  text,
  enabled = true,
  speed = 30,
  delay = 0,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayText, setDisplayText] = useState(enabled ? "" : text);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(!enabled);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    // 重置状态
    indexRef.current = 0;
    setDisplayText("");
    setIsComplete(false);

    // 延迟开始
    const delayTimer = setTimeout(() => {
      setIsTyping(true);

      const typeInterval = setInterval(() => {
        if (indexRef.current < text.length) {
          indexRef.current += 1;
          setDisplayText(text.slice(0, indexRef.current));
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [text, enabled, speed, delay]);

  return { displayText, isTyping, isComplete };
}
