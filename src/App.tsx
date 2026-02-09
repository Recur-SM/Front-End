import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import LoginPage from "./pages/LoginPage";
import MentorHome from "./pages/MentorHome";
import MenteeHome from "./pages/MenteeHome";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { accessToken, role } = useAuthStore();

  return (
    <Routes>
      <Route
        path="/login"
        element={!accessToken ? <LoginPage /> : <Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={
          !accessToken ? (
            <Navigate to="/login" replace />
          ) : role === "MENTOR" ? (
            <MentorHome />
          ) : (
            <MenteeHome />
          )
        }
      />

      {/* 멘토 전용 라우트 구역 */}
      <Route element={<ProtectedRoute allowedRoles={["MENTOR"]} />}>
        <Route path="/mentor/dashboard" element={<MentorHome />} />
        {/* 추가적인 멘토 전용 페이지들을 여기에 작성 */}
      </Route>

      <Route path="/mentee/my-page" element={<MenteeHome />} />
      {/* 멘티 전용 라우트 구역 */}
      <Route element={<ProtectedRoute allowedRoles={["MENTEE"]} />}>
        {/* <Route path="/mentee/my-page" element={<MenteeHome />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
