import Sidebar from "../components/menu/Sidebar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Topbar from "../components/menu/Topbar";
import StudyManagement from "../components/learning/StudyManagement";
import AssignmentManagement from "../components/assignment/AssignmentManagement";
import { getMentees } from "../api/mentee";
import { useMenteeStore } from "../stores/menteeStroe";
import type { FeedbackItem, TodoItem } from "../types/list";
import { getTasks } from "../api/task";
import type { TabType } from "../types/filter";
import { getFeedbackList } from "../api/feedback";
import { useAuthStore } from "../stores/authStore";

const MentorHome = () => {
  const [activeTab, setActiveTab] = useState<"학습 관리" | "과제 관리">(
    "학습 관리",
  );
  const { mentees, selectedMentee, setMentees, setSelectedMentee } =
    useMenteeStore();
  const { username } = useAuthStore();
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const [feebacks, setFeebacks] = useState<FeedbackItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(() => new Date());

  useEffect(() => {
    const fetchMentorData = async () => {
      const res = await getMentees();
      setMentees(res.result.mentees);
      if (res.result.mentees.length > 0) {
        setSelectedMentee(res.result.mentees[0]);
      }
    };
    fetchMentorData();
  }, []);

  // 선택한 날짜 또는 멘티 변경 시 해당 날짜 할일 조회
  useEffect(() => {
    if (!selectedMentee) return;
    const dateStr = format(selectedDay, "yyyy-MM-dd");
    const fetchTasks = async () => {
      try {
        const res = await getTasks(selectedMentee.menteeId, dateStr);
        const fetchedTodos: TodoItem[] = res.result.tasks
          .filter((t) => t.taskType === "ADDITIONAL")
          .map((t) => ({
            id: t.taskId,
            title: t.taskName,
            date: t.taskDate,
            goal: t.taskGoal,
            file: t.pdfFileUrl,
            category: t.subjectName as TabType,
            type: "할일",
            isFeedback: t.hasFeedback,
          }));
        setTasks(fetchedTodos);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTasks();
  }, [selectedMentee, selectedDay]);

  useEffect(() => {
    if (!selectedMentee) return;
    const fetchFeedbacks = async () => {
      try {
        const res = await getFeedbackList(selectedMentee.menteeId);
        const fetchedFeedbacks: FeedbackItem[] = res.result.feedbacks.map(
          (t) => ({
            id: t.feedbackId,
            title: t.taskName,
            date: t.feedbackDate,
            feedback: t.detailContent,
            type: "피드백",
            category: t.subjectName as TabType,
          }),
        );
        setFeebacks(fetchedFeedbacks);
      } catch (e) {
        console.error(e);
      }
    };

    fetchFeedbacks();
  }, [selectedMentee]);

  const switchToAssignment = () => {
    setActiveTab("과제 관리");
  };

const handleDownloadFile = async (url: string) => {
  try {
    const res = await fetch(url); // presigned URL
    if (!res.ok) throw new Error("Failed to fetch file");
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    // 원래 파일명 추출하거나 fallback 사용
    const filename = url.split("/").pop()?.split("?")[0] ?? "file.png";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(objectUrl);
  } catch (err) {
    console.error(err);
    alert("파일 다운로드에 실패했습니다.");
  }
};

  return (
    <div className="flex">
      <Sidebar
        role="mentor"
        userName={username!}
        students={mentees.map((m) => m.menteeName)}
        selectedStudent={selectedMentee?.menteeName ?? null}
        onStudentSelect={(name) => {
          const mentee = mentees.find((m) => m.menteeName === name) ?? null;
          setSelectedMentee(mentee);
        }}
      />

      <div className="flex flex-col w-full">
        <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-col px-10 py-5 gap-1">
          <div className="flex gap-1.5 px-3">
            <div className="flex font-bold text-2xl">
              {selectedMentee?.menteeName}
            </div>
            <div className="flex items-end text-md ">학생</div>
          </div>

          <main className="p-4">
            {activeTab === "학습 관리" && (
              <StudyManagement
                tasks={tasks}
                feebacks={feebacks}
                onSwitchToAssignment={switchToAssignment}
                onDownloadFile={handleDownloadFile}
              />
            )}
            {activeTab === "과제 관리" && (
              <AssignmentManagement
                tasks={tasks}
                selectedDay={selectedDay}
                onSelectedDayChange={setSelectedDay}
                onDownloadFile={handleDownloadFile}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MentorHome;
