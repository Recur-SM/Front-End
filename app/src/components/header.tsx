import MenuIcon from "../assets/menu.svg";
import ProfileIcon from "../assets/profileIcon.svg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[172px] pt-[54px] flex justify-center bg-white rounded-b-[32px] shadow-sm z-50">
      <div className="w-full max-w-[430px] h-[56px] px-[24px] flex items-center justify-between">
        <img src={MenuIcon} alt="메뉴" className="w-[20px] h-[20px] object-contain cursor-pointer" />
        
        <div className="text-[20px] font-bold text-[#FF6738] flex-1 text-center">
          설 스터디
        </div>
        
        <div className="flex items-center gap-[6px] min-w-[70px] justify-end">
            <img src={ProfileIcon} alt="프로필" className="w-[18px] h-[18px]" />
            <div className="text-[14px] font-medium whitespace-nowrap">김제현</div>
        </div>
      </div>
    </header>
  );
};

export default Header;