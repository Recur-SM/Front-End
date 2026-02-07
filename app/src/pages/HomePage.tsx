const HomePage = () => {
  return (
    <div className="w-[418px] py-[32px] flex flex-col justify-center gap-[8px]">
      <div className="w-[384px] h-[122px] p-[12px] rounded-[8px] bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
        <div className="text-[20px] font-semibold my-[1px]">오늘 할 일</div>
        {/* 리스트 컴포넌트 */}
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