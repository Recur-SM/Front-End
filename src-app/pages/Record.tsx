import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/backIcon.svg";
import TimerItem from "../components/timer";

const Record = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-auto overflow-x-hidden py-[32px] flex flex-col gap-[8px]">
            {/* 공부 시간 기록 버튼 */}
            <div 
                onClick={() => navigate("/mentee/assignment-management")}
                className="w-[89px] h-[30px] rounded-[12px] flex justify-center items-center gap-[4px] ml-auto mr-[4px] border border-[#E5E5EC] text-[12px] text-[#767676] bg-white cursor-pointer active:bg-gray-50"
            >
                <img src={BackIcon} alt="돌아가기" className="w-[20px] h-[20px]" />
                <span>돌아가기</span>
            </div>

            {/* 오늘 할 일 리스트 */}
            <div className="w-[384px] min-h-[122px] p-[12px] rounded-[8px] bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
                <h3 className="text-[20px] font-semibold text-[#111111] mb-[24px]">1월 8일 할 일</h3>
                    <div className="flex flex-col">
                        <TimerItem title="수학 오답 노트" />
                        <TimerItem title="영어 단어 암기" />
                    </div>
            </div>
        </div>
    );
};

export default Record;