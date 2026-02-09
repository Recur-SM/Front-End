import type { TodoItem } from "../../types/list";
import List from "../List";
import CalendarWidget from "./calendar";

interface StudyManagementProps {
  tasks: TodoItem[];
}

const StudyManagement: React.FC<StudyManagementProps> = ({
  tasks,
}) => {
  const todoTasks = tasks.filter((t) => t.type === "할일");
  // const feedbackTasks = tasks.filter((t) => t.type === "피드백");

  return (
    <div className="flex flex-col space-y-3">
      <List title="오늘 할 일" type="할일"  tasks={todoTasks} />

      <List title="어제자 피드백" type="피드백"  tasks={todoTasks} />

      <div className="flex-col px-3 py-3">
        <div className="flex font-semibold text-lg">월간 계획표</div>
        <div className="flex font-normal text-xs">
          스케줄을 한 눈에 확인해보세요
        </div>
        <CalendarWidget />
      </div>
    </div>
  );
};

export default StudyManagement;
