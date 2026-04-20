import "reactflow/dist/style.css";

import { ChatPanel } from "@/components/chat/ChatPanel";
import { BranchGraph } from "@/components/graph/BranchGraph";
import { NodeInspector } from "@/components/graph/NodeInspector";
import { AppShell } from "@/components/layout/AppShell";

export default function WorldPage() {
  return <AppShell left={<ChatPanel />} center={<BranchGraph />} right={<NodeInspector />} />;
}
