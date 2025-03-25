import { create } from "zustand";

export const useStore = create((set) => ({
  mode: "single",
  setMode: (mode) => set({ mode }),

  isPlaying: false,
  handlePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
