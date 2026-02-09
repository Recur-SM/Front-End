import Sidebar from "../components/menu/Sidebar";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!selectedMentee) return;
    const fetchTasks = async () => {
      const today = new Date().toISOString().split("T")[0];
      try {
        const res = await getTasks(selectedMentee.menteeId, today);
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

    fetchTasks();
    fetchFeedbacks();
  }, [selectedMentee]);

  const switchToAssignment = () => {
    setActiveTab("과제 관리");
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
              />
            )}
            {activeTab === "과제 관리" && (
              <AssignmentManagement tasks={tasks} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MentorHome;
