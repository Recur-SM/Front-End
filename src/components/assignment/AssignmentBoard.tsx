import { useRef, useState } from "react";
import { SubjectIdMap, type TodoItem } from "../../types/list";
import type { AddFeedbackRequest } from "../../types/feedback";
import { useMenteeStore } from "../../stores/menteeStroe";
import { useAuthStore } from "../../stores/authStore";
import { addFeedback } from "../../api/feedback";

interface AssignmentBoardProps {
  todos: TodoItem[];
}

const AssignmentBoard = ({ todos }: AssignmentBoardProps) => {
  const [values, setValues] = useState<Record<number, string>>({});
  const { selectedMentee } = useMenteeStore();
  const { id } = useAuthStore();
  const textareaRefs = useRef<Record<number, HTMLTextAreaElement | null>>({});

  const handleChange = (todoId: number, value: string) => {
    setValues((prev) => ({
      ...prev,
      [todoId]: value,
    }));

    const el = textareaRefs.current[todoId];
    if (el) {
      el.style.height = "auto"; // 줄어드는 것도 가능하게
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleSubmit = async (todo: TodoItem) => {
    const content = values[todo.id];
    const taskCode = SubjectIdMap[todo.category];

    if (!content?.trim()) return;

    const payload: AddFeedbackRequest = {
      taskId: todo.id,
      menteeId: selectedMentee!.menteeId,
      mentorId: id!,
      subjectId: taskCode,
      feedbackDate: new Date().toISOString().slice(0, 10),
      detailContent: content,
    };

    const res = await addFeedback(payload);

    console.log(res)
  };

  if (todos.length === 0) {
    return (
      <div className="flex w-full justify-center items-center">
        <span className="text-[#767676]">내용이 없습니다</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {todos.map((todo) => {
        const value = values[todo.id] ?? "";

        return (
          <div key={todo.id}>
            <span className="font-semibold text-lg">{todo.title}</span>

            <div className="flex w-full gap-1 py-2">
              <div className="flex w-1/3 justify-center items-center bg-[#99999933] h-[130px] rounded-lg border border-[#767676] text-sm">
                <span className="text-[#767676]">등록된 과제가 없습니다</span>
              </div>

              <div className="relative flex flex-col w-2/3 min-h-[130px] bg-white rounded-lg">
                <span className="px-7 py-5 font-semibold text-lg">피드백</span>

                {!value && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#B0B0B0] text-sm">
                    내용이 없습니다
                  </div>
                )}

                <textarea
                  ref={(el) => {
                    textareaRefs.current[todo.id] = el;
                  }}
                  value={value}
                  onChange={(e) => handleChange(todo.id, e.target.value)}
                  rows={1}
                  className="
                    w-full
                    resize-none
                    overflow-hidden
                    outline-none
                    bg-transparent
                    text-[#767676]
                    px-7
                    pb-5
                  "
                />
                <button
                  className="
                    absolute
                    bottom-3
                    right-3
                    text-xs
                    px-3
                    py-1
                    border
                    rounded-2xl
                    bg-white
                    hover:bg-gray-50
                  "
                  onClick={() => handleSubmit(todo)}
                >
                  작성 완료
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentBoard;
