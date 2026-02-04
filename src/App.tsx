import { useState } from 'react';
import Sidebar from './components/sidebar';

function App() {
  const dummyStudents = ["김제현", "이슬아", "박지민", "최유진"];
  const [selectedStudent, setSelectedStudent] = useState<string | null>(dummyStudents[0]);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* 좌측 사이드바: Sidebar.tsx 내부에 'sticky top-0'과 'h-screen'이 있어야 고정됩니다. */}
      <Sidebar
        role="mentor"
        userName="김정엽"
        students={dummyStudents}
        selectedStudent={selectedStudent}
        onStudentSelect={setSelectedStudent}
      />

      {/* 우측 메인 콘텐츠 영역: 세로로 아주 길게 설정 */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* 상단 섹션 */}
          <header>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedStudent} 학생 학습 관리 대시보드
            </h2>
            <p className="text-gray-400 mt-2">스크롤을 내려서 사이드바 고정을 확인해보세요. ↓</p>
          </header>

          {/* 테스트용 긴 콘텐츠 박스들 */}
          <div className="grid gap-8">
            <section className="bg-white h-[600px] rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold mb-4">오늘 할 일 (상단)</h3>
              <div className="w-full h-full bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                콘텐츠 1
              </div>
            </section>

            <section className="bg-white h-[600px] rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold mb-4">주간 학습 리포트 (중간)</h3>
              <div className="w-full h-full bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                콘텐츠 2
              </div>
            </section>

            <section className="bg-white h-[800px] rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold mb-4">월간 계획표 (하단)</h3>
              <div className="w-full h-full bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                콘텐츠 3
              </div>
            </section>
          </div>

          <footer className="py-10 text-center text-gray-300">
            끝까지 내려왔습니다! 여전히 사이드바가 왼쪽에 보이나요?
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;