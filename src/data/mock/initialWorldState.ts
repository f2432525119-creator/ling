import type { WorldState } from "@/types/world";

export const initialWorldState: WorldState = {
  timeline: "正史线-001",
  tick: 0,
  location: "王都外环",
  weather: "阴天",
  tension: 32,
  characters: {
    "char-luna": {
      id: "char-luna",
      name: "露娜",
      relationLabel: "向导",
      trust: 62,
    },
    "char-kael": {
      id: "char-kael",
      name: "凯尔",
      relationLabel: "潜在对手",
      trust: 35,
    },
  },
  relations: {},
  delayedEffects: [],
  flags: ["gate_unstable", "rumor_black_market"],
};
