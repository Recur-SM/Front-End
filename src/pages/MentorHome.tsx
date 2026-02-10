import Sidebar from "../components/menu/Sidebar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Topbar from "../components/menu/Topbar";
import StudyManagement from "../components/learning/StudyManagement";
import AssignmentManagement from "../components/assignment/AssignmentManagement";
import { getMentees } from "../api/mentee";
import { useMenteeStore } from "../stores/menteeStroe";
import type { FeedbackItem, TodoItem } from "../types/list";
import { getTaskDetail, getTasks } from "../api/task";
import type { TabType } from "../types/filter";
import { getFeedbackList } from "../api/feedback";
import { useAuthStore } from "../stores/authStore";
import { api } from "../api/axios";

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

  const downloadBlob = (blob: Blob, filename: string) => {
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(objectUrl);
  };

  const getFileNameFromUrl = (url: string, fallback: string) => {
    try {
      const path = new URL(url, "http://dummy").pathname;
      const segment = path.split("/").pop();
      if (segment) return decodeURIComponent(segment);
    } catch {
      // ignore
    }
    return fallback;
  };

  const handleDownloadFile = async (taskId: number) => {
    if (!selectedMentee) return;
    try {
      const detail = await getTaskDetail(taskId, selectedMentee.menteeId);
      const fileUrlRaw = detail.result.pdf_file_url;
      if (!fileUrlRaw) return;

      // 상대 경로 형태면 /를 보정
      let fileUrl =
        fileUrlRaw.startsWith("http") || fileUrlRaw.startsWith("/")
          ? fileUrlRaw
          : `/${fileUrlRaw}`;

      // 스토리지 URL 경로의 이중 슬래시(//) 제거 → NoSuchKey 방지 (프로토콜 :// 는 유지)
      fileUrl = fileUrl.replace(/(?<=[^:])\/\/+/g, "/");

      const filename = getFileNameFromUrl(fileUrl, `task-${taskId}.pdf`);

      // 외부 스토리지(presigned URL 등)는 withCredentials 요청 시 CORS로 막힐 수 있어
      // credentials 없이(fetch) 내려받도록 분기
      if (fileUrl.startsWith("http")) {
        const res = await fetch(fileUrl, { credentials: "omit" });
        if (!res.ok) {
          window.open(fileUrl, "_blank");
          return;
        }
        const blob = await res.blob();
        downloadBlob(blob, filename);
        return;
      }

      // 내부 API 경로는 인증 포함 axios로 blob 다운로드
      const res = await api.get(fileUrl, { responseType: "blob" });
      downloadBlob(new Blob([res.data]), filename);
    } catch (e) {
      console.error(e);
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
