import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-card border border-border",
  elevated: "bg-elevated border border-border shadow-lg shadow-black/20",
  outlined: "bg-transparent border border-border-strong",
};

const paddingStyles = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    { variant = "default", padding = "md", className, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-xl",
          "transition-colors duration-200",
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

/* === Card 子组件 === */

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function CardHeader({
  title,
  description,
  action,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={clsx("flex items-start justify-between gap-4", className)}
      {...props}
    >
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {description && (
          <p className="text-xs text-tertiary">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("mt-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "mt-4 flex items-center gap-3 border-t border-border pt-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
