import { useNavigate } from 'react-router-dom'; 
import BackArrow from "../assets/backArrow.svg";
import ProfileIcon from "../assets/profileIcon.svg";

const DetailHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full h-[122px] pt-[54px] px-[24px] flex flex-col justify-center bg-[#F7F7F7] z-50">
      <div className="w-[382px] h-[56px] flex items-center justify-between mb-[12px]">
        <div className="flex-1 flex justify-start items-center">
          <div className="w-[40px] h-[40px] flex items-center justify-start">
            <img 
              src={BackArrow} 
              alt="돌아가기" 
              onClick={() => navigate('/app/assignment-management')} 
              className="w-[40px] h-[40px] object-contain cursor-pointer" 
            />
          </div>
        </div>
        
        <div className="flex-none flex justify-center items-center">
          <div className="text-[20px] font-bold text-[#FF6738] whitespace-nowrap">
            설 스터디
          </div>
        </div>
        
        <div className="flex-1 flex justify-end items-center">
          <div className="flex items-center gap-[6px] py-[4px]">
            <img src={ProfileIcon} alt="프로필" className="w-[18px] h-[18px]" />
            <div className="text-[14px] font-medium whitespace-nowrap text-[#333]">
              김제현
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-[#E5E5EC]"></div>
    </header>
  );
};

export default DetailHeader;