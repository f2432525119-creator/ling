import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, hint, className, id, ...props }, ref) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            // 基础样式
            "h-10 w-full rounded-lg px-3 text-sm",
            "bg-card text-foreground placeholder:text-tertiary",
            "border border-border",
            // 交互状态
            "transition-colors duration-200",
            "hover:border-border-strong",
            "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
            // 禁用状态
            "disabled:cursor-not-allowed disabled:opacity-50",
            // 错误状态
            error && "border-error focus:border-error focus:ring-error",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-tertiary">{hint}</p>}
      </div>
    );
  }
);
