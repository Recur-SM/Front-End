import { useState } from "react";
import type { LoginRequest } from "../types/auth";
import { mockLogin } from "../mocks/login.mock";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isActive = userId && password;

  const handleLogin = async () => {
    const payload: LoginRequest = { userId, password };
    setIdError("");
    setPasswordError("");

    try {
      const res = await mockLogin(payload);
      console.log("로그인 성공", res);
    } catch (e) {
      const message = (e as Error).message;

      if (message === "USER_NOT_FOUND") {
        setIdError("존재하지 않는 계정입니다.");
      }

      if (message === "INVALID_PASSWORD") {
        setPasswordError("올바른 비밀번호를 입력해주세요.");
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
              className={`h-12 rounded-lg px-4 border ${
                idError ? "border-[#FF6738]" : "border-transparent"
              }`}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            {idError && (
              <span className="text-sm text-[#FF6738] pl-1">{idError}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="pl-1">비밀번호</span>
            <input
              type="password"
              className={`h-12 rounded-lg px-4 border ${
                passwordError ? "border-[#FF6738]" : "border-transparent"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <span className="text-sm text-[#FF6738] pl-1">{passwordError}</span>
            )}
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
