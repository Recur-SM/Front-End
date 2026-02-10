import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import LoginPage from "./pages/LoginPage";
import MentorHome from "./pages/MentorHome";
import MenteeHome from "./pages/MenteeHome";
import MenteeAppHome from "./pages/MenteeAppHome";
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
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 멘토 전용 라우트 구역 */}
      <Route element={<ProtectedRoute allowedRoles={["MENTOR"]} />}>
        <Route path="/mentor/dashboard" element={<MentorHome />} />
      </Route>

      {/* 멘티 전용 라우트 구역 */}
      <Route path="/mentee-a/*" element={<MenteeAppHome />} />
      <Route element={<ProtectedRoute allowedRoles={["MENTEE"]} />}>
        <Route path="/mentee-w/*" element={<MenteeHome />} />
        {/* <Route path="/mentee/*" element={<MenteeHome />} /> */}
      </Route>
    </Routes>
  );
}

export default App;