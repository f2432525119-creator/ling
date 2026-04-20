type ConsistencyIndicatorProps = {
  status: "stable" | "warning";
};

export function ConsistencyIndicator({ status }: ConsistencyIndicatorProps) {
  const text = status === "stable" ? "世界一致性稳定" : "存在世界一致性风险";
  const tone =
    status === "stable"
      ? "border-success/30 bg-success/10 text-success"
      : "border-warning/30 bg-warning/10 text-warning";

  return (
    <div className={`rounded-lg border px-3 py-2 text-xs transition-colors duration-200 ${tone}`}>
      {text}
    </div>
  );
}
