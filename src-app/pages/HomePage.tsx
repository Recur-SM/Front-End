import List from "../components/list";

const HomePage = () => {
  return (
    <div className="w-full min-h-auto overflow-x-hidden py-[32px] flex flex-col gap-[8px]">
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

      <div className="w-[384px] mh-[122px] p-[12px] rounded-[8px] bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
        <List 
          title="전날 피드백" 
          type={2} 
          items={[
            { title: "수학 오답 노트", date: "2월 7일" },
            { title: "단어 암기", date: "2월 7일", file: "영어_단어_암기_노트_해설.pdf" }
          ]} 
        />
      </div>
    </div>
  );
};

export default HomePage;