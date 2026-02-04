import CalendarWidget from './components/calendar'; 

function App() {
  return (
    // 전체 레이아웃
    <div className="flex min-h-screen bg-[#F9FAFB]">
      
      {/* 왼쪽: 사이드바 대용 */}
      <div 
        className="bg-gray-400 sticky top-0" 
        style={{ width: '207px', height: '1000px' }}
      >
        <div className="p-4 text-white font-bold text-sm">
          Sidebar (207px)
        </div>
      </div>

      {/* 오른쪽: 탑바 대용 + 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col">
        
        {/* 탑바 대용 상자 */}
        <div className="h-[76px] w-full bg-gray-200 border-b border-gray-300 flex items-center px-8">
          <span className="text-gray-500 font-bold">Topbar Placeholder (76px)</span>
        </div>
        
        {/* 메인 영역 */}
        <main className="p-10 flex justify-center items-start">
          <div className="w-full max-w-[1000px]">
            {/* 캘린더 위젯 */}
            <CalendarWidget />
          </div>
        </main>

      </div>
    </div>
  );
}

export default App;