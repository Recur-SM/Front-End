import { useState } from "react";
import { ADDTODOTITLE, type TodoItem } from "../../types/list";
import type { TabType } from "../../types/filter";
import Arrow from "../../assets/arrow.svg";
import Plus from "../../assets/plus.svg";
import { addTask } from "../../api/add-task";
import type { AddTaskRequest } from "../../types/task";
import { fileUpload } from "../../api/file-upload";

interface AddTodoListProps {
  selectedDate: string;
  onAddTodo: (todo: TodoItem) => void;
}

const AddTodoList: React.FC<AddTodoListProps> = ({
  selectedDate,
  onAddTodo,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTodo, setNewTodo] = useState<Partial<TodoItem>>({
    type: "할일",
    isFeedback: false,
  });
  const [fileName, setFileName] = useState<string | null>(null);

  const subjectMap: Record<string, string> = {
    국어: "KOR",
    영어: "ENG",
    수학: "MATH",
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    setNewTodo((prev) => ({
      ...prev,
      file: file.name,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!newTodo.title || !newTodo.category) return;

      const taskCode = subjectMap[newTodo.category];

      const todo: AddTaskRequest = {
        menteeId: 0, // 임시
        mentorId: 0,
        subjectCode: taskCode,
        taskName: newTodo.title,
        taskDate: selectedDate,
        taskGoal: newTodo.goal,
        taskType: "ADDITIONAL",
      };

      const res = await addTask(todo);

      const taskId = res.result.taskId;

      // 파일이 있으면 업로드
      if (fileName && newTodo.file) {
        const fileInput = (
          document.querySelector('input[type="file"]') as HTMLInputElement
        )?.files?.[0];

        if (fileInput) {
          await fileUpload(taskId, fileInput);
        }
      }

      const newTodoItem: TodoItem = {
        id: res.result.taskId,
        title: newTodo.title!,
        date: selectedDate,
        file: fileName ?? undefined,
        type: "할일",
        isFeedback: false,
        category: newTodo.category!,
      };
      onAddTodo(newTodoItem);
      setNewTodo({ type: "할일", isFeedback: false });
      setFileName(null);
      setIsAdding(false);
    } catch (error) {
      console.error(error);
    }
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

      {/* {todos.map((todo) => (
        <div
          key={todo.id}
          className="grid grid-cols-7 gap-4 items-center py-1 pl-1 text-sm text-[#505050]"
        >
          <div>{todo.title}</div>
          <div>{todo.date}</div>
          <div>{todo.file ?? "-"}</div>
          <div>{todo.goal ?? "-"}</div>
          <div className="pl-6">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={todo.isFeedback}
              disabled
            />
          </div>
          <div className="flex">
            <div
              className={`px-3 py-2 rounded-full border border-[#FF6738]
                text-xs text-[#FF6738]`}
            >
              {todo.category}
            </div>
            <div />
          </div>
        </div>
      ))} */}

      {isAdding && (
        <div className="grid grid-cols-7 gap-4 items-center py-1 pl-1 text-sm">
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
          <div className="flex flex-col">
            <label className="flex items-center gap-1 text-sm cursor-pointer text-gray-500">
              파일 첨부
              <img src={Arrow} alt="arrow" />
              <input type="file" hidden onChange={handleFileChange} />
            </label>
            <div>
              {fileName && (
                <div className="col-span-7 mt-2 text-sm text-gray-600">
                  {fileName}
                </div>
              )}
            </div>
          </div>

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
              disabled
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
                ? "border-[#FF6738] text-[#FF6738]"
                : "text-gray-500"
            }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* 액션 */}
          <div className="flex gap-0.5 pl-7">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 rounded-full border bg-[#F6F6F6] active:bg-[#FF67381A] active:text-[#FF6738]"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-1 rounded-full border bg-[#F6F6F6] active:bg-[#FF67381A] active:text-[#FF6738]"
            >
              추가
            </button>
          </div>
        </div>
      )}

      <button
        className="flex gap-2 py-3 items-center mt-2 text-[#505050]"
        onClick={handleAddTodo}
      >
        <img src={Plus} alt="plus" width={10} />할 일
      </button>
    </div>
  );
};

export default AddTodoList;
