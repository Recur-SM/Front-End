import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/header";
import Tabbar from "./components/tabbar";
import HomePage from "./pages/HomePage";
import AssignmentManagementPage from "./pages/AssignmentManagement";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./stores/authStore";
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const { accessToken } = useAuthStore();
  const handleMenuClick = () => {};

  return (
    <div className="relative min-h-screen bg-[#F7F7F7] flex flex-col items-center">
      {!isLoginPage && (
        <div className="fixed top-0 z-50 w-full max-w-[430px]">
          <Header onMenuClick={handleMenuClick} />
        </div>
      )}

      <main className="w-full max-w-[430px] pt-[172px] pb-[100px] px-5 flex-1 overflow-y-auto">
        <Routes>
          <Route
            path="/login"
            element={!accessToken ? <LoginPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/"
            element={!accessToken ? <Navigate to="/login" replace /> : <HomePage />}
          />
          <Route
            path="/mentee"
            element={!accessToken ? <Navigate to="/login" replace /> : <HomePage />}
          />
          <Route element={<ProtectedRoute allowedRoles={["MENTEE"]} />}>
            <Route path="/assignment-management" element={<AssignmentManagementPage />} />
            <Route path="/mentee/assignment-management" element={<AssignmentManagementPage />} />
          </Route>
        </Routes>
      </main>

      {!isLoginPage && (
        <div className="fixed bottom-0 z-50 w-full max-w-[430px]">
          <Tabbar />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter basename="/app">
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;