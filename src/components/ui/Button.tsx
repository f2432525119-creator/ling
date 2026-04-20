import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: clsx(
    "bg-primary text-white",
    "hover:bg-primary-hover",
    "disabled:bg-primary/40"
  ),
  secondary: clsx(
    "bg-card text-foreground border border-border",
    "hover:bg-panel hover:border-border-strong",
    "disabled:opacity-40"
  ),
  ghost: clsx(
    "bg-transparent text-secondary",
    "hover:bg-card hover:text-foreground",
    "disabled:opacity-40"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-md gap-1.5",
  md: "h-10 px-4 text-sm rounded-lg gap-2",
  lg: "h-12 px-6 text-base rounded-xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          // 基础样式
          "inline-flex items-center justify-center font-medium",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed",
          // 变体样式
          variantStyles[variant],
          // 尺寸样式
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
