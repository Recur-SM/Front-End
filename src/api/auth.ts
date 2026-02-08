import { api } from "../api/axios";
import { useAuthStore } from "../stores/authStore";
import type { LoginRequest, LoginResponse } from "../types/auth";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  // 로그인 성공 시 accessToken을 Zustand 메모리 상태에 저장
  useAuthStore.getState().setAccessToken(res.data.result.accessToken);
  return res.data;
}
