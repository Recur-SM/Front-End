import MenuIcon from "../assets/menu.svg"
import ProfileIcon from "../assets/profileIcon.svg"

const Header = () => {
  return (
    <header className="fixed w-[100vw] h-[172px] pt-[54px] px-[24px] flex flex-col justify-between items-center bg-white rounded-b-[32px]">
      <div className="w-[430px] h-[56px] px-[24px] flex items-center">
        <img src={MenuIcon} alt="메뉴" className="w-[16px] mx-[4px] my-[6.73px]"></img>
        <div className="text-[20px] text-[#FF6738] ml-[129px] mr-[84px]">설 스터디</div>
        <div className="w-[68px] flex items-center gap-[6px]">
            <img src={ProfileIcon} alt="프로필" className="w-[16px] m-[4px]"></img>
            <div className="text-[14px]">김제현</div>
        </div>
      </div>
    </header>
  );
};

export default Header;