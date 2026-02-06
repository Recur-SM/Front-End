import React from 'react';
import BookIcon from "../assets/bookIcon.svg";
import PencilIcon from "../assets/pencilIcon.svg";
import ProfileIcon from "../assets/profileIcon.svg";

const Tabbar: React.FC = () => {
  return (
    /* 전체 바 */
    <div className="w-[100vw] h-[6.87vh] px-[11.16vw] flex justify-between items-center rounded-t-[7.44vw] bg-white shadow-[0_-0.43vh_1.16vw_rgba(0,0,0,0.05)]">
        
        {/* 학습 관리 */}
        <div className="w-[11.86vw] flex flex-col items-center">
            <img 
              src={BookIcon} 
              alt="학습 관리" 
              className="w-[5.7vw] h-[2.25vh] mx-[0.41vw] my-[0.38vh] object-contain" 
            />
            <div className="text-[2.79vw] mt-[0.43vh] font-medium text-[#999999]">학습 관리</div>
        </div>

        {/* 과제 관리 */}
        <div className="w-[11.86vw] flex flex-col items-center">
            <img 
              src={PencilIcon} 
              alt="과제 관리" 
              className="w-[3.76vw] h-[1.89vh] mx-[5.02vw] my-[0.34vh] object-contain" 
            />
            <div className="text-[2.79vw] mt-[0.54vh] ml-[0.7vw] font-medium text-[#999999]">과제 관리</div>
        </div>

        {/* 마이페이지 */}
        <div className="w-[11.86vw] flex flex-col items-center">
            <img 
              src={ProfileIcon} 
              alt="마이페이지" 
              className="w-[4.34vw] h-[2.0vh] m-[1.09vw] object-contain" 
            />
            <div className="text-[2.79vw] mt-[0.43vh] font-medium text-[#999999]">마이페이지</div>
        </div>
    </div>
  );
};

export default Tabbar;