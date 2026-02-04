import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarWidget: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [title, setTitle] = useState('');

  const updateTitle = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) setTitle(calendarApi.view.title);
  };

  useEffect(() => {
    updateTitle();
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-6">
      
      {/* 헤더 */}
      <div className="w-full max-w-[852px] flex items-center justify-between mb-[12px] px-6">
        <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">{title}</h2>
        
        {/* 버튼 컨테이너 */}
        <div className="flex items-center w-[67px] h-[34px] bg-white/50 backdrop-blur-sm rounded-full border-none shadow-sm overflow-hidden">
          <button 
            onClick={() => { calendarRef.current?.getApi().prev(); updateTitle(); }} 
            // 개별 버튼
            className="w-[33.5px] h-full flex items-center justify-center text-[#FF6738]"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => { calendarRef.current?.getApi().next(); updateTitle(); }} 
            // 개별 버튼
            className="w-[33.5px] h-full flex items-center justify-center text-[#FF6738]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* 캘린더 본체 */}
      <div className="w-full max-w-[852px] bg-white rounded-[40px] px-[6px] py-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border-none">
        <div className="planner-calendar">
          <FullCalendar 
            ref={calendarRef} 
            plugins={[dayGridPlugin]} 
            initialView="dayGridMonth" 
            headerToolbar={false}
            locales={[koLocale]}
            locale="ko"
            height="auto"
            dayHeaderFormat={{ weekday: 'short' }}
            fixedWeekCount={false}
          />
        </div>
      </div>

      <style>{`
        .planner-calendar .fc { --fc-border-color: transparent !important; }

        .planner-calendar .fc-daygrid-day-frame {
          min-height: 220px !important; 
          width: 120px !important;
          padding: 2px !important;
        }

        .planner-calendar:hover .fc-daygrid-day-frame:hover {
          background-color: rgba(255, 103, 56, 0.15);
        }

        .planner-calendar .fc-day-today { background-color: transparent !important; }

        .planner-calendar .fc-daygrid-day-top {
          flex-direction: row !important;
          justify-content: flex-start !important;
        }
        .planner-calendar .fc-daygrid-day-number {
          font-size: 20px;
          font-weight: 600;
          color: #111111;
          padding: 5px 10px;
        }

        .planner-calendar .fc-scrollgrid,
        .planner-calendar .fc-scrollgrid table,
        .planner-calendar .fc-scrollgrid-section > td,
        .planner-calendar .fc-daygrid-day,
        .planner-calendar .fc-col-header-cell {
          border: none !important;
          border-style: hidden !important; 
        }

        .planner-calendar .fc-col-header-cell { 
          width: 120px !important;
          height: 120px !important;
          vertical-align: middle !important;
          font-size: 18px; 
          color: #505050; 
          font-weight: 500; 
          padding: 0 !important;
        }
        
        .planner-calendar .fc-col-header-cell-cushion {
          display: inline-block;
          line-height: 120px;
        }
      `}</style>
    </div>
  );
};

export default CalendarWidget;