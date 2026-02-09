import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from "../assets/profileIcon.svg";
import LogoutIcon from "../assets/logoutIcon.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userName }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* 배경 어둡게 */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* 메뉴 바 */}
      <div className="w-[159px] h-[932px] bg-white flex flex-col p-[24px_12px_24px_24px] sticky top-0 overflow-x-hidden z-100">
        {/* 상단 로고 & 프로필 영역 */}
        <div className="w-[111px] h-[104px] flex flex-col items-start border-b border-[#EFEFEF] mb-[24px]">
            <div className="text-[15px] text-[#FF6738] font-medium m-[4px] tracking-widest">
            설 스터디
            </div>

            <div className="flex items-center gap-[8px] mx-[8px] mb-[2px]">
                <img src={ProfileIcon} alt="프로필" className="w-[17.33px] h-[17.33px] m-[4.33px] object-contain" />
                <span className="text-[20px] font-medium text-[#111111]">이하은</span>
            </div>
          
            <button 
                onClick={() => navigate('/mentee/assignment-detail')}
                className="text-[12px] text-[#767676] mx-[8px] mb-[1.5px]"
                >
                마이페이지 &gt;
            </button>
        </div>

        {/* 메뉴 영역 */}
        <nav className="w-[135px] h-[239px] flex flex-col items-start">
            <div className="text-[12px] text-[#111111] font-semibold m-[10px]">
                메뉴
            </div>

            <ul className="font-medium text-[13px] text-[#505050] gap-[8px]">
              <li className="cursor-pointer mx-[10px] my-[8px]" onClick={onClose}>질의응답</li>
              <li className="cursor-pointer mx-[10px] my-[8px]" onClick={onClose}>서울대생 칼럼</li>
              <li className="cursor-pointer mx-[10px] my-[8px]" onClick={onClose}>줌미팅 피드백</li>
              <li className="cursor-pointer mx-[10px] my-[8px]" onClick={onClose}>약점 맞춤 솔루션</li>
            </ul>
          </nav>
        </div>
        
         {/* 하단 로그아웃 */}
        <button
            className="flex items-center gap-[8px] text-[13px] text-[#505050]"
            >
            <img src={LogoutIcon} alt="로그아웃" className="w-[20px] h-[20px] mx-[8px] my-[10px]" />
            <span>로그아웃</span>
        </button>
    </div>
  );
};

export default Sidebar;