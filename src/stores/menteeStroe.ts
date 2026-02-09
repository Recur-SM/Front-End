import { create } from "zustand";
import type { Mentee } from "../types/mentee";

interface MenteeState {
  mentees: Mentee[];
  selectedMentee: Mentee | null;
  setMentees: (list: Mentee[]) => void;
  setSelectedMentee: (mentee: Mentee | null) => void;
}

export const useMenteeStore = create<MenteeState>((set) => ({
  mentees: [],
  selectedMentee: null,
  setMentees: (list) => set({ mentees: list }),
  setSelectedMentee: (mentee) => set({ selectedMentee: mentee }),
}));
