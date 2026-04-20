import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8f8] px-6">
      <main className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-black/40">AI Story World</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          多时间线叙事工作台
        </h1>
        <p className="mt-4 text-sm leading-7 text-black/65">
          先以 mock 数据跑通「对话叙事 → 世界状态更新 → 分支树可视化」闭环，后续再接真实 AI。
        </p>
        <Link
          href="/world"
          className="mt-8 inline-flex rounded-xl bg-black px-4 py-2 text-sm text-white"
        >
          进入世界
        </Link>
      </main>
    </div>
  );
}
