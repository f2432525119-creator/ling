"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

interface StoryFormProps {
  onSubmit?: (data: { bookTitle: string; synopsis: string }) => void;
}

export function StoryForm({ onSubmit }: StoryFormProps) {
  const [bookTitle, setBookTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ bookTitle, synopsis });
  };

  const isValid = bookTitle.trim().length > 0 && synopsis.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        label="书名"
        placeholder="输入你的书籍标题"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="synopsis"
          className="text-sm font-medium text-secondary"
        >
          剧情摘要
        </label>
        <textarea
          id="synopsis"
          placeholder="描述你的故事背景、主要人物和核心冲突..."
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-tertiary transition-colors duration-200 hover:border-border-strong focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!isValid}
      >
        开始体验
      </Button>
    </form>
  );
}
