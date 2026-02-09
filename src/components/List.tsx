import FilterButton from "./FilterButton";
import { TABS, type TabType } from "../types/filter";
import { useState } from "react";
import { LIST_TITLES, type ListItem } from "../types/list";
import FilteredRow from "./learning/FilteredRow";

interface ListProps {
  title: string;
  type: "할일" | "피드백";
  tasks: ListItem[];
}

const List: React.FC<ListProps> = ({ title, type, tasks }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("전체");
  const filteredTasks = tasks.filter((t) =>
    selectedTab === "전체" ? true : t.category === selectedTab,
  );

  return (
    <div className="bg-white rounded-md px-8 py-5">
      <span className="flex text-lg font-semibold pb-3 px-1">{title}</span>

      {/* 필터 버튼 */}
      <div className="flex gap-1 mb-3">
        {TABS.map((tab) => (
          <FilterButton
            key={tab}
            value={tab}
            isActive={selectedTab === tab}
            onClick={setSelectedTab}
          />
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4 px-1 pt-2">
        {LIST_TITLES[type].map((col) => (
          <div key={col} className="font-semibold text-sm text-gray-600">
            {col}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 mb-4"></div>

      <div className="space-y-4 px-1">
        {filteredTasks.map((item) => (
          <FilteredRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default List;
