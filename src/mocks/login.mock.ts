import type { LoginRequest, LoginResponse } from "../types/auth";

const MOCK_USER = {
  userId: "test123",
  password: "1234",
};

export const mockLogin = (payload: LoginRequest): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        payload.userId === MOCK_USER.userId &&
        payload.password === MOCK_USER.password
      ) {
        resolve({
          id: 1,
          userId: payload.userId,
          name: "Test User",
          token: "mock-jwt-token",
        });
      } else {
        if (payload.userId !== MOCK_USER.userId) {
          reject(new Error("USER_NOT_FOUND"));
          return;
        }

        if (payload.password !== MOCK_USER.password) {
          reject(new Error("INVALID_PASSWORD"));
          return;
        }
      }
    }, 800);
  });
};
