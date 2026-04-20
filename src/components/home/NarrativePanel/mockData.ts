import { NarrativeMessage } from "./types";

export const mockMessages: NarrativeMessage[] = [
  {
    id: "1",
    role: "narrator",
    content:
      "夜幕降临，古老的图书馆沉浸在一片寂静之中。烛光在墙壁上投下摇曳的影子，空气中弥漫着陈旧书卷的气息。",
    timestamp: Date.now() - 60000,
  },
  {
    id: "2",
    role: "character",
    characterName: "艾琳",
    content: "这本书...上面记载的文字，我从未见过。你能看懂吗？",
    timestamp: Date.now() - 50000,
  },
  {
    id: "3",
    role: "user",
    content: "我仔细端详着书页上的神秘符文，试图从中找出一些规律。",
    timestamp: Date.now() - 40000,
  },
  {
    id: "4",
    role: "narrator",
    content:
      "当你的指尖触碰到书页的那一刻，一道微弱的光芒从文字间溢出。符文开始缓缓移动，仿佛被某种力量唤醒。",
    timestamp: Date.now() - 30000,
  },
  {
    id: "5",
    role: "character",
    characterName: "艾琳",
    content: "小心！这本书...它好像在回应你。我们或许触发了某种古老的魔法。",
    timestamp: Date.now() - 20000,
  },
  {
    id: "6",
    role: "user",
    content: "我没有退缩，而是继续将手掌放在书页上，等待着接下来发生的事情。",
    timestamp: Date.now() - 10000,
  },
];
