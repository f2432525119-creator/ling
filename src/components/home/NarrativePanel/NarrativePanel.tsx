"use client";

import { Panel, PanelEmpty } from "@/components/ui";
import { NarrativePanelProps } from "./types";
import { MessageList } from "./MessageList";
import { mockMessages } from "./mockData";

export function NarrativePanel({
  messages = mockMessages,
  enableTypewriter = true,
  typewriterSpeed = 30,
  title = "叙事对话",
}: NarrativePanelProps) {
  const hasMessages = messages.length > 0;

  return (
    <Panel title={title} fullHeight>
      <div className="flex h-full min-h-[400px] flex-col">
        {hasMessages ? (
          <MessageList
            messages={messages}
            enableTypewriter={enableTypewriter}
            typewriterSpeed={typewriterSpeed}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <PanelEmpty>开始创作后，故事对话将在此展示</PanelEmpty>
          </div>
        )}
      </div>
    </Panel>
  );
}
