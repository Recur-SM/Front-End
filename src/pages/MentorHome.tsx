import Sidebar from "../components/menu/Sidebar";
import { useEffect, useState } from "react";
import Topbar from "../components/menu/Topbar";
import StudyManagement from "../components/learning/StudyManagement";
import AssignmentManagement from "../components/assignment/AssignmentManagement";
import { getMentees } from "../api/mentee";
import { useMenteeStore } from "../stores/menteeStroe";
import type { TodoItem } from "../types/list";
import { getTasks } from "../api/task";
import type { TabType } from "../types/filter";

const MentorHome = () => {
  const [activeTab, setActiveTab] = useState("학습 관리");
  const { mentees, selectedMentee, setMentees, setSelectedMentee } =
    useMenteeStore();
      const [tasks, setTasks] = useState<TodoItem[]>([]);


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
    fetchTasks();
  }, [selectedMentee]);

  return (
    <div className="flex">
      <Sidebar
        role="mentor"
        userName="현지현"
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
              <StudyManagement tasks={tasks} />
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
