import { useState, useEffect } from "react";
import type { AddPlannerCommentRequest } from "../../types/planner";
import { addPlannerComment, getPlanner } from "../../api/planner";

interface FeedbackBoardProps {
  height?: number;
  plannerId: number;
  menteeId: number;
  mentorId: number;
  plannerDate: string;
}

const FeedbackBoard: React.FC<FeedbackBoardProps> = ({
  height = 130,
  plannerId,
  menteeId,
  mentorId,
  plannerDate,
}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        setFetching(true);
        const planner = await getPlanner(menteeId, plannerDate);
        setValue(planner.result.mentorComment || "");
      } catch (err) {
        console.error("피드백 불러오기 실패:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchComment();
  }, [plannerId, menteeId, plannerDate]);

  const handleSubmit = async () => {
    if (!value) return;
    setLoading(true);

    try {
      const payload: AddPlannerCommentRequest = {
        plannerId,
        menteeId,
        mentorId,
        mentorComment: value,
      };

      const response = await addPlannerComment(payload);
      console.log("작성 완료:", response);
      alert("피드백이 저장되었습니다!");
    } catch (err) {
      console.error(err);
      alert("피드백 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col w-full bg-white rounded-lg"
      style={{ height: `${height}px` }}
    >
      <span className="px-7 py-5 font-semibold text-lg">피드백</span>

      {!value && !fetching && (
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

      <button
        onClick={handleSubmit}
        disabled={loading}
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
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading ? "저장 중..." : "작성 완료"}
      </button>
    </div>
  );
};

export default FeedbackBoard;
