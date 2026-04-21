import "reactflow/dist/style.css";

import { ChatPanel } from "@/components/chat/ChatPanel";
import { BranchGraph } from "@/components/graph/BranchGraph";
import { AppShell } from "@/components/layout/AppShell";
import { WorldStatePanel } from "@/components/world/WorldStatePanel";

export default function HomePage() {
  return (
    <main className="h-[100dvh] w-full overflow-hidden bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-200">
      <AppShell
        left={<ChatPanel />}
        center={<BranchGraph />}
        right={<WorldStatePanel />}
      />
    </main>
  );
}
