import React from 'react';

interface SidebarProps {
  role: 'mentor' | 'mentee';
  userName: string;
  students?: string[];
  selectedStudent?: string | null;
  onStudentSelect?: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  role,
  userName,
  students = [],
  selectedStudent,
  onStudentSelect,
}) => {
  return (
    <aside className="w-[12.5vw] h-screen bg-white border-r border-gray-200 flex flex-col p-[2.22vh_1.25vw] sticky top-0 shadow-sm overflow-x-hidden">
      {/* 상단 프로필 영역 */}
      <div className="mb-[3.7vh]">
        <div className="text-[0.78vw] text-[#FF6738] font-bold mb-[1.48vh]">설 스터디</div>
        <div className="flex items-center gap-[0.625vw] mb-[0.09vh]">
          <div className="w-[1.45vw] h-[2.59vh] bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 text-[0.62vw]">
            👤
          </div>
          <span className="text-[1.25vw] font-bold text-[#111111] tracking-tight">{userName}</span>
        </div>
        
        {role !== 'mentor' && (
          <button className="text-[0.78vw] text-[#505050] mt-[0.09vh] ml-[2.08vw] transition-colors">
            마이페이지 &gt;
          </button>
        )}
      </div>

      {/* 중앙 영역 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* 학생 목록 영역 (멘토 전용) */}
        {role === 'mentor' && (
          <div className="mb-[4.44vh]">
            <div className="text-[0.67vw] text-[#111111] font-extrabold mb-[1.85vh] uppercase tracking-wider">학생 목록</div>
            <ul className="space-y-[1.85vh] pl-[0.41vw]"> 
              {students.map((student) => (
                <li
                  key={student}
                  onClick={() => onStudentSelect?.(student)}
                  className={`cursor-pointer text-[0.78vw] ${
                    student === selectedStudent
                      ? 'text-[#FF6738] font-bold'
                      : 'text-[#505050]'
                  }`}
                >
                  {student}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 메뉴 영역 */}
        <nav>
          <div className="text-[0.67vw] text-[#111111] font-extrabold mb-[1.85vh] uppercase tracking-wider">메뉴</div>
          <ul className="space-y-[2.59vh] pl-[0.41vw]"> 
            {['질의응답', '서울대생칼럼', '줌미팅 피드백', '약점 맞춤 솔루션'].map((menu) => (
              <li 
                key={menu}
                className="text-[0.78vw] text-[#505050] cursor-pointer font-medium transition-colors"
              >
                {menu}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 로그아웃 */}
      <div className="mt-auto">
        <button className="flex items-center gap-[0.41vw] text-[0.78vw] text-[#111111]">
          <span className="text-[0.93vw]">↪</span> 로그아웃
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;