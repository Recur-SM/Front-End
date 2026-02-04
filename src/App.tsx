import Header from './components/Topbar'; 

function App() {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      
      {/* 왼쪽: 사이드바 대용 회색 상자 (너비 207px, 높이 500px 고정) */}
      <div 
        className="bg-gray-400 sticky top-0" 
        style={{ width: '207px', height: '800px' }}
      >
        <div className="p-4 text-white font-bold text-sm">
          Sidebar Placeholder (207px)
        </div>
      </div>

      {/* 오른쪽: 탑바와 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 탑바 */}
        <Header /> 
        
        
      </div>
    </div>
  );
}

export default App;