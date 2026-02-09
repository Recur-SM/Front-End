import { api } from "../api/axios";
import type { LoginRequest, LoginResponse, LogoutResponse } from "../types/auth";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
}

export async function logout(): Promise<LogoutResponse> {
  const res = await api.post<LogoutResponse>("/auth/logout");
  return res.data;
}

export async function refreshToken(): Promise<string> {
  const res = await api.post("/auth/refresh", null, {});
  return res.data.accessToken;
}
