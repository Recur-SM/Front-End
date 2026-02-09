import { useState } from "react";
import { login } from "../api/auth";
import { useAuthStore } from "../stores/authStore";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isActive = username && password;

  const handleLogin = async () => {
    try {
      const res = await login({
        username,
        password,
      });

      if (res.isSuccess) {
        useAuthStore.getState().setAccessToken(res.result.accessToken);
        useAuthStore.getState().setRole(res.result.role);
        useAuthStore.getState().setId(res.result.userId);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("로그인 실패:", e);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-12">
      <span className="text-2xl text-[#FF6738]">설 스터디</span>
      <div className="flex">
        <div className="flex flex-col gap-6 w-[360px]">
          <div className="flex flex-col gap-3">
            <span className="pl-1">사용자 아이디</span>
            <input
              className={`h-12 rounded-lg px-4 border `}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="pl-1">비밀번호</span>
            <input
              type="password"
              className={`h-12 rounded-lg px-4 border`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={!isActive}
            onClick={handleLogin}
            className={`rounded-lg py-3 my-8 text-white transition
    ${isActive ? "bg-[#FF6738] cursor-pointer" : "bg-[#999999] cursor-not-allowed"}
  `}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;