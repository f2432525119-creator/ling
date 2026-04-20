import {
  LayoutContainer,
  TopNav,
  BookInputForm,
  BranchGraphPanel,
  NarrativePanel,
} from "@/components/home";

export default function Home() {
  return (
    <LayoutContainer
      header={
        <>
          <TopNav
            title="多时间线叙事工作台"
            subtitle="创建你的交互式小说，探索无限可能的故事分支"
          />
          <div className="mt-10 w-full max-w-md md:mt-12">
            <BookInputForm />
          </div>
        </>
      }
      leftPanel={<BranchGraphPanel />}
      rightPanel={<NarrativePanel />}
    />
  );
}
