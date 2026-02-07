import { useState } from "react";
import List from "./List";
import WeekCalendar from "./WeekCalendar";
import { mockTodos } from "../mocks/list.mock";
import AddTodoList from "./AddTodoList";
import type { TodoItem } from "../types/list";

const AssignmentManagement = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [todos, setTodos] = useState<TodoItem[]>(mockTodos);
  
  const selectedDateStr = selectedDay.toISOString().split("T")[0];
  const todosForDay = todos.filter((t) => t.date === selectedDateStr);

  const handleClickDay = (day: Date) => {
    setSelectedDay(day);
  };

  const handleAddTodo = (todo: TodoItem) => {
    setTodos((prev) => [...prev, todo])
  }

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center">
        <WeekCalendar today={selectedDay} onClickDay={handleClickDay} />
      </div>

      {todosForDay.length === 0 ? (
        <AddTodoList selectedDate={selectedDateStr} onAddTodo={handleAddTodo} />
      ) : (
      <List title="오늘 할 일" type="할일" selectedDate={selectedDateStr} />
      )}
    </div>
  );
};

export default AssignmentManagement;
