import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import Header from "./components/header";
import Tabbar from "./components/tabbar";
import HomePage from "./pages/HomePage";
import AssignmentManagementPage from "./pages/AssignmentManagement";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./stores/authStore";
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = () => {
  const location = useLocation();
  const { accessToken } = useAuthStore();
  
  // 로그인 페이지 여부 체크 (basename인 /app 제외 후 비교)
  const isLoginPage = location.pathname === "/login";
  const handleMenuClick = () => {};

  return (
    /* 1. 웹 배경 및 앱 정렬 최상위 컨테이너 */
    <div className="min-h-screen w-full bg-[#F7F7F7] flex justify-center overflow-x-hidden">
      
      {/* 2. 실제 앱 영역 (고정 너비 및 배경색) */}
      <div className="relative w-full max-w-[430px] min-h-screen flex flex-col">
        
        {/* 헤더: 고정 위치 유지 */}
        {!isLoginPage && (
          <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]">
            <Header onMenuClick={handleMenuClick} />
          </div>
        )}

        {/* 메인 콘텐츠 영역: Outlet을 통해 페이지 교체 */}
        <main className={`w-full flex-1 overflow-y-auto scrollbar-hide ${!isLoginPage ? "pt-[105px] pb-[100px] px-5" : ""}`}>
          <Outlet />
        </main>

        {/* 탭바: 고정 위치 유지 */}
        {!isLoginPage && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]">
            <Tabbar />
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const { accessToken } = useAuthStore();

  return (
    <BrowserRouter basename="/app">
      <Routes>
        {/* AppLayout을 부모로 하여 공통 레이아웃 적용 */}
        <Route element={<AppLayout />}>
          
          {/* 로그인 경로 */}
          <Route
            path="login"
            element={!accessToken ? <LoginPage /> : <Navigate to="/" replace />}
          />

          {/* 메인 및 보호된 경로 (앞에 / 제거) */}
          <Route
            index
            element={!accessToken ? <Navigate to="login" replace /> : <HomePage />}
          />
          
          <Route element={<ProtectedRoute allowedRoles={["MENTEE"]} />}>
            <Route path="assignment-management" element={<AssignmentManagementPage />} />
            {/* 필요한 경우 /mentee 경로 유지 */}
            <Route path="mentee" element={<HomePage />} />
            <Route path="mentee/assignment-management" element={<AssignmentManagementPage />} />
          </Route>
          
        </Route>

        {/* 예외 처리: 없는 페이지 접속 시 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;