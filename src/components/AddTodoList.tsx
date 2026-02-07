// import { useState } from "react";
// import type { TodoItem } from "../types/list";

// interface AddTodoListProps {
//   selectedDate: string;
//   onAddTodo: (todo: TodoItem) => void;
// }

const AddTodoList: React.FC = () => {
  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("기타");

  // const handleAdd = () => {
  //   if (!title) return;
  //   onAddTodo({
  //     id: Date.now(),
  //     title,
  //     date: selectedDate,
  //     category,
  //     type: "할일",
  //     goal: "",
  //     isFeedback: false,
  //   });
  //   setTitle("");
  //   setCategory("기타");
  // };

  return (
    <div className="bg-white rounded-md px-8 py-5">
      <span className="flex text-lg font-semibold pb-3 px-1">오늘 할 일</span>

      <div className="flex gap-2 cursor-pointer">
        <img src="/src/assets/plus.svg" alt="plus" width={10} />
        <button className="text-md text-[#505050]">할 일</button>
      </div>
      {/* <input
        type="text"
        placeholder="할 일 제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 rounded w-3/4 mb-3"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded w-1/2 mb-3"
      >
        <option value="기타">기타</option>
        <option value="수학">수학</option>
        <option value="영어">영어</option>
        <option value="국어">국어</option>
      </select>
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-[#FF6738] text-white rounded hover:bg-[#ff4d00]"
      >
        추가
      </button> */}
    </div>
  );
};

export default AddTodoList;
