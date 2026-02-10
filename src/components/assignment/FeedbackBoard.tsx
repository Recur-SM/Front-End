import { useState } from "react";

interface FeedbackBoardProps {
  height?: number;
}

const FeedbackBoard: React.FC<FeedbackBoardProps> = ({ height = 130 }) => {
  const [value, setValue] = useState("");

  return (
    <div
      className="relative flex flex-col w-full h-[130px] bg-white rounded-lg"
      style={{ height: `${height}px` }}
    >
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
            px-10
          "
      />
    </div>
  );
};

export default FeedbackBoard;
