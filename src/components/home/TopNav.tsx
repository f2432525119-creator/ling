interface TopNavProps {
  /** 应用名称 */
  appName?: string;
  /** 主标题 */
  title: string;
  /** 副标题描述 */
  subtitle?: string;
}

export function TopNav({ 
  appName = "Book Narrative Engine", 
  title, 
  subtitle 
}: TopNavProps) {
  return (
    <header className="text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-tertiary">
        {appName}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-secondary md:text-base">
          {subtitle}
        </p>
      )}
    </header>
  );
}
