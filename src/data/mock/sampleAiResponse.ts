import type { StructuredAIResponse } from "@/types/narrative";

export const sampleAiResponse: StructuredAIResponse = {
  narration:
    "你和露娜潜入黑市后巷，发现凯尔正在与陌生学者交易一页发光的残卷。露娜的手按在匕首上，示意你做出决定。",
  choices: [
    {
      id: "choice-interrupt",
      text: "立刻打断交易并夺取残卷",
      intent: "force_intervention",
      risk_level: 78,
    },
    {
      id: "choice-shadow",
      text: "先潜伏观察，记录交易细节",
      intent: "information_gathering",
      risk_level: 42,
    },
    {
      id: "choice-contact",
      text: "伪装成买家接近学者",
      intent: "social_infiltration",
      risk_level: 56,
    },
  ],
  state_update: {
    update_id: "upd-mock-black-market-1",
    source: "ai",
    reason: "进入黑市后巷并确认凯尔秘密交易迹象，局势紧张上升。",
    base_tick: 0,
    ops: [
      { op: "set_location", location: "黑市后巷" },
      { op: "set_tension", tension: 51 },
      { op: "set_flag", flag: "seen_kael_secret_trade" },
    ],
  },
  next_node_meta: {
    id: "node-black-market-1",
    title: "黑市交易",
    arc: "第一幕",
  },
};
