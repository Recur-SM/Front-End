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
    
    if (tabPath === "/mentee-a/assignment-management") {
      return currentPath === "/mentee-a/assignment-management" || currentPath === "/mentee-a/record" || currentPath === "/mentee-a/assignment-detail";
    }
    
    return currentPath === tabPath;
  };

  const tabs = [
    { name: "학습 관리", icon: BookIcon, activeIcon: BookIconActive, path: "/mentee-a" },
    { name: "과제 관리", icon: PencilIcon, activeIcon: PencilIconActive, path: "/mentee-a/assignment-management" },
    { name: "마이페이지", icon: ProfileIcon, activeIcon: ProfileIconActive, path: "/mentee-a/my-page" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] h-[98px] px-[48px] pb-[31px] flex justify-between items-center rounded-t-[32px] bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      
      {tabs.map((tab) => {
        const active = getActiveTab(tab.path);
        
        return (
          <div 
            key={tab.path}
            onClick={() => navigate(tab.path)} 
            className="w-[60px] flex flex-col justify-end items-center cursor-pointer"
          >
            <img 
              src={active ? tab.activeIcon : tab.icon}
              alt={tab.name} 
              className={`w-[24px] h-[24px] object-contain transition-all`} 
            />
            <div className={`text-[12px] mt-[4px] font-medium transition-colors ${
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