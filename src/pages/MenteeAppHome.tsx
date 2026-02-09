import { Routes, Route, Outlet } from 'react-router-dom'; // Outlet 추가
import { useState } from 'react';

import Header from "../../src-app/components/header";
import DetailHeader from "../../src-app/components/detailHeader";
import Tabbar from "../../src-app/components/tabbar";
import Sidebar from "../../src-app/components/sidebar";
import HomePage from '../../src-app/pages/HomePage';
import LoginPage from '../../src-app/pages/LoginPage';
import AssignmentManagement from '../../src-app/pages/AssignmentManagement';
import Record from '../../src-app/pages/Record';
import AssignmentDetail from '../../src-app/pages/AssignmentDetail';

function MenteeHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 헤더 + 탭바 포함
  const MainLayout = () => (
    <>
      <div className="fixed top-0 z-50 w-full max-w-[430px]">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </div>
      <main className="w-full max-w-[430px] pt-[105px] pb-[100px] px-[24px] flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <div className="fixed bottom-0 z-50 w-full max-w-[430px]">
        <Tabbar />
      </div>
    </>
  );

  // 상세 헤더만, 탭바 없음
  const DetailLayout = () => (
    <>
      <div className="fixed top-0 z-50 w-full max-w-[430px]">
        <DetailHeader />
      </div>
      <main className="w-full max-w-[430px] pt-[105px] pb-0 px-[24px] flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </>
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center">
      <Routes>
        {/* 헤더/탭바 제외 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 헤더 + 탭바 있음 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/assignment-management" element={<AssignmentManagement />} />
          <Route path="/record" element={<Record />} />
        </Route>

        {/* 상세 헤더만 있음 */}
        <Route element={<DetailLayout />}>
          <Route path="/assignment-detail" element={<AssignmentDetail />} />
        </Route>
      </Routes>

      {/* 사이드바 */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        userName="김제현"
      />
    </div>
  );
}

export default MenteeHome;