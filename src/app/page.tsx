import {
  Header,
  StoryForm,
  BranchGraphPanel,
  NarrativePanel,
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* 顶部区域：标题 + 输入表单 */}
      <section className="flex flex-col items-center px-4 pb-12 pt-16 md:px-6 md:pb-16 md:pt-24">
        <Header
          title="多时间线叙事工作台"
          subtitle="创建你的交互式小说，探索无限可能的故事分支"
        />

        <div className="mt-10 w-full max-w-md md:mt-12">
          <StoryForm />
        </div>
      </section>

      {/* 下半部分：分支图 + 叙事面板 */}
      <section className="border-t border-border bg-elevated px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <BranchGraphPanel />
          <NarrativePanel />
        </div>
      </section>
    </div>
  );
}
