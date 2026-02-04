import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarWidget: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [title, setTitle] = useState('');

  const [events] = useState([
    { title: '영어 과제', date: '2026-02-05' },
    { title: '문법 강의', date: '2026-02-05' },
    { title: '독서 2지문', date: '2026-02-05' },
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
    <div className="w-full flex flex-col items-center py-6">
      
      {/* 1. 헤더: 양끝 정렬 레이아웃 */}
      <div className="w-full max-w-[852px] flex items-center justify-between mb-[12px] px-6">
        <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">{title}</h2>
        
        {/* 버튼 컨테이너: 67x34px 고정 */}
        <div className="flex items-center w-[67px] h-[34px] bg-white/50 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm overflow-hidden">
          <button 
            onClick={() => { calendarRef.current?.getApi().prev(); updateTitle(); }} 
            className="w-[33.5px] h-full flex items-center justify-center text-[#FF6738] hover:bg-[#FF6738]/10 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => { calendarRef.current?.getApi().next(); updateTitle(); }} 
            className="w-[33.5px] h-full flex items-center justify-center text-[#FF6738] hover:bg-[#FF6738]/10 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* 2. 캘린더 본체 */}
      <div className="w-full max-w-[852px] bg-white rounded-[40px] px-[6px] py-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
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
        /* 테두리 및 기본 배경 제거 */
        .planner-calendar .fc { --fc-border-color: transparent !important; }
        .planner-calendar .fc-scrollgrid, 
        .planner-calendar .fc-scrollgrid table, 
        .planner-calendar .fc-daygrid-day, 
        .planner-calendar .fc-col-header-cell { 
          border: none !important; 
        }

        /* 셀 크기 및 호버 효과 */
        .planner-calendar .fc-daygrid-day-frame {
          min-height: 220px !important; 
          width: 120px !important;
          padding: 24px 4px !important;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .planner-calendar .fc-daygrid-day-frame:hover {
          background-color: #FF673826 !important;
        }

        /* 오늘 날짜 강조 완전 제거 */
        .planner-calendar .fc-day-today, 
        .planner-calendar .fc-day-today .fc-daygrid-day-number {
          background-color: transparent !important;
        }

        /* 날짜 숫자 및 일정 텍스트 스타일 */
        .planner-calendar .fc-daygrid-day-top {
          flex-direction: row !important;
          justify-content: flex-start !important;
          margin-bottom: 8px;
        }
        .planner-calendar .fc-daygrid-day-number {
          font-size: 20px;
          font-weight: 600;
          color: #111111;
          padding: 0 8px;
        }
        .planner-calendar .fc-daygrid-event {
          background: transparent !important;
          border: none !important;
          padding: 2px 8px !important;
        }
        .planner-calendar .fc-event-title {
          font-size: 13px;
          color: #505050;
          font-weight: 500;
        }

        /* 요일 헤더 */
        .planner-calendar .fc-col-header-cell { 
          width: 120px !important;
          height: 120px !important;
          vertical-align: middle !important;
          font-size: 18px; 
          color: #505050; 
          font-weight: 500;
        }
        .planner-calendar .fc-col-header-cell-cushion {
          line-height: 120px;
        }
      `}</style>
    </div>
  );
};

export default CalendarWidget;