import "reactflow/dist/style.css";

import { ChatPanel } from "@/components/chat/ChatPanel";
import { BranchGraph } from "@/components/graph/BranchGraph";
import { AppShell } from "@/components/layout/AppShell";
import { WorldStatePanel } from "@/components/world/WorldStatePanel";

export default function WorldPage() {
  return <AppShell left={<ChatPanel />} center={<BranchGraph />} right={<WorldStatePanel />} />;
}
