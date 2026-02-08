import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import type { LoginResult } from "../types/auth";

export type UserRole = LoginResult["role"];

interface ProtectedRouteProps {
  // null은 권한 체크 시 제외해야 하므로 Exclude를 써서 "MENTOR" | "MENTEE"만 허용
  allowedRoles: Exclude<UserRole, null>[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { accessToken, role } = useAuthStore();

  if (!accessToken) {
    // 로그인 안 되어 있으면 로그인 페이지로
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/" replace />;
  }

  // 권한이 맞으면 하위 컴포넌트(children) 렌더링
  return <Outlet />;
};

export default ProtectedRoute;
