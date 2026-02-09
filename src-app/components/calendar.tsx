import { useState } from 'react';
import { format, addWeeks, subWeeks, startOfWeek, addDays, isSameDay, isAfter, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';

interface CalendarProps {
  type: 1 | 2 | 3;
}

const Calendar = ({ type }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = startOfDay(new Date()); 

  const startDate = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(startDate, i);
    const isFuture = isAfter(startOfDay(date), today); 
    
    return {
      label: format(date, 'eee', { locale: ko }),
      date: date.getDate(),
      fullDate: date,
      isSelected: isSameDay(date, selectedDate),
      isDisabled: isFuture,
    };
  });

  // 클릭 핸들러
  const handleDateClick = (item: any) => {
    if (item.isDisabled) return;
    setSelectedDate(item.fullDate);
  };

  // 3번: 월간 계획표 (추후 구현)
  if (type === 3) {
    return (
      <div className="w-full max-w-[430px] p-5 bg-white rounded-[32px] shadow-sm">
        <h2 className="text-[18px] font-bold mb-4">월간 계획표</h2>
        <div className="h-[300px] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
          3번 스타일 구현 예정
        </div>
      </div>
    );
  }

  // 1번: 메인 주간 달력
  if (type === 1) {
    return (
      <div className="w-full max-w-[430px] flex flex-col items-center">
        <div className="w-full flex justify-center mt-[4px]">
          <span className="text-[16px] font-semibold text-[#111111]">{format(currentDate, 'M월')}</span>
        </div>
        <div className="w-full h-[85px] mb-[24px] bg-white rounded-b-[48px] flex items-center justify-center z-40 px-4">
          {days.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => handleDateClick(item)}
              className={`flex flex-col items-center justify-center w-[44px] h-[75px] rounded-full transition-all 
                ${item.isDisabled ? 'cursor-default' : 'cursor-pointer'}
                ${item.isSelected ? 'bg-[#FFF0EB]' : 'bg-transparent'}`}
            >
              {/* 글자색 로직 */}
              <span className={`text-[12px] mb-[4px] font-medium 
                ${item.isDisabled ? 'text-[#999999]' : item.isSelected ? 'text-[#FF6738] font-bold' : 'text-[#111111]'}`}>
                {item.label}
              </span>
              <span className={`text-[12px] 
                ${item.isDisabled ? 'text-[#999999]' : item.isSelected ? 'text-[#FF6738] font-bold' : 'text-[#111111]'}`}>
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2번: 독립 캡슐형 주간 달력
  return (
    <div className="w-full max-w-[430px] flex flex-col items-center px-5">
      <div className="w-full flex justify-between items-center mb-4 px-2">
        <h2 className="text-[18px] font-bold text-[#111111]">{format(currentDate, 'yyyy년 M월')}</h2>
        <div className="flex bg-white rounded-full shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden">
          <button onClick={() => setCurrentDate(subWeeks(currentDate, 1))} className="w-9 h-9 flex items-center justify-center text-[#FF6738] text-lg hover:bg-gray-50 border-r border-gray-100">{"<"}</button>
          <button onClick={() => setCurrentDate(addWeeks(currentDate, 1))} className="w-9 h-9 flex items-center justify-center text-[#FF6738] text-lg hover:bg-gray-50">{">"}</button>
        </div>
      </div>
      <div className="w-full h-[120px] bg-white rounded-[100px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.03)] flex items-center justify-between px-6">
        {days.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => handleDateClick(item)}
            className={`w-[44px] h-[85px] flex flex-col items-center justify-center rounded-full transition-all
              ${item.isDisabled ? 'cursor-default' : 'cursor-pointer'}
              ${item.isSelected ? 'bg-[#FFF0EB]' : 'bg-transparent'}`}
          >
            <span className={`text-[12px] mb-2 font-medium 
              ${item.isDisabled ? 'text-[#999999]' : item.isSelected ? 'text-[#FF6738] font-bold' : 'text-[#767676]'}`}>
              {item.label}
            </span>
            <span className={`text-[16px] 
              ${item.isDisabled ? 'text-[#999999]' : item.isSelected ? 'text-[#FF6738] font-bold' : 'text-[#111111]'}`}>
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;