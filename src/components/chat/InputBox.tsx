import type { FormEvent } from "react";

type InputBoxProps = {
  value: string;
  loading?: boolean;
  onValueChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function InputBox({
  value,
  loading = false,
  onValueChange,
  onSubmit,
}: InputBoxProps) {
  return (
    <form onSubmit={onSubmit} className="border-t border-black/10 p-3">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="输入你的行动..."
          className="h-10 flex-1 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-black/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-10 rounded-lg bg-black px-4 text-sm text-white disabled:opacity-40"
        >
          {loading ? "生成中" : "发送"}
        </button>
      </div>
    </form>
  );
}
