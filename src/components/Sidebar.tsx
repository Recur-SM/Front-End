import React from 'react';
// 아이콘 파일 import
import profileIcon from '../assets/profileIcon.svg';
import logoutIcon from '../assets/logoutIcon.svg';

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
    <aside className="w-[11vw] h-screen bg-white border-r border-gray-200 flex flex-col p-[2.22vh_1.25vw] sticky top-0 shadow-sm overflow-x-hidden">
      {/* 상단 프로필 영역 */}
      <div className="mb-[3.7vh]">
        <div className="text-xs text-[#FF6738] font-medium mb-[1.48vh]">설 스터디</div>
        <div className="flex items-center gap-[0.625vw] mb-[0.09vh]">
          <div className="w-[1.45vw] h-[2.59vh] flex items-center justify-center overflow-hidden">
            <img src={profileIcon} alt="프로필" className="w-full h-full object-contain" />
          </div>
          <span className="text-md font-medium text-[#111111] tracking-tight">{userName}</span>
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
            <div className="text-xs text-[#111111] font-semibold mb-[1.85vh] uppercase tracking-wider">학생 목록</div>
            <ul className="space-y-[1.4vh] pl-[0.41vw]"> 
              {students.map((student) => (
                <li
                  key={student}
                  onClick={() => onStudentSelect?.(student)}
                  className={`cursor-pointer text-xs ${
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
          <div className="text-xs text-[#111111] font-semibold mb-[1.85vh] uppercase tracking-wider">메뉴</div>
          <ul className="space-y-[1.4vh] pl-[0.41vw]"> 
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
          <img src={logoutIcon} alt="로그아웃" className="w-[0.93vw] h-[0.93vw]" />
          로그아웃
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;