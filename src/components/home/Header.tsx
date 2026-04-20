interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-tertiary">
        Book Narrative Engine
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
