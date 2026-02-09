import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from "../../src-app/components/header";
import DetailHeader from "../../src-app/components/detailHeader";
import Tabbar from "../../src-app/components/tabbar";
import Sidebar from "../../src-app/components/sidebar";
import HomePage from '../../src-app/pages/HomePage';
import AssignmentManagement from '../../src-app/pages/AssignmentManagement';
import Record from '../../src-app/pages/Record';
import AssignmentDetail from '../../src-app/pages/AssignmentDetail';

function MenteeHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 과제 세부 페이지 -> 헤더 변경
  const isDetailPage = location.pathname === '/mentee-a/assignment-detail';

  return (
    <div className="relative min-h-screen bg-[#F7F7F7] w-full">

      {/* 상단 헤더 */}
      <div className="fixed top-0 z-50 w-full max-w-[430px]">
        {isDetailPage ? (
          <DetailHeader />
        ) : (
          <Header onMenuClick={() => setIsSidebarOpen(true)} /> // 기본 페이지일 때
        )}
      </div>

      {/* 메인 콘텐츠 */}
      <main className="w-full max-w-[430px] pt-[105px] pb-[100px] px-[24px] flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assignment-management" element={<AssignmentManagement />} />
          <Route path="/record" element={<Record />} />
          <Route path="/assignment-detail" element={<AssignmentDetail />} />
        </Routes>
      </main>

      {/* 하단 탭바 */}
      <div className="fixed bottom-0 z-50 w-full max-w-[430px]">
        <Tabbar />
      </div>

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