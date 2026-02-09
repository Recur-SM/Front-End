import { api } from "./axios";

export async function refreshToken(): Promise<string> {
  const res = await api.post("/auth/refresh", null, {});
  return res.data.accessToken;
}
