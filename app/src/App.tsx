import { BrowserRouter, Routes, Route } from 'react-router-dom'; // BrowserRouter 추가
import HomePage from './pages/HomePage';
import Header from "./components/header";
import Tabbar from "./components/tabbar";

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen flex flex-col items-center justify-between bg-[#F7F7F7]">
        {/* 상단 헤더 컴포넌트 */}
        <Header />

        <main className="flex-1 w-full">
           <Routes>
             <Route path="/" element={<HomePage />} />
           </Routes>
        </main>

        {/* 하단 탭바 컴포넌트 */}
        <Tabbar />
      </div>
    </BrowserRouter>
  );
}

export default App;