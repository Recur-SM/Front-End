import React, { useState } from 'react';
import { format, addWeeks, subWeeks, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  const startDate = startOfWeek(currentDate);

  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(startDate, i);
    return {
      label: format(date, 'eee', { locale: ko }),
      date: date.getDate(),
      fullDate: date,
      isSelected: isSameDay(date, selectedDate), 
    };
  });

  return (
    <div className="w-full max-w-[430px] flex flex-col items-center px-5">
      
      {/* 날짜 정보 & 이동 버튼 */}
      <div className="w-full flex justify-between items-center mb-[8px]">
        <div className="text-[16px] font-bold text-[#111111]">
          {format(currentDate, 'yyyy년 M월')}
        </div>
        <div className="flex rounded-[100px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)]">
          <button onClick={() => setCurrentDate(subWeeks(currentDate, 1))} className="w-[33.5px] h-[34px] rounded-l-[100px] text-[#FF6738] text-xl bg-white hover:bg-[#F7F7F7]">{"<"}</button>
          <button onClick={() => setCurrentDate(addWeeks(currentDate, 1))} className="w-[33.5px] h-[34px] rounded-r-[100px] text-[#FF6738] text-xl bg-white hover:bg-[#F7F7F7]">{">"}</button>
        </div>
      </div>

      {/* 캘린더 본체 */}
      <div className="w-full h-[121px] bg-white rounded-[100px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] flex items-center justify-between px-6 z-40">
        {days.map((item, idx) => (
          <div 
            key={idx} 
            // 클릭 이벤트
            onClick={() => setSelectedDate(item.fullDate)}
            className={`w-[44px] h-[85px] flex flex-col items-center justify-center rounded-[100px] transition-all cursor-pointer
              ${item.isSelected ? 'bg-[#FFF0EB]' : 'bg-transparent hover:bg-[#FAFAFA]'}`} 
          >
            {/* 요일 텍스트 */}
            <span className={`text-[12px] mb-[8px] ${item.isSelected ? 'text-[#FF6738] font-semibold' : 'text-[#767676]'}`}>
              {item.label}
            </span>
            
            {/* 날짜 숫자 */}
            <div className={`flex items-center justify-center transition-all 
              ${item.isSelected ? 'text-[#FF6738] font-semibold' : 'text-[#111111]'}`}>
              <span className="text-[14px]">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Calendar;