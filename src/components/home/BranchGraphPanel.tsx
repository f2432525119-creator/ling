import { Panel, PanelEmpty } from "@/components/ui";

export function BranchGraphPanel() {
  return (
    <Panel title="分支图" fullHeight>
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-6">
        {/* 占位图形 */}
        <div className="relative mb-4">
          {/* 主节点 */}
          <div className="flex flex-col items-center">
            <div className="h-4 w-4 rounded-full bg-primary" />
            <div className="h-8 w-px bg-border-strong" />
            
            {/* 分支 */}
            <div className="flex items-start gap-8">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-tertiary" />
                <div className="h-6 w-px bg-border" />
                <div className="h-2.5 w-2.5 rounded-full bg-muted" />
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-tertiary" />
                <div className="h-6 w-px bg-border" />
                <div className="flex gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-tertiary" />
              </div>
            </div>
          </div>
        </div>
        
        <PanelEmpty>
          开始创作后，故事分支将在此展示
        </PanelEmpty>
      </div>
    </Panel>
  );
}
