import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookIcon from "../assets/bookIcon.svg";
import PencilIcon from "../assets/pencilIcon.svg";
import ProfileIcon from "../assets/profileIcon.svg";
import BookIconActive from "../../src-app/assets/bookIcon_active.svg";
import PencilIconActive from "../assets/pencilIcon_active.svg";
import ProfileIconActive from "../assets/profileIcon_active.svg";

const Tabbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = (tabPath: string) => {
    const currentPath = location.pathname;
    
    if (tabPath === "/mentee/assignment-management") {
      return currentPath === "/mentee/assignment-management" || currentPath === "/mentee/record" || currentPath === "/mentee/assignment-detail";
    }
    
    return currentPath === tabPath;
  };

  const tabs = [
    { name: "학습 관리", icon: BookIcon, activeIcon: BookIconActive, path: "/mentee" },
    { name: "과제 관리", icon: PencilIcon, activeIcon: PencilIconActive, path: "/mentee/assignment-management" },
    { name: "마이페이지", icon: ProfileIcon, activeIcon: ProfileIconActive, path: "/mentee/my-page" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] h-[6.87vh] px-[11.16vw] flex justify-between items-center rounded-t-[7.44vw] bg-white shadow-[0_-0.43vh_1.16vw_rgba(0,0,0,0.05)]">
      
      {tabs.map((tab) => {
        const active = getActiveTab(tab.path);
        
        return (
          <div 
            key={tab.path}
            onClick={() => navigate(tab.path)} 
            className="w-[14vw] flex flex-col items-center cursor-pointer"
          >
            <img 
              src={active ? tab.activeIcon : tab.icon}
              alt={tab.name} 
              className={`w-[5.7vw] h-[2.25vh] object-contain transition-all`} 
            />
            <div className={`text-[2.79vw] mt-[0.43vh] font-medium transition-colors ${
              active ? "text-[#FF6738]" : "text-[#999999]"
            }`}>
              {tab.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tabbar;