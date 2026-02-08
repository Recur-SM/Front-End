import List from "../components/list";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden py-[32px] flex flex-col gap-[8px]">
      <div className="w-[384px] mh-[122px] p-[12px] rounded-[8px] bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
        <List 
          title="오늘 할 일" 
          type={1} 
          items={[
            { title: "수학 오답 노트", date: "1월 8일", file: "수학_오답노트_양식.pdf" },
            { title: "단어 암기", date: "1월 8일" }
          ]} 
        />
      </div>

      <div className="w-[384px] h-[122px] p-[12px] rounded-[8px] bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
        <div className="text-[20px] font-semibold my-[1px]">전날 피드백</div>
        {/* 리스트 컴포넌트 */}
      </div>

      <div className="w-[384px] h-[122px] p-[12px] rounded-[8px] bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
        <div className="text-[20px] font-semibold my-[1px]">주간 리포트</div>
        {/* 리스트 컴포넌트 */}
      </div>
    </div>
  );
};

export default HomePage;