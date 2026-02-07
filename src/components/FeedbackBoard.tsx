import { useState } from "react";

const FeedbackBoard = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col w-full h-[600px] bg-white rounded-lg">
      <span className="px-7 py-5 font-semibold text-lg">피드백 작성란</span>

      <div className="relative flex-1 px-7 pb-5">
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#B0B0B0]">
            피드백을 작성해주세요
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
  );
};

export default FeedbackBoard;