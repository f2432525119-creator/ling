import "reactflow/dist/style.css";

import { GraphStage } from "@/components/graph/GraphStage";
import { AppShell } from "@/components/layout/AppShell";
import { NarrativePanel } from "@/components/narrative/NarrativePanel";
import { WorldStatePanel } from "@/components/world/WorldStatePanel";

export default function WorldPage() {
  return <AppShell left={<NarrativePanel />} center={<GraphStage />} right={<WorldStatePanel />} />;
}
