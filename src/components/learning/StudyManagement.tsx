import { useScrollStore } from "../../stores/scrollStore";
import type { FeedbackItem, TodoItem } from "../../types/list";
import List from "../List";
import CalendarWidget from "./calendar";

interface StudyManagementProps {
  tasks: TodoItem[];
  feebacks: FeedbackItem[];
  onSwitchToAssignment?: () => void; // 탭 전환 콜백 추가
  onDownloadFile?: (taskId: number) => void | Promise<void>;
}

const StudyManagement: React.FC<StudyManagementProps> = ({
  tasks,
  feebacks,
  onSwitchToAssignment,
  onDownloadFile,
}) => {
  const scrollToTask = useScrollStore((state) => state.scrollToTask);
  const todoTasks = tasks.filter((t) => t.type === "할일");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const feedbacks = feebacks.filter(
    (t) => t.type === "피드백" && t.date === yesterdayStr,
  );

  const handleTaskClick = (taskId: number) => {
    scrollToTask(taskId, true); // 탭 전환 플래그 true
    onSwitchToAssignment?.(); // 탭 전환 실행
  };

  return (
    <div className="flex flex-col space-y-3">
      <List
        title="오늘 할 일"
        type="할일"
        tasks={todoTasks}
        onTaskClick={handleTaskClick}
        onDownloadFile={onDownloadFile}
      />

      <List
        title="어제자 피드백"
        type="피드백"
        tasks={feedbacks}
        onTaskClick={handleTaskClick}
      />

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
