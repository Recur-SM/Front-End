import BookIcon from "../assets/bookIcon.svg";
import PencilIcon from "../assets/pencilIcon.svg";
import ProfileIcon from "../assets/profileIcon.svg";

const Tabbar: React.FC = () => {
  return (
    <div className="w-[334px] h-[64px] px-[48px] flex justify-between items-end rounded-t-[32px] bg-white">
        <div className="mw-[51px] flex flex-col items-center">
            <img src={BookIcon} alt="학습 관리" className="mw-[24.5px] h-[20.99px] mx-[1.75px] my-[3.5px] object-contain" ></img>
            <div className="text-[12px] mt-[4px]">학습 관리</div>
        </div>
        <div className="mw-[51px] flex flex-col itmes-center">
            <img src={PencilIcon} alt="과제 관리" className="mw-[16.16px] h-[17.58px] mx-[21.58px] my-[3.21px] object-contain" ></img>
            <div className="text-[12px] mt-[5px] ml-[3px]">과제 관리</div>
        </div>
        <div className="mw-[51px] flex flex-col items-center">
            <img src={ProfileIcon} alt="마이페이지" className="mw-[18.67px] h-[18.67px] m-[4.67px] object-contain" ></img>
            <div className="text-[12px] mt-[4px]">마이페이지</div>
        </div>
    </div>
  );
};

export default Tabbar;