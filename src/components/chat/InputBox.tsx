"use client";

import { FormEvent, useState } from "react";

type InputBoxProps = {
  onSubmit: (text: string) => Promise<void>;
  loading?: boolean;
};

export function InputBox({ onSubmit, loading = false }: InputBoxProps) {
  const [text, setText] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim() || loading) return;
    const value = text.trim();
    setText("");
    await onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-3">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="输入你的行动..."
          className="h-10 flex-1 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-tertiary outline-none transition-colors duration-200 hover:border-border-strong focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "生成中" : "发送"}
        </button>
      </div>
    </form>
  );
}
