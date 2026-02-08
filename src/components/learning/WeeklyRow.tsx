import type { WeeklyReportItem } from "../../types/list";

const WeeklyRow = ({ item }: { item: WeeklyReportItem }) => {
  return (
    <div className="grid grid-cols-5 gap-4 text-xs">
      <div>{item.title}</div>
      <div>{item.period}</div>
      <div className="truncate">{item.mentorSummary}</div>
      <div className="truncate">{item.goodPoints}</div>
      <div className="truncate">{item.improvements}</div>
    </div>
  );
};

export default WeeklyRow;
