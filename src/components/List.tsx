import FilterButton from "./FilterButton";
import { TABS, type TabType } from "../types/filter";
import { useState } from "react";
import { TODAYTASKTITLE, type ListProps } from "../types/list";
import { mockTodos } from "../mocks/list.mock";

const List: React.FC<ListProps> = ({ title }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("전체");

  const handleFilterClick = (tab: TabType) => {
    setSelectedTab(tab);
  };

  const filteredTodos =
    selectedTab === "전체"
      ? mockTodos
      : mockTodos.filter((todo) => todo.category === selectedTab);

  return (
    <div className="bg-white rounded-md px-8 py-5">
      <span className="flex text-2xl">{title}</span>
      <div className="flex gap-1">
        {TABS.map((tab) => (
          <FilterButton
            key={tab}
            value={tab}
            isActive={selectedTab === tab}
            onClick={handleFilterClick}
          />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-4 mb-2">
        {TODAYTASKTITLE.map((taskTitle) => (
          <div key={taskTitle} className="font-semibold text-gray-600">
            {taskTitle}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 mb-4"></div>

      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="grid grid-cols-5 gap-4 items-center">
            <div>{todo.title}</div>
            <div>{todo.date}</div>
            <div>{todo.file || "-"}</div>
            <div>{todo.goal || "-"}</div>
            <div>
              <input
                type="checkbox"
                checked={todo.isFeedback}
                readOnly
                className="w-4 h-4"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
