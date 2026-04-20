import clsx from "clsx";
import type { NodeProps } from "reactflow";

import type { StoryGraphNodeData } from "@/types/graph";

const toneClassByType: Record<StoryGraphNodeData["semanticType"], string> = {
  scene: "border-slate-300 bg-slate-50",
  decision: "border-indigo-300 bg-indigo-50",
  event: "border-amber-300 bg-amber-50",
  transition: "border-cyan-300 bg-cyan-50",
  revelation: "border-purple-300 bg-purple-50",
  consequence: "border-rose-300 bg-rose-50",
};

export function NarrativeNodeCard({ data }: NodeProps<StoryGraphNodeData>) {
  return (
    <div
      className={clsx(
        "w-56 rounded-xl border p-3 text-xs shadow-sm transition",
        toneClassByType[data.semanticType],
        data.isCurrent && "ring-2 ring-sky-500",
        data.isSelected && "ring-2 ring-orange-400",
      )}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="line-clamp-1 font-semibold text-black/85">{data.title}</div>
        <span className="rounded bg-black/6 px-2 py-0.5 text-[10px] uppercase text-black/60">
          {data.semanticType}
        </span>
      </div>
      <div className="line-clamp-1 text-black/60">{data.arc}</div>
      <div className="mt-2 line-clamp-2 text-black/70">{data.preview || "（暂无摘要）"}</div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-black/55">
        <span>重要度 {(data.importance * 100).toFixed(0)}%</span>
        <span>选项 {data.choiceCount}</span>
      </div>
    </div>
  );
}
