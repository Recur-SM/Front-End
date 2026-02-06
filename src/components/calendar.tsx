import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarWidget: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [title, setTitle] = useState('');

  const [events] = useState([
    { title: '영어 과제', date: '2025-12-31' },
    { title: '단어 시험', date: '2026-01-31' },
    { title: '수학 오답노트', date: '2026-01-30' },
    { title: '문법 강의', date: '2026-01-30' },
    { title: '독서 2지문', date: '2026-01-01' },
    { title: '수학 오답노트', date: '2026-02-06' },
    { title: '단어 시험', date: '2026-02-06' },
    { title: '시대 국어 복습', date: '2026-02-04' },
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

      <style>{`
        /* 전역 변수 설정 */
        :root {
          --fc-small-font-size: 0.68vw !important;
          --fc-page-bg-color: transparent !important;
        }

        .planner-calendar .fc { 
          --fc-border-color: transparent !important; 
          font-size: 0.73vw;
        }

        .planner-calendar .fc-scrollgrid, 
        .planner-calendar .fc-scrollgrid table, 
        .planner-calendar .fc-daygrid-day, 
        .planner-calendar .fc-col-header-cell { 
          border: none !important; 
        }

        .planner-calendar .fc-daygrid-day-frame {
          min-height: 20.37vh !important; 
          width: 6.25vw !important;
          padding: 2.22vh 0.21vw !important;
          transition: background-color 0.15s ease;
        }

        .planner-calendar .fc-daygrid-day-frame:hover {
          background-color: #FF673826 !important;
        }

        .planner-calendar .fc-day-today, 
        .planner-calendar .fc-day-today .fc-daygrid-day-number {
          background-color: transparent !important;
        }

        .planner-calendar .fc-daygrid-day-top {
          flex-direction: row !important;
          justify-content: flex-start !important;
          margin-bottom: 0.74vh;
        }

        .planner-calendar .fc-daygrid-day-number {
          font-size: 1.04vw;
          font-weight: 600;
          color: #111111;
          padding: 0 0.42vw;
        }

        .planner-calendar .fc-daygrid-event {
          background: transparent !important;
          border: none !important;
          padding: 0.19vh 0.42vw !important;
          margin-top: 0.19vh !important;
        }

        .planner-calendar .fc-event-title {
          font-size: 0.68vw;
          color: #505050;
          font-weight: 500;
          cursor: pointer;
        }

        .planner-calendar .fc-event-title:hover {
          color: #FF6738;
        }

        .planner-calendar .fc-day-other .fc-daygrid-day-number {
          color: #111111 !important;
          opacity: 1 !important;
        }
        
        .planner-calendar .fc-day-other .fc-event-title {
          color: #999999 !important;
        }

        .planner-calendar .fc-col-header-cell { 
          width: 6.25vw !important;
          height: 11.11vh !important;
          vertical-align: middle !important;
          font-size: 0.94vw; 
          color: #505050; 
          font-weight: 500;
        }

        .planner-calendar .fc-col-header-cell-cushion {
          line-height: 11.11vh;
        }

        /* 캘린더 내부 숨겨진 px 요소들 대응 */
        .planner-calendar .fc-daygrid-event-harness {
          margin: 0.09vh 0 !important;
        }
        
        .planner-calendar .fc-daygrid-more-link {
          font-size: 0.63vw !important;
          padding: 0.19vh 0.21vw !important;
        }
      `}</style>
    </div>
  );
};

export default CalendarWidget;