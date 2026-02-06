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
      <span className="flex text-xl font-semibold pb-3 px-1">{title}</span>
      <div className="space-y-5">
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
        <div className="grid grid-cols-5 gap-4 mb-2 px-1">
          {TODAYTASKTITLE.map((taskTitle) => (
            <div
              key={taskTitle}
              className="font-semibold text-sm text-gray-600"
            >
              {taskTitle}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mb-4"></div>

        <div className="space-y-8 px-1">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="grid grid-cols-5 gap-4 items-center text-xs"
            >
              <div className="flex gap-3 cursor-pointer">
                <div>{todo.title}</div>
                <img src="/src/assets/arrow.svg" alt="arrow" />
              </div>
              <div>{todo.date}</div>
              <div className="flex gap-3 cursor-pointer">
                <div>{todo.file || "-"}</div>
                {todo.file ? (
                  <img src="/src/assets/download.svg" alt="download" />
                ) : null}
              </div>
              <div>{todo.goal || "-"}</div>
              <div className="flex px-6">
                <input
                  type="checkbox"
                  checked={todo.isFeedback}
                  readOnly
                  className="sr-only peer"
                />
                <div
                  className="
                    w-4 h-4 rounded
                    border border-[#505050]
                    flex items-center justify-center
                    peer-checked:bg-[#FF6738]
                    peer-checked:border-[#FF6738]
                  "
                >
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style={{ display: todo.isFeedback ? "block" : "none" }}
                  >
                    <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 9.8a1 1 0 0 1 1.4-1.4l3 3 6.7-6.7a1 1 0 0 1 1.4 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
