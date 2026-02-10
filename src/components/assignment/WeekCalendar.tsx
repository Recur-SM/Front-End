import { useState } from "react";
import { addDays, subDays, format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

interface WeekCalendarProps {
  today: Date;
  selectedDate?: Date; // 클릭해서 선택한 날짜 (해당 날 할일 목록 표시용)
  onClickDay?: (day: Date) => void;
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({
  today,
  selectedDate,
  onClickDay,
}) => {
  const [currentDate, setCurrentDate] = useState(today);

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentDate, i - 3),
  );

  const handleClickDay = (day: Date) => {
    setCurrentDate(day); // 클릭한 날짜를 가운데로
    onClickDay?.(day); // 부모에도 전달 → 해당 날 할일 목록 표시
  };

  return (
    <div className="w-full max-w-[44.38vw]">
      {/* 헤더: 년월 + 화살표 */}
      <div className="flex items-center justify-between mb-[1.48vh] px-[1.25vw]">
        <h2 className="text-md text-gray-900">
          {format(currentDate, "yyyy년 M월", { locale: ko })}
        </h2>
        <div className="flex items-center gap-[0.42vw] bg-white rounded-full py-1">
          <button
            onClick={() => setCurrentDate(subDays(currentDate, 7))}
            className="p-[0.21vw] text-[#FF6738] hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-[1.04vw] h-[1.04vw]" />
          </button>
          <button
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
            className="p-[0.21vw] text-[#FF6738] hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-[1.04vw] h-[1.04vw]" />
          </button>
        </div>
      </div>

      {/* 캘린더 본체 */}
      <div className="bg-white rounded-full px-[2.08vw] py-6 shadow-[0_0.93vh_3.7vw_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-center">
          {weekDays.map((day, i) => {
            const isToday = isSameDay(day, today);
            const isSelected =
              selectedDate != null && isSameDay(day, selectedDate);

            return (
              <div
                key={day.toString()}
                className="flex flex-col items-center cursor-pointer relative"
                onClick={() => handleClickDay(day)}
              >
                {/* 오늘 배경 원 */}
                {isToday && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4.17vw] h-[6.17vw] bg-[#FF67381A] rounded-full" />
                )}
                {/* 선택한 날짜 강조 (클릭 시 해당 날 할일 보여줌) */}
                {isSelected && !isToday && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4.17vw] h-[6.17vw] border-2 border-[#FF6738] rounded-full" />
                )}
                <div className="flex flex-col gap-3">
                  {/* 요일 */}
                  <span
                    className={`relative z-10 text-[0.83vw] font-medium ${
                      isToday || isSelected
                        ? "text-[#FF6738]"
                        : "text-gray-400"
                    }`}
                  >
                    {DAY_LABELS[i]}
                  </span>

                  {/* 날짜 */}
                  <span
                    className={`relative z-10 mt-[0.74vh] text-[1.15vw] ${
                      isToday || isSelected
                        ? "text-[#FF6738]"
                        : "text-gray-800"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekCalendar;
