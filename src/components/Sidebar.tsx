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
    <aside className="w-60 h-screen bg-white border-r border-gray-200 flex flex-col p-6 sticky top-0 shadow-sm overflow-x-hidden">
      {/* 상단 프로필 영역 */}
      <div className="mb-10">
        <div className="text-[15px] text-[#FF6738] font-bold mb-4">설 스터디</div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-7 h-7 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xs">
            👤
          </div>
          <span className="text-[24px] font-bold text-[#111111] tracking-tight">{userName}</span>
        </div>
        
        {role !== 'mentor' && (
          <button className="text-[15px] text-[#505050] mt-1 ml-10 transition-colors">
            마이페이지 &gt;
          </button>
        )}
      </div>

      {/* 중앙 영역 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* 학생 목록 영역 (멘토 전용) */}
        {role === 'mentor' && (
          <div className="mb-12">
            <div className="text-[13px] text-[#111111] font-extrabold mb-5 uppercase tracking-wider">학생 목록</div>
            <ul className="space-y-5 pl-2"> 
              {students.map((student) => (
                <li
                  key={student}
                  onClick={() => onStudentSelect?.(student)}
                  className={`cursor-pointer text-[15px] ${
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
          <div className="text-[13px] text-[#111111] font-extrabold mb-5 uppercase tracking-wider">메뉴</div>
          <ul className="space-y-7 pl-2"> 
            {['질의응답', '서울대생칼럼', '줌미팅 피드백', '약점 맞춤 솔루션'].map((menu) => (
              <li 
                key={menu}
                className="text-[15px] text-[#505050] cursor-pointer font-medium transition-colors"
              >
                {menu}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 로그아웃 */}
      <div className="mt-auto">
        <button className="flex items-center gap-2 text-[15px] text-[#111111]">
          <span className="text-lg">↪</span> 로그아웃
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;