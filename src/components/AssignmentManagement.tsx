import { useState } from "react";
import List from "./List";
import WeekCalendar from "./WeekCalendar";

const AssignmentManagement = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const selectedDateStr = selectedDay.toISOString().split("T")[0];

  const handleClickDay = (day: Date) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <WeekCalendar today={selectedDay} onClickDay={handleClickDay} />
      <List title="오늘 할 일" type="할일" selectedDate={selectedDateStr} />
    </div>
  );
};

export default AssignmentManagement;
