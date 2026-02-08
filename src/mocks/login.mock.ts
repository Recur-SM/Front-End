// src/api/auth/auth.mock.ts
import type { LoginRequest, LoginResponse } from "../types/auth";

const MOCK_USER = {
  username: "mentor1",
  password: "mentor12345",
};

export const mockLogin = (payload: LoginRequest): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.username !== MOCK_USER.username) {
        reject(new Error("USER_NOT_FOUND"));
        return;
      }

      if (payload.password !== MOCK_USER.password) {
        reject(new Error("INVALID_PASSWORD"));
        return;
      }

      resolve({
        isSuccess: true,
        code: "SUCCESS",
        message: "로그인 성공",
        result: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          tokenType: "Bearer",
          userId: 1,
          username: payload.username,
        },
      });
    }, 800);
  });
};
