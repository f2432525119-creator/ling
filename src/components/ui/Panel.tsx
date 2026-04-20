import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { clsx } from "clsx";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** 面板标题 */
  title?: string;
  /** 标题右侧的操作区域 */
  headerAction?: ReactNode;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否填满容器高度 */
  fullHeight?: boolean;
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  function Panel(
    {
      title,
      headerAction,
      bordered = true,
      fullHeight = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={clsx(
          "flex flex-col overflow-hidden rounded-2xl bg-panel",
          bordered && "border border-border",
          fullHeight && "h-full",
          className
        )}
        {...props}
      >
        {/* 面板头部 */}
        {(title || headerAction) && (
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
            {title && (
              <h2 className="text-sm font-medium text-secondary">{title}</h2>
            )}
            {headerAction && (
              <div className="flex items-center gap-2">{headerAction}</div>
            )}
          </div>
        )}

        {/* 面板内容 */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    );
  }
);

/* === Panel 子组件 === */

interface PanelSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** 是否显示分隔线 */
  divided?: boolean;
}

export function PanelSection({
  divided = false,
  className,
  children,
  ...props
}: PanelSectionProps) {
  return (
    <div
      className={clsx(
        "p-4",
        divided && "border-b border-border last:border-b-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** 面板内部的空状态占位 */
export function PanelEmpty({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center p-8 text-center",
        className
      )}
      {...props}
    >
      <p className="text-sm text-tertiary">{children || "暂无内容"}</p>
    </div>
  );
}
