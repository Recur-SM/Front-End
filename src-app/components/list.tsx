interface ListItem {
  title: string;
  date: string;
  file?: string;
}

interface ListProps {
  title: string;
  type: 1 | 2 | 3;
  items?: ListItem[];
}

const List = ({ title, type, items = [] }: ListProps) => {
  return (
    <div className="w-full max-w-[430px] rounded-[24px] p-[12px]">
      
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-[20px]">
        <h3 className="text-[20px] font-semibold text-[#111111]">{title}</h3>
        {type === 1 && (
          <div className="flex gap-[8px]">
            {["전체", "국어", "영어", "수학"].map((f, i) => (
              <span key={i} className={`px-[16px] py-[4px] rounded-full text-[13px] ${i === 0 ? 'border border-[#FF6738] text-[#FF6738]' : 'border border-[#F7F7F7] text-[#111111]'}`}>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 본문 영역 */}
      <div className="min-h-[100px] flex flex-col gap-4">
        //
        {/* 타입 1: 할 일 추가 */}
        {type === 1 && (
          <>
            <div className="grid grid-cols-[1.5fr_1fr_2fr] text-[14px] text-[#111111] font-semibold pb-[4px]">
              <span>제목</span><span>날짜</span><span>학습지</span>
            </div>
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[1.5fr_1fr_2fr] items-center text-[14px] py-1">
                <div className="text-[#111111]">{item.title} <span className="text-[12px] text-[#999999]">↗</span></div>
                <span className="text-[#111111]">{item.date}</span>
                <span className={item.file ? "text-[#FF6738] underline" : "text-[#999999]"}>
                  {item.file ? `${item.file} 📥` : "-"}
                </span>
              </div>
            ))}
            <div className="text-[#999999] text-[14px] mt-2">+ 할일</div>
          </>
        )}

        {/* 타입 2: 내용이 없는 양식 */}
        {type === 2 && (
          <div className="flex flex-col">
            <div className="text-[#999999] text-[14px] mb-8">+ 할일</div>
            <div className="text-[#999999] text-[14px] self-center">내용이 없습니다</div>
          </div>
        )}
      </div>

    </div>
  );
};

export default List;