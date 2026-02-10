import { Routes, Route, Outlet } from 'react-router-dom';
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

function MenteeAppHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 헤더 + 탭바 포함 레이아웃
  const MainLayout = () => (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </div>
      
      <main className="w-full pt-[105px] pb-[100px] px-[24px] flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]">
        <Tabbar />
      </div>
    </>
  );

  // 상세 헤더 레이아웃
  const DetailLayout = () => (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]">
        <DetailHeader />
      </div>
      
      <main className="w-full pt-[105px] pb-0 px-[24px] flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]">
        <Tabbar />
      </div>
    </>
  );

  return (
    /* 웹 배경색 설정 및 중앙 정렬 컨테이너 */
    <div className="min-h-screen w-full bg-[#F7F7F7] flex justify-center overflow-x-hidden">
      
      {/* 실제 모바일 앱 규격 영역 */}
      <div className="relative w-full max-w-[430px] min-h-screen">
        
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/assignment-management" element={<AssignmentManagement />} />
            <Route path="/record" element={<Record />} />
          </Route>

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
    </div>
  );
}

export default MenteeAppHome;