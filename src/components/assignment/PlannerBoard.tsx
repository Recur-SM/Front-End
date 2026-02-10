import { useEffect } from "react";
import { getPlanner } from "../../api/planner";

interface PlannerProps {
  menteeId: number;
  date: string;
}

const PlannerBoard: React.FC<PlannerProps> = ({ menteeId, date }) => {
  
  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const res = await getPlanner(menteeId, date);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlanner();
  }, [menteeId, date]);

  return (
    <div className="flex w-full justify-center items-center bg-[#99999933] h-[130px] rounded-lg border border-[#767676] text-sm">
      <span className="text-[#767676]">등록된 플래너가 없습니다</span>
    </div>
  );
};

export default PlannerBoard;
