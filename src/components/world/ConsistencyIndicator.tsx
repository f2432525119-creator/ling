type ConsistencyIndicatorProps = {
  status: "stable" | "warning";
};

export function ConsistencyIndicator({ status }: ConsistencyIndicatorProps) {
  const text = status === "stable" ? "世界一致性稳定" : "存在世界一致性风险";
  const tone =
    status === "stable"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <div className={`rounded-lg border px-3 py-2 text-xs ${tone}`}>{text}</div>
  );
}
