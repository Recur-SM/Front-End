import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isRefreshing: boolean;
  role: "MENTOR" | "MENTEE" | null;
  id: number | null;
  setAccessToken: (token: string | null) => void;
  setIsRefreshing: (v: boolean) => void;
  setRole: (role: "MENTOR" | "MENTEE" | null) => void;
  setId: (id: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isRefreshing: false,
  role: null,
  id: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setIsRefreshing: (v) => set({ isRefreshing: v }),
  setRole: (role) => set({ role }),
  setId: (id) => set({ id }),
}));
