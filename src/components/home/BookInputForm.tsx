"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

/** 表单提交数据类型 */
export interface BookInputData {
  bookTitle: string;
  synopsis: string;
}

interface BookInputFormProps {
  /** 表单提交回调 */
  onSubmit?: (data: BookInputData) => void;
  /** 是否处于加载状态 */
  loading?: boolean;
  /** 提交按钮文案 */
  submitText?: string;
}

export function BookInputForm({ 
  onSubmit, 
  loading = false,
  submitText = "开始体验" 
}: BookInputFormProps) {
  const [bookTitle, setBookTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !loading) {
      onSubmit?.({ bookTitle, synopsis });
    }
  };

  const isValid = bookTitle.trim().length > 0 && synopsis.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <Input
        label="书名"
        placeholder="输入你的书籍标题"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        disabled={loading}
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
          disabled={loading}
          className="w-full resize-none rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-tertiary transition-colors duration-200 hover:border-border-strong focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!isValid}
        loading={loading}
      >
        {submitText}
      </Button>
    </form>
  );
}
