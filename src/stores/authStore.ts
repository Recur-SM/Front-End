import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isRefreshing: boolean;
  role: "MENTOR" | "MENTEE" | null;
  id: number | null;
  username: string | null;
  setAccessToken: (token: string | null) => void;
  setIsRefreshing: (v: boolean) => void;
  setRole: (role: "MENTOR" | "MENTEE" | null) => void;
  setId: (id: number) => void;
  setUsername: (username: string) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isRefreshing: false,
      role: null,
      id: null,
      username: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setIsRefreshing: (v) => set({ isRefreshing: v }),
      setRole: (role) => set({ role }),
      setId: (id) => set({ id }),
      setUsername: (username) => set({ username }),
      logout: async () => {
        try {
          const { logout: logoutApi } = await import('../api/auth');
          await logoutApi();
        } catch (error) {
          console.error('로그아웃 API 호출 실패:', error);
        } finally {
          // API 성공/실패 여부와 상관없이 로컬 상태는 초기화
          set({
            accessToken: null,
            isRefreshing: false,
            role: null,
            id: null,
            username: null,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        role: state.role,
        id: state.id,
        username: state.username,
      }),
    }
  )
);