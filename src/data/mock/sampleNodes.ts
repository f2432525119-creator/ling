import type { NarrativeNode } from "@/types/narrative";

export const sampleNodes: NarrativeNode[] = [
  {
    id: "node-root",
    parentId: null,
    narration:
      "你刚进入《灰烬王座》的世界，王都边缘的风里混着铁与雨的味道。露娜低声提醒：今晚会有人在黑市交易禁书残页。",
    choices: [
      { id: "choice-follow", text: "跟随露娜前往黑市" },
      { id: "choice-scout", text: "先独自侦查城门守卫" },
    ],
    meta: {
      id: "node-root",
      title: "进入世界",
      arc: "开场",
      type: "scene",
      importance: 0.6,
    },
  },
];
