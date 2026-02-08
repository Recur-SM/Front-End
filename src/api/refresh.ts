import { api } from "./axios";

export async function refreshToken(): Promise<string> {
  const res = await api.post("/api/auth/refresh", null, {});
  return res.data.accessToken;
}
