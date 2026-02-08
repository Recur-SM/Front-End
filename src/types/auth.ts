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
}

export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: LoginResult;
}