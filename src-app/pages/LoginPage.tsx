import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuthStore } from "../stores/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isActive = username && password;

  const handleLogin = async () => {
    if (!isActive || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);
      const res = await login({ username, password });
      if (res.isSuccess) {
        const userId =
          res.result.userId ??
          (res.result as { id?: number; menteeId?: number }).id ??
          (res.result as { id?: number; menteeId?: number }).menteeId;
        useAuthStore.getState().setAccessToken(res.result.accessToken);
        useAuthStore.getState().setRole(res.result.role);
        if (userId != null) {
          useAuthStore.getState().setId(userId);
        }
        navigate("/mentee/assignment-management", { replace: true });
      } else {
        setError("로그인에 실패했습니다.");
      }
    } catch (e) {
      setError("로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-8 px-6 bg-[#F7F7F7]">
      <span className="text-2xl text-[#FF6738] font-semibold">설 스터디</span>
      <div className="flex flex-col gap-4 w-full max-w-[360px]">
        <div className="flex flex-col gap-2">
          <span className="pl-1 text-sm">사용자 아이디</span>
          <input
            className="h-12 rounded-lg px-4 border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="pl-1 text-sm">비밀번호</span>
          <input
            type="password"
            className="h-12 rounded-lg px-4 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          disabled={!isActive || isSubmitting}
          onClick={handleLogin}
          className={`rounded-lg py-3 mt-2 text-white transition
            ${isActive && !isSubmitting ? "bg-[#FF6738]" : "bg-[#999999]"}
          `}
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default LoginPage;
