import { useState } from 'react';
import ArrowIcon from "../assets/arrow.svg";

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
  const [isAdding, setIsAdding] = useState(false);
  const [activeFilter, setActiveFilter] = useState("전체");

  const filters = ["전체", "국어", "영어", "수학"];

  return (
    <div className="w-full max-w-[430px] rounded-[24px]">
      
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-[20px]">
        <h3 className="text-[20px] font-semibold text-[#111111]">{title}</h3>
        {items.length > 0 && (type === 1 || type === 2) && (
          <div className="flex gap-[8px]">
            {filters.map((f) => (
              <span 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`px-[16px] py-[4px] rounded-full text-[13px] transition-all cursor-pointer
                ${activeFilter === f 
                  ? 'border border-[#FF6738] text-[#FF6738]'
                  : 'border border-[#EEEEEE] text-[#111111]'
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 본문 영역 */}
      <div className="min-h-[100px] flex flex-col gap-1">
        
        {/* 타입 1: 할 일 목록 및 추가*/}
        {type === 1 && (
          <>
            {items.length > 0 && (
              <div className="grid grid-cols-[1.5fr_0.8fr_2.2fr] text-[14px] text-[#111111] font-semibold pb-[4px]">
                <span>제목</span><span>날짜</span><span>학습지</span>
              </div>
            )}

            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[1.5fr_0.8fr_2.2fr] items-center text-[14px] py-[1px]">
                <div className="flex items-center text-[#111111]">
                    {item.title}
                    <img src={ArrowIcon} className="w-[17px] h-[17px] mt-[2px]" alt="arrow" />
                </div>
                <span className="text-[#111111]">{item.date}</span>
                <span className={item.file ? "text-[#FF6738] underline" : "text-[#999999]"}>
                  {item.file ? `${item.file}` : "-"}
                </span>
              </div>
            ))}

            {isAdding && (
              <div className="grid grid-cols-[1.5fr_0.8fr_2.2fr] items-center py-1">
                <input 
                  autoFocus
                  className="w-[66px] h-[28px] bg-transparent border border-transparent rounded-[4px] px-2 text-[14px] text-[#111111] outline-none transition-all placeholder:text-[#999999] focus:border-[#D1D1D1]" 
                  placeholder="제목" 
                />
                <span className="text-[14px] text-[#999999]">1월 8일</span>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {["국", "영", "수"].map((sub) => (
                      <button key={sub} className="w-[33px] h-[26px] rounded-full border border-[#D1D1D1] text-[12px] text-[#999999] flex items-center justify-center hover:border-[#FF6738] hover:text-[#FF6738]">
                        {sub}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 font-light text-[18px] mr-1">
                    <span onClick={() => setIsAdding(false)} className="cursor-pointer hover:text-red-400 text-[14px]">✕</span>
                    <span className="text-[#EEEEEE] text-[12px]">|</span>
                    <span onClick={() => setIsAdding(false)} className="cursor-pointer hover:text-green-500">✓</span>
                  </div>
                </div>
              </div>
            )}

            {!isAdding && (
              <div 
                onClick={() => setIsAdding(true)}
                className="text-[#999999] text-[14px] mt-2 cursor-pointer hover:text-[#767676] flex items-center gap-1 w-fit"
              >
                <span className="text-[18px]">+</span> 할일
              </div>
            )}
          </>
        )}

        {/* 타입 2: 데이터 없을 시 안내 */}
        {type === 2 && (
          <>
            {items.length > 0 ? (
              <>
                <div className="grid grid-cols-[1.5fr_0.8fr_2.2fr] text-[14px] text-[#111111] font-semibold pb-[4px]">
                  <span>제목</span><span>날짜</span><span>학습지</span>
                </div>
                {items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[1.5fr_0.8fr_2.2fr] items-center text-[14px] py-[1px]">
                    <div className="flex items-center text-[#111111]">
                        {item.title}
                        <img src={ArrowIcon} className="w-[17px] h-[17px] mt-[2px]" alt="arrow" />
                    </div>
                    <span className="text-[#111111]">{item.date}</span>
                    <span className={item.file ? "text-[#FF6738] underline" : "text-[#999999]"}>
                      {item.file ? `${item.file}` : "-"}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <span className="text-[#999999] text-[12px]">내용이 없습니다</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default List;