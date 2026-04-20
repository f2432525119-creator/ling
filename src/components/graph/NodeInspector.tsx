"use client";

import { useMemo } from "react";

import { useGraphStore } from "@/stores/useGraphStore";
import { useNarrativeStore } from "@/stores/useNarrativeStore";
import { useWorldStore } from "@/stores/useWorldStore";

export function NodeInspector() {
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const selectNode = useGraphStore((state) => state.selectNode);

  const narrativeNodes = useNarrativeStore((state) => state.nodes);
  const currentNodeId = useNarrativeStore((state) => state.currentNodeId);
  const setCurrentNodeId = useNarrativeStore((state) => state.setCurrentNodeId);

  const worldState = useWorldStore((state) => state.worldState);

  const selectedNode = useMemo(
    () => narrativeNodes.find((node) => node.id === selectedNodeId) ?? null,
    [narrativeNodes, selectedNodeId],
  );

  const parentNode = useMemo(() => {
    if (!selectedNode?.parentId) return null;
    return narrativeNodes.find((node) => node.id === selectedNode.parentId) ?? null;
  }, [narrativeNodes, selectedNode]);

  return (
    <div className="h-full overflow-y-auto p-4 text-sm">
      <div className="mb-4 text-sm text-black/60">节点检视器</div>

      {!selectedNode ? (
        <div className="rounded-lg border border-dashed border-black/20 p-4 text-black/55">
          请在分支图里点击一个节点查看详情。
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-lg border border-black/10 p-3">
            <p className="text-black/45">标题</p>
            <p className="mt-1 font-medium">{selectedNode.meta.title}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-black/10 p-3">
              <p className="text-black/45">类型</p>
              <p className="mt-1 font-medium">{selectedNode.meta.type ?? "scene"}</p>
            </div>
            <div className="rounded-lg border border-black/10 p-3">
              <p className="text-black/45">重要度</p>
              <p className="mt-1 font-medium">{((selectedNode.meta.importance ?? 0.65) * 100).toFixed(0)}%</p>
            </div>
          </div>
          <div className="rounded-lg border border-black/10 p-3">
            <p className="text-black/45">剧情弧</p>
            <p className="mt-1 font-medium">{selectedNode.meta.arc}</p>
          </div>
          <div className="rounded-lg border border-black/10 p-3">
            <p className="text-black/45">父节点</p>
            {parentNode ? (
              <button
                type="button"
                className="mt-1 text-left font-medium text-sky-600 hover:underline"
                onClick={() => selectNode(parentNode.id)}
              >
                {parentNode.meta.title}
              </button>
            ) : (
              <p className="mt-1 font-medium">根节点</p>
            )}
          </div>
          <div className="rounded-lg border border-black/10 p-3">
            <p className="text-black/45">叙事摘要</p>
            <p className="mt-1 whitespace-pre-wrap text-black/80">{selectedNode.narration}</p>
          </div>
          <div className="rounded-lg border border-black/10 p-3">
            <p className="text-black/45">可选行动</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-black/80">
              {selectedNode.choices.length === 0 ? (
                <li>（无选项）</li>
              ) : (
                selectedNode.choices.map((choice) => <li key={choice.id}>{choice.text}</li>)
              )}
            </ul>
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-black px-3 py-2 text-white transition hover:bg-black/85"
            disabled={selectedNode.id === currentNodeId}
            onClick={() => setCurrentNodeId(selectedNode.id)}
          >
            {selectedNode.id === currentNodeId ? "当前已在该节点" : "从该节点继续叙事"}
          </button>
        </div>
      )}

      <div className="mt-5 border-t border-black/10 pt-4">
        <p className="mb-2 text-black/45">世界快照</p>
        <div className="space-y-2 text-xs">
          <div className="rounded-lg border border-black/10 p-2">时间线：{worldState.timeline}</div>
          <div className="rounded-lg border border-black/10 p-2">地点：{worldState.location}</div>
          <div className="rounded-lg border border-black/10 p-2">紧张度：{worldState.tension}</div>
        </div>
      </div>
    </div>
  );
}
