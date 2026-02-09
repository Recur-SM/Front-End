import { useState } from "react";
import type { TodoItem } from "../../types/list";

interface AssignmentBoardProps {
  todos: TodoItem[];
}

const AssignmentBoard = ({ todos }: AssignmentBoardProps) => {
  const [value, setValue] = useState("");

  if (todos.length === 0) {
    return (
      <div className="flex w-full justify-center items-center">
        <span className="text-[#767676]">내용이 없습니다</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {todos.map((todo) => (
        <div key={todo.id}>
          <span className="font-semibold text-lg">{todo.title}</span>

          <div className="flex w-full gap-1 py-2">
            <div className="flex w-1/3 justify-center items-center bg-[#99999933] h-[130px] rounded-lg border border-[#767676] text-sm">
              <span className="text-[#767676]">등록된 과제가 없습니다</span>
            </div>

            <div className="relative flex flex-col w-2/3 h-[130px] bg-white rounded-lgw-1/3">
              <span className="px-7 py-5 font-semibold text-lg">피드백</span>

              {!value && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#B0B0B0] text-sm">
                  내용이 없습니다
                </div>
              )}

              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="
            w-full h-full
            resize-none
            outline-none
            bg-transparent
            text-[#767676]
          "
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentBoard;
