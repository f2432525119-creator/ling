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
    <form onSubmit={handleSubmit} className="border-t border-black/10 p-3">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="输入你的行动..."
          className="h-10 flex-1 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-black/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-10 rounded-lg bg-black px-4 text-sm text-white disabled:opacity-40"
        >
          {loading ? "生成中" : "发送"}
        </button>
      </div>
    </form>
  );
}
