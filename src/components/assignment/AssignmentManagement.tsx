import { useState } from "react";
import List from "./List";
import WeekCalendar from "./WeekCalendar";
import { mockTodos } from "../mocks/list.mock";
import AddTodoList from "./AddTodoList";
import type { TodoItem } from "../types/list";
import PlannerBoard from "./PlannerBoard";
import FeedbackBoard from "./FeedbackBoard";
import AssignmentBoard from "./assignment/AssignmentBoard";

const AssignmentManagement = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [todos, setTodos] = useState<TodoItem[]>(mockTodos);

  const selectedDateStr = selectedDay.toISOString().split("T")[0];
  const todosForDay = todos.filter((t) => t.date === selectedDateStr);

  const handleClickDay = (day: Date) => {
    setSelectedDay(day);
  };

  const handleAddTodo = (todo: TodoItem) => {
    setTodos((prev) => [...prev, todo]);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center py-3">
        <WeekCalendar today={selectedDay} onClickDay={handleClickDay} />
      </div>

      <div className="py-1">
        {todosForDay.length === 0 ? (
          <AddTodoList
            selectedDate={selectedDateStr}
            onAddTodo={handleAddTodo}
          />
        ) : (
          <List title="오늘 할 일" type="할일" selectedDate={selectedDateStr} />
        )}
      </div>

      <div className="flex flex-col py-2">
        <span className="font-semibold text-lg">플래너</span>

        <div className="flex w-full gap-1 py-2">
          <div className="w-1/3">
            <PlannerBoard />
          </div>

          <div className="w-2/3">
            <FeedbackBoard />
          </div>
        </div>

        <div className="flex flex-col py-2">
          {todosForDay.length === 0 && (
            <span className="font-semibold text-lg">과제</span>
          )}
          <AssignmentBoard todos={todosForDay} />
        </div>
      </div>
    </div>
  );
};

export default AssignmentManagement;
