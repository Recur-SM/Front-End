import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/calendar.css';

const CalendarWidget: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [title, setTitle] = useState('');

  const [events] = useState([
    {/* 목데이터 자리(지우셔도 됩니다) */}
  ]);

  const updateTitle = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) setTitle(calendarApi.view.title);
  };

  useEffect(() => {
    updateTitle();
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-[2.22vh]">
      
      {/* 헤더 */}
      <div className="w-full max-w-[44.38vw] flex items-center justify-between mb-[1.11vh] px-[1.25vw]">
        <h2 className="text-[0.94vw] font-bold text-gray-900 tracking-tight">{title}</h2>
        
        {/* 버튼 컨테이너 */}
        <div className="flex items-center w-[3.49vw] h-[3.15vh] bg-white/50 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm overflow-hidden">
          <button 
            onClick={() => { calendarRef.current?.getApi().prev(); updateTitle(); }} 
            className="w-[1.74vw] h-full flex items-center justify-center text-[#FF6738]"
          >
            <ChevronLeft size="0.83vw" />
          </button>
          <button 
            onClick={() => { calendarRef.current?.getApi().next(); updateTitle(); }} 
            className="w-[1.74vw] h-full flex items-center justify-center text-[#FF6738]"
          >
            <ChevronRight size="0.83vw" />
          </button>
        </div>
      </div>
      
      {/* 캘린더 본체 */}
      <div className="w-full max-w-[44.38vw] bg-white rounded-[2.08vw] px-[0.31vw] py-[1.48vh] shadow-[0_0.93vh_3.7vw_rgba(0,0,0,0.04)]">
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
            events={events}
            eventDisplay="block"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;