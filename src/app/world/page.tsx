import "reactflow/dist/style.css";

import { GraphStage } from "@/components/graph/GraphStage";
import { AppShell } from "@/components/layout/AppShell";
import { NarrativePanel } from "@/components/narrative/NarrativePanel";
import { BookInputPanel } from "@/components/session/BookInputPanel";

export default function WorldPage() {
  return <AppShell left={<BookInputPanel />} center={<GraphStage />} right={<NarrativePanel />} />;
}
