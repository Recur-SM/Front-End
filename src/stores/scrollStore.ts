// stores/scrollStore.ts
import { create } from "zustand";

interface ScrollStore {
  targetTaskId: number | null;
  shouldSwitchTab: boolean;
  scrollToTask: (taskId: number, switchTab?: boolean) => void;
  clearTarget: () => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  targetTaskId: null,
  shouldSwitchTab: false,
  scrollToTask: (taskId, switchTab = false) =>
    set({ targetTaskId: taskId, shouldSwitchTab: switchTab }),
  clearTarget: () => set({ targetTaskId: null, shouldSwitchTab: false }),
}));
