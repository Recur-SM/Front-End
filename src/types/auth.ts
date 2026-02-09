export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  username: string;
  role: "MENTOR" | "MENTEE" | null;
}

export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: LoginResult;
}

export interface LogoutResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}