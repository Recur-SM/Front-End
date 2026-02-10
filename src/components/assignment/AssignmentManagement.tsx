import { useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import List from "../List";
import WeekCalendar from "./WeekCalendar";
import AddTodoList from "./AddTodoList";
import type { TodoItem } from "../../types/list";
import PlannerBoard from "./PlannerBoard";
import FeedbackBoard from "./FeedbackBoard";
import AssignmentBoard from "./AssignmentBoard";
import { useMenteeStore } from "../../stores/menteeStroe";
import { useAuthStore } from "../../stores/authStore";

interface AssignmentManagementProps {
  tasks: TodoItem[];
  selectedDay?: Date;
  onSelectedDayChange?: (day: Date) => void;
  onDownloadFile?: (fileUrl: string) => void | Promise<void>;
}

const AssignmentManagement: React.FC<AssignmentManagementProps> = ({
  tasks,
  selectedDay: selectedDayProp,
  onSelectedDayChange,
  onDownloadFile,
}) => {
  const [internalDay, setInternalDay] = useState(new Date());
  const [localTodos, setLocalTodos] = useState<TodoItem[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [plannerHeight, setPlannerHeight] = useState(130);
  const [plannerId, setPlannerId] = useState(0);
  const selectedDay = selectedDayProp ?? internalDay;
  const setSelectedDay = onSelectedDayChange ?? setInternalDay;
  const { selectedMentee } = useMenteeStore();
  const { id } = useAuthStore();
  const menteeId = selectedMentee?.menteeId;

  useEffect(() => {
    setTodos(tasks);
  }, [tasks]);

  if (!menteeId) {
    console.warn("멘티 ID가 없습니다.");
    return null;
  }

  const selectedDateStr = format(selectedDay, "yyyy-MM-dd");
  const todosForDay = [
    ...todos,
    ...localTodos.filter((t) => t.date === selectedDateStr),
  ];

  const handleClickDay = (day: Date) => {
    setSelectedDay(day);
  };

  const handleAddTodo = (todo: TodoItem) => {
    setLocalTodos((prev) => [...prev, todo]);
  };

  const handleUpdateTodo = (todoId: number, updates: Partial<TodoItem>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === todoId ? { ...todo, ...updates } : todo)),
    );
  };

  const today = new Date();
  const listTitle = isSameDay(selectedDay, today)
    ? "오늘 할 일"
    : `${format(selectedDay, "M월 d일", { locale: ko })} 할 일`;

  return (
    <div className="flex flex-col">
      <div className="flex justify-center py-3">
        <WeekCalendar
          today={today}
          selectedDate={selectedDay}
          onClickDay={handleClickDay}
        />
      </div>

      <div className="py-1">
        <List
          title={listTitle}
          type="할일"
          tasks={todosForDay}
          onDownloadFile={onDownloadFile}
        />

        <AddTodoList selectedDate={selectedDateStr} onAddTodo={handleAddTodo} />
      </div>

      <div className="flex flex-col py-2">
        <span className="font-semibold text-lg">플래너</span>

        <div className="flex w-full gap-1 py-2">
          <div className="w-1/3">
            <PlannerBoard
              menteeId={selectedMentee!.menteeId}
              date={selectedDateStr}
              onHeightChange={setPlannerHeight}
              setPlannerId={setPlannerId}
            />
          </div>

          <div className="w-2/3">
            <FeedbackBoard
              height={plannerHeight}
              plannerId={plannerId}
              menteeId={menteeId}
              mentorId={id!}
              plannerDate={selectedDateStr}
            />
          </div>
        </div>

        <div className="flex flex-col py-2">
          {todosForDay.length === 0 && (
            <span className="font-semibold text-lg">과제</span>
          )}
          <AssignmentBoard todos={todos} onUpdateTodo={handleUpdateTodo} />
        </div>
      </div>
    </div>
  );
};

export default AssignmentManagement;
