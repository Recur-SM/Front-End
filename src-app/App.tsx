import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Tabbar from "./components/tabbar";
import HomePage from './pages/HomePage';
import AssignmentManagementPage from './pages/AssignmentManagement';

function App() {
  return (
    <BrowserRouter>
      {/* 화면 전체 */}
      <div className="relative min-h-screen bg-[#F7F7F7] flex flex-col items-center">
        
        {/* 상단 헤더 */}
        <div className="fixed top-0 z-50 w-full max-w-[430px]">
          <Header />
        </div>

        {/* 메인 콘텐츠 */}
        <main className="w-full max-w-[430px] pt-[172px] pb-[100px] px-5 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assignment-management" element={<AssignmentManagementPage />} />
          </Routes>
        </main>

        {/* 하단 탭바 */}
        <div className="fixed bottom-0 z-50 w-full max-w-[430px]">
          <Tabbar />
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;