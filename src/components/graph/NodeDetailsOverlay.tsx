import type { NarrativeNode } from "@/types/narrative";

type NodeDetailsOverlayProps = {
  node: NarrativeNode;
  onClose: () => void;
};

export function NodeDetailsOverlay({ node, onClose }: NodeDetailsOverlayProps) {
  return (
    <aside className="absolute bottom-3 right-3 z-20 w-[320px] max-w-[calc(100%-24px)] rounded-xl border border-black/15 bg-white/95 p-4 shadow-xl backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.15em] text-black/45">Node details</p>
          <h3 className="truncate text-sm font-semibold text-black/85">{node.meta.title}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-black/10 px-2 py-1 text-xs text-black/55 hover:bg-black/5"
        >
          关闭
        </button>
      </div>

      <dl className="space-y-2 text-xs text-black/70">
        <div>
          <dt className="text-black/45">节点 ID</dt>
          <dd className="font-mono">{node.id}</dd>
        </div>
        <div>
          <dt className="text-black/45">剧情弧线</dt>
          <dd>{node.meta.arc}</dd>
        </div>
        <div>
          <dt className="text-black/45">父节点</dt>
          <dd>{node.parentId ?? "(root)"}</dd>
        </div>
        <div>
          <dt className="text-black/45">可选行动数</dt>
          <dd>{node.choices.length}</dd>
        </div>
      </dl>

      <p className="mt-3 line-clamp-4 text-xs leading-5 text-black/70">{node.narration}</p>
    </aside>
  );
}
