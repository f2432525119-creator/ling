import React from "react";

interface AppShellProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export function AppShell({ left, center, right }: AppShellProps) {
  return (
    <div className="flex h-full w-full bg-[#FAFAFA]">
      {/* 左侧：聊天与互动区 */}
      <aside className="z-10 w-[320px] shrink-0 flex-col border-r border-neutral-200 bg-white shadow-[2px_0_12px_-6px_rgba(0,0,0,0.05)]">
        {left}
      </aside>

      {/* 中间：分支图谱可视化区 */}
      <section className="relative flex flex-1 flex-col overflow-hidden bg-[#FAFAFA]">
        {center}
      </section>

      {/* 右侧：世界状态面板区 */}
      <aside className="z-10 w-[300px] shrink-0 overflow-y-auto border-l border-neutral-200 bg-white shadow-[-2px_0_12px_-6px_rgba(0,0,0,0.05)]">
        {right}
      </aside>
    </div>
  );
}
