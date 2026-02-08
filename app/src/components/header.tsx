import MenuIcon from "../assets/menu.svg";
import ProfileIcon from "../assets/profileIcon.svg";
import Calendar from "../components/calendar";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[172px] pt-[54px] flex flex-col justify-center bg-white rounded-b-[32px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] z-50">
      <div className="w-full max-w-[430px] h-[56px] px-[24px] flex items-center justify-between">
        <div className="flex-1 flex justify-start items-center">
          <div className="w-[40px] h-[40px] flex items-center justify-start">
            <img src={MenuIcon} alt="메뉴" className="w-[20px] h-[20px] object-contain cursor-pointer" />
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

      {/* 캘린더 */}
      <Calendar />
    </header>
  );
};

export default Header;