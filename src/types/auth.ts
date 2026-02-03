export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  userId: string;
  name: string;
  token: string;
}