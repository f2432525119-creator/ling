"use client";

import { useState } from "react";

import { useNarrativeStore } from "@/stores/useNarrativeStore";
import { useSessionStore } from "@/stores/useSessionStore";
import { useWorldStore } from "@/stores/useWorldStore";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs uppercase tracking-[0.15em] text-black/45">{children}</p>
  );
}

function TitleEditor() {
  const bookTitle = useSessionStore((s) => s.bookTitle);
  const setBookTitle = useSessionStore((s) => s.setBookTitle);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  function startEdit() {
    setDraft(bookTitle);
    setEditing(true);
  }

  function commit() {
    const trimmed = draft.trim();
    if (trimmed) setBookTitle(trimmed);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") setEditing(false);
  }

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm font-medium text-black/85 outline-none focus:border-black/40"
      />
    );
  }

  return (
    <button
      onClick={startEdit}
      className="group flex w-full items-center justify-between rounded-lg border border-black/10 bg-white px-3 py-2 text-left hover:border-black/20"
    >
      <span className="text-sm font-medium text-black/85">{bookTitle}</span>
      <span className="text-xs text-black/30 group-hover:text-black/50">编辑</span>
    </button>
  );
}

function ModeToggle() {
  const mode = useSessionStore((s) => s.mode);
  const setMode = useSessionStore((s) => s.setMode);

  return (
    <div className="flex rounded-lg border border-black/10 bg-black/[0.03] p-1">
      {(["guided", "sandbox"] as const).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={[
            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            mode === m
              ? "bg-white text-black/85 shadow-sm"
              : "text-black/45 hover:text-black/65",
          ].join(" ")}
        >
          {m === "guided" ? "引导模式" : "沙盒模式"}
        </button>
      ))}
    </div>
  );
}

function SessionStats() {
  const nodes = useNarrativeStore((s) => s.nodes);
  const currentNodeId = useNarrativeStore((s) => s.currentNodeId);
  const tick = useWorldStore((s) => s.worldState.tick);

  const currentNode = nodes.find((n) => n.id === currentNodeId);
  const branchCount = nodes.filter((n) => n.parentId !== null).length;

  return (
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "当前弧线", value: currentNode?.meta.arc ?? "—" },
        { label: "世界 Tick", value: tick },
        { label: "节点总数", value: nodes.length },
        { label: "分支数", value: branchCount },
      ].map(({ label, value }) => (
        <div key={label} className="rounded-lg border border-black/10 bg-white p-2.5">
          <p className="text-[11px] text-black/45">{label}</p>
          <p className="mt-0.5 text-sm font-medium text-black/80">{value}</p>
        </div>
      ))}
    </div>
  );
}

function ResetButton() {
  const resetNarrative = useNarrativeStore((s) => s.resetNarrative);
  const resetWorld = useWorldStore((s) => s.resetWorld);
  const [confirming, setConfirming] = useState(false);

  function handleClick() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    resetNarrative();
    resetWorld();
    setConfirming(false);
  }

  return (
    <button
      onClick={handleClick}
      className={[
        "w-full rounded-lg border px-3 py-2 text-sm transition-colors",
        confirming
          ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
          : "border-black/10 bg-white text-black/60 hover:border-black/20 hover:text-black/80",
      ].join(" ")}
    >
      {confirming ? "再次点击确认重置" : "重置会话"}
    </button>
  );
}

export function BookInputPanel() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-black/10 px-4 py-3 text-sm text-black/60">书册设置</div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4 text-sm">
        <section>
          <SectionLabel>书名</SectionLabel>
          <TitleEditor />
        </section>

        <section>
          <SectionLabel>叙事模式</SectionLabel>
          <ModeToggle />
          <p className="mt-1.5 text-xs text-black/40">
            引导模式：AI 主导剧情走向；沙盒模式：玩家自由驱动。
          </p>
        </section>

        <section>
          <SectionLabel>当前进度</SectionLabel>
          <SessionStats />
        </section>

        <section className="mt-auto">
          <ResetButton />
        </section>
      </div>
    </div>
  );
}
