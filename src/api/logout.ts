import { api } from "./axios";
import type { LogoutResponse } from "../types/auth";

export async function logout(): Promise<LogoutResponse> {
  const res = await api.post<LogoutResponse>("/auth/logout");
  return res.data;
}
