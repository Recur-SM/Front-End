import { useEffect, useRef, useState } from "react";
import { getPlanner } from "../../api/planner";
import type { PlannerResponse, PlannerResult } from "../../types/planner";

interface PlannerProps {
  menteeId: number;
  date: string;
  onHeightChange?: (height: number) => void;
  setPlannerId: (id: number) => void;
}

const PlannerBoard: React.FC<PlannerProps> = ({
  menteeId,
  date,
  onHeightChange,
  setPlannerId
}) => {
  const [plannerData, setPlannerData] = useState<PlannerResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const res: PlannerResponse = await getPlanner(menteeId, date);
        setPlannerId(res.result.plannerId);

        if (res.isSuccess && res.result) {
          setPlannerData(res.result);
        } else {
          setPlannerData(null);
        }
      } catch (error) {
        console.error("플래너 조회 실패:", error);
        setError(true);
        setPlannerData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanner();
  }, [menteeId, date]);

  const handleImageLoad = () => {
    if (imgRef.current && onHeightChange) {
      onHeightChange(imgRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    // 높이 초기화
    if ((error || !plannerData || !plannerData.imageUrl) && onHeightChange) {
      onHeightChange(130); // 기본 높이
    }
  }, [error, plannerData, onHeightChange]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center bg-[#99999933] h-[130px] rounded-lg border border-[#767676]">
        <span className="text-[#767676] text-sm">로딩 중...</span>
      </div>
    );
  }

  if (error || !plannerData || !plannerData.imageUrl) {
    return (
      <div className="flex w-full justify-center items-center bg-[#99999933] h-[130px] rounded-lg border border-[#767676]">
        <span className="text-[#767676] text-sm">등록된 플래너가 없습니다</span>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-lg border border-[#767676] overflow-hidden">
      <img
        ref={imgRef}
        src={plannerData.imageUrl}
        alt="플래너"
        className="w-full h-auto"
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default PlannerBoard;
