import List from "../components/list";
import Clock from "../assets/clock.svg";

const AssignmentManagementPage = () => {
    return (
        <div className="w-full min-h-auto overflow-x-hidden py-[32px] flex flex-col gap-[8px]">
            <div className="w-[137px] h-[30px] rounded-[12px] flex justify-center items-center gap-[4px] ml-auto mr-[4px] border border-[#E5E5EC] text-[12px] text-[#767676] bg-white">
                <img src={Clock} alt="시계" className="w-[20px] h-[20px]"></img>
                <span>공부 시간 기록하기</span>
            </div>

            <div className="w-[384px] mh-[122px] p-[12px] rounded-[8px] bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
                <List
                    title="오늘 할 일"
                    type={1}
                    items={[
                        { title: "수학 오답 노트", date: "2월 8일", file: "수학_오답노트_양식.pdf" },
                        { title: "단어 암기", date: "2월 8일" }
                    ]}
                />
            </div>

            <div className="w-[382px] h-[291px] flex justify-between items-center"></div>
        </div>
    );
};

export default AssignmentManagementPage;