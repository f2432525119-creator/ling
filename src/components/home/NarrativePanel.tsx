import { Panel, PanelEmpty } from "@/components/ui";

export function NarrativePanel() {
  return (
    <Panel title="叙事对话" fullHeight>
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-6">
        {/* 占位消息气泡 */}
        <div className="mb-4 w-full max-w-xs space-y-3">
          <div className="ml-auto w-3/4 rounded-xl bg-primary/10 px-3 py-2">
            <div className="h-2 w-full rounded bg-primary/20" />
            <div className="mt-1.5 h-2 w-2/3 rounded bg-primary/20" />
          </div>
          
          <div className="mr-auto w-4/5 rounded-xl border border-border bg-card px-3 py-2">
            <div className="h-2 w-full rounded bg-border" />
            <div className="mt-1.5 h-2 w-full rounded bg-border" />
            <div className="mt-1.5 h-2 w-1/2 rounded bg-border" />
          </div>
          
          <div className="ml-auto w-1/2 rounded-xl bg-primary/10 px-3 py-2">
            <div className="h-2 w-full rounded bg-primary/20" />
          </div>
        </div>
        
        <PanelEmpty>
          开始创作后，故事对话将在此展示
        </PanelEmpty>
      </div>
    </Panel>
  );
}
