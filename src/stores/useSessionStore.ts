import { create } from "zustand";

type SessionMode = "guided" | "sandbox";

type SessionState = {
  bookTitle: string;
  mode: SessionMode;
  preferences: {
    briefNarration: boolean;
  };
  setBookTitle: (bookTitle: string) => void;
  setMode: (mode: SessionMode) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  bookTitle: "灰烬王座",
  mode: "guided",
  preferences: {
    briefNarration: false,
  },
  setBookTitle: (bookTitle) => set({ bookTitle }),
  setMode: (mode) => set({ mode }),
}));
