import { api } from "../api/axios";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const login = (
  payload: LoginRequest
): Promise<LoginResponse> => {
  return api
    .post<LoginResponse>("/api/auth/login", payload)
    .then(res => res.data);
};
