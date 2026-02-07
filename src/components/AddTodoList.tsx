import { useState } from "react";
import { ADDTODOTITLE, type TodoItem } from "../types/list";
import type { TabType } from "../types/filter";

const AddTodoList: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);

  const [newTodo, setNewTodo] = useState<Partial<TodoItem>>({
    type: "할일",
    isFeedback: false,
  });

  const handleAddTodo = () => {
    setIsAdding(true);
  };

  const handleChange =
    (key: keyof TodoItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setNewTodo((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const handleSubmit = () => {
    if (!newTodo.title || !newTodo.category) return;

    setNewTodo({ type: "할일", isFeedback: false });
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-md px-8 py-5">
      <span className="flex text-lg font-semibold pb-3">오늘 할 일</span>

      <div className="grid grid-cols-7 gap-4 px-1 text-sm font-semibold text-gray-600">
        {ADDTODOTITLE.map((title) => (
          <div key={title}>{title}</div>
        ))}
      </div>

      <div className="border-t my-4" />

      {isAdding && (
        <div className="grid grid-cols-7 gap-4 items-center py-0.5 text-sm">
          {/* 제목 */}
          <input
            className="bg-transparent outline-none"
            placeholder="제목"
            value={newTodo.title ?? ""}
            onChange={handleChange("title")}
          />

          {/* 날짜 */}
          <span className="text-sm text-gray-500">
            {new Date().getMonth() + 1}월 {new Date().getDate()}일
          </span>

          {/* 파일 */}
          <label className="flex items-center gap-1 text-sm cursor-pointer text-gray-500">
            파일 첨부
            <span>↗</span>
            <input type="file" hidden />
          </label>

          {/* 목표 */}
          <input
            className="bg-transparent outline-none"
            placeholder="목표를 작성해주세요"
            value={newTodo.goal ?? ""}
            onChange={handleChange("goal")}
          />

          {/* 피드백 */}
          <div className="flex pl-6">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={newTodo.isFeedback}
              onChange={(e) =>
                setNewTodo((prev) => ({
                  ...prev,
                  isFeedback: e.target.checked,
                }))
              }
            />
          </div>

          {/* 과목 */}
          <div className="flex gap-1">
            {["국어", "영어", "수학"].map((subj) => (
              <button
                key={subj}
                type="button"
                onClick={() =>
                  setNewTodo((prev) => ({
                    ...prev,
                    category: subj as TabType,
                  }))
                }
                className={`px-3 py-2 rounded-full border border-[#505050]
    text-xs text-[#505050]
    whitespace-nowrap
    flex items-center justify-center
            ${
              newTodo.category === subj
                ? "bg-black text-white"
                : "text-gray-500"
            }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* 액션 */}
          <div className="flex gap-1 pl-6">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 rounded-full border bg-[#E5E5EC]"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-1 rounded-full bg-[#E5E5EC]"
            >
              추가
            </button>
          </div>
        </div>
      )}

      {!isAdding && (
        <button
          className="flex gap-2 items-center mt-2 text-[#505050]"
          onClick={handleAddTodo}
        >
          <img src="/src/assets/plus.svg" alt="plus" width={10} />할 일
        </button>
      )}
    </div>
  );
};

export default AddTodoList;
