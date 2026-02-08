<<<<<<< HEAD
import React from 'react'
import List from '../components/List'

const HomePage = () => {
    
  return (
    <div>
        <List title="오늘 할 일" />
    </div>
  )
}

export default HomePage
=======
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Topbar from "../components/Topbar";
import StudyManagement from "../components/StudyManagement";
import AssignmentManagement from "../components/AssignmentManagement";

const HomePage = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(
    "김민수",
  );
  const [activeTab, setActiveTab] = useState("학습 관리");

  return (
    <div className="flex">
      <Sidebar
        role="mentor"
        userName="현지현"
        students={["김민수", "이지은", "장서연"]}
        selectedStudent={selectedStudent}
        onStudentSelect={(name) => {
          setSelectedStudent(name);
        }}
      />

      <div className="flex flex-col w-full">
        <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-col px-10 py-5 gap-1">
          <div className="flex gap-1.5 px-3">
            <div className="flex font-bold text-2xl">{selectedStudent}</div>
            <div className="flex items-end text-md ">학생</div>
          </div>

          <main className="p-4">
            {activeTab === "학습 관리" && <StudyManagement />}
            {activeTab === "과제 관리" && <AssignmentManagement />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
>>>>>>> e4845d1d2761bc22bf059e99466ab1dd388d374f
