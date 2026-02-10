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
      {/* Header: z-index를 최상위급으로 높이고 bg-white 추가 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[430px] bg-white">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </div>
      
      {/* main: relative z-10으로 설정하여 고정 요소들보다 아래에 위치하게 함 */}
      <main className="relative z-10 w-full pt-[105px] pb-[100px] px-[24px] flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>

      {/* Tabbar: z-index를 높여 클릭 방해 차단 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[430px] bg-white">
        <Tabbar />
      </div>
    </>
  );

  // 상세 헤더 레이아웃
  const DetailLayout = () => (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[430px] bg-white">
        <DetailHeader />
      </div>
      
      <main className="relative z-10 w-full pt-[105px] pb-0 px-[24px] flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[430px] bg-white">
        <Tabbar />
      </div>
    </>
  );

  return (
    <div className="min-h-screen w-full bg-[#F7F7F7] flex justify-center overflow-x-hidden">
      <div className="relative w-full max-w-[430px] min-h-screen bg-white"> {/* bg-white 추가로 가독성 확보 */}
        <Routes>
          {/* 하위 경로 매칭 시 / 제거 (상대 경로 적용) */}
          <Route path="login" element={<LoginPage />} />

          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="assignment-management" element={<AssignmentManagement />} />
            <Route path="record" element={<Record />} />
          </Route>

          <Route element={<DetailLayout />}>
            <Route path="assignment-detail" element={<AssignmentDetail />} />
          </Route>
        </Routes>

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