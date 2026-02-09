import { Routes, Route } from 'react-router-dom';
import Header from "../../src-app/components/header";
import Tabbar from "../../src-app/components/tabbar";
import HomePage from '../../src-app/pages/HomePage';
import AssignmentManagement from '../../src-app/pages/AssignmentManagement';
import Record from '../../src-app/pages/Record';

function MenteeHome() {
  return (
    <div className="relative min-h-screen bg-[#F7F7F7] w-full">
      
      {/* 상단 헤더 */}
      <div className="fixed top-0 z-50 w-full max-w-[430px]">
        <Header />
      </div>

      {/* 메인 콘텐츠 */}
      <main className="w-full max-w-[430px] pt-[172px] pb-[100px] px-[24px] flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assignment-management" element={<AssignmentManagement />} />
          <Route path="/record" element={<Record />} />
        </Routes>
      </main>

      {/* 하단 탭바 */}
      <div className="fixed bottom-0 z-50 w-full max-w-[430px]">
        <Tabbar />
      </div>

    </div>
  );
}

export default MenteeHome;