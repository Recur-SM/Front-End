import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { refreshToken } from "./refresh";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 이미 refresh 중이면 기다림
      if (!refreshPromise) {
        refreshPromise = refreshToken();
      }

      try {
        const newAccessToken = await refreshPromise;
        refreshPromise = null;

        useAuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (e) {
        refreshPromise = null;
        useAuthStore.getState().setAccessToken(null);
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);
