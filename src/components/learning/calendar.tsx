import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/calendar.css";
import { useMenteeStore } from "../../stores/menteeStroe";
import { getMonthlyTask } from "../../api/task";
import type { EventInput } from "@fullcalendar/core/index.js";

const CalendarWidget: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [title, setTitle] = useState("");
  const [events, setEvents] = useState<EventInput[]>([]);
  const { selectedMentee } = useMenteeStore();

  const updateTitle = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) setTitle(calendarApi.view.title);
  };

  const fetchMonthlyTasks = async () => {
    if (!selectedMentee) return;

    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    const currentDate = calendarApi.getDate();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 0-based → 1-based

    try {
      const res = await getMonthlyTask(selectedMentee.menteeId, year, month);

      // dates 배열을 순회하면서 각 날짜의 tasks를 평탄화
      const calendarEvents: EventInput[] = [];

      res.result.dates.forEach((dateItem) => {
        dateItem.tasks.forEach((task) => {
          calendarEvents.push({
            id: String(task.task_id),
            title: task.task_name,
            date: dateItem.date, // 날짜는 dateItem에서
            backgroundColor: task.is_completed ? "#10B981" : "#FF6738",
            borderColor: task.is_completed ? "#10B981" : "#FF6738",
            textColor: "#ffffff",
            extendedProps: {
              subjectName: task.subject_name,
              isCompleted: task.is_completed,
            },
          });
        });
      });

      setEvents(calendarEvents);
    } catch (error) {
      console.error("월별 과제 조회 실패:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      updateTitle();
      if (isMounted) {
        await fetchMonthlyTasks();
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [selectedMentee]);

  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
    updateTitle();
    fetchMonthlyTasks(); // 이전 달 데이터 조회
  };

  const handleNext = () => {
    calendarRef.current?.getApi().next();
    updateTitle();
    fetchMonthlyTasks(); // 다음 달 데이터 조회
  };

  return (
    <div className="w-full flex flex-col items-center py-[2.22vh]">
      {/* 헤더 */}
      <div className="w-full max-w-[44.38vw] flex items-center justify-between mb-[1.11vh] px-[1.25vw]">
        <h2 className="text-[0.94vw] font-bold text-gray-900 tracking-tight">
          {title}
        </h2>

        {/* 버튼 컨테이너 */}
        <div className="flex items-center w-[3.49vw] h-[3.15vh] bg-white/50 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm overflow-hidden">
          <button
            onClick={handlePrev}
            className="w-[1.74vw] h-full flex items-center justify-center text-[#FF6738]"
          >
            <ChevronLeft size="0.83vw" />
          </button>
          <button
            onClick={handleNext}
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
            dayHeaderFormat={{ weekday: "short" }}
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
