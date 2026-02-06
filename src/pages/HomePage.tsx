import Sidebar from "../components/Sidebar";
import List from "../components/List";
import { useState } from "react";
import Topbar from "../components/Topbar";
import CalendarWidget from "../components/calendar";

const HomePage = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>("민수");

  return (
    <div className="flex">
      <Sidebar
        role="mentor"
        userName="현지현"
        students={["김민수", "이지은", "장서연"]}
        selectedStudent={selectedStudent}
        onStudentSelect={(name) => {
          setSelectedStudent(name);
        }}
      />

      <div className="flex flex-col w-full">
        <Topbar />

        <div className="flex flex-col px-10 py-6 gap-4">

        <div className="flex gap-1">
          <div className="flex font-medium text-2xl">{selectedStudent}</div>
          <div className="flex items-end text-sm">학생</div>
        </div>

        <List title="오늘 할 일" />

        <List title="어제자 피드백" />

        <List title="주간 학습 리포트" />

        <div className="flex-col px-3 py-3">
          <div className="flex font-medium text-lg">월간 계획표</div>
          <div className="flex font-normal text-xs">스케줄을 한 눈에 확인해보세요</div>
          <CalendarWidget />
        </div>
      </div>
      </div>

    </div>
  );
};

export default HomePage;