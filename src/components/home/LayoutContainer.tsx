import { ReactNode } from "react";

interface LayoutContainerProps {
  /** 顶部区域内容（标题、表单等） */
  header: ReactNode;
  /** 左侧面板内容 */
  leftPanel: ReactNode;
  /** 右侧面板内容 */
  rightPanel: ReactNode;
}

export function LayoutContainer({ 
  header, 
  leftPanel, 
  rightPanel 
}: LayoutContainerProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* 顶部区域 */}
      <section className="flex flex-col items-center px-4 pb-12 pt-16 md:px-6 md:pb-16 md:pt-24">
        {header}
      </section>

      {/* 下半部分：双栏布局 */}
      <section className="border-t border-border bg-elevated px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {leftPanel}
          {rightPanel}
        </div>
      </section>
    </div>
  );
}
