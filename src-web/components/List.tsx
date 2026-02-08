import FilterButton from "./FilterButton";
import { TABS, type TabType } from "../types/filter";
import { useState } from "react";
<<<<<<< HEAD
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
      <span className="flex text-2xl font-semibold pb-3 px-1">{title}</span>
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
=======
import {
  LIST_TITLES,
  type FeedbackItem,
  type TodoItem,
  type WeeklyReportItem,
} from "../types/list";
import {
  mockTodos,
  mockFeedbacks,
  mockWeeklyReports,
} from "../mocks/list.mock";
import FilteredRow from "./FilteredRow";
import WeeklyRow from "./WeeklyRow";

type FilterableItem = TodoItem | FeedbackItem;

type SourceMap = {
  할일: TodoItem[];
  피드백: FeedbackItem[];
  주간: WeeklyReportItem[];
};

const SOURCE_MAP: SourceMap = {
  할일: mockTodos,
  피드백: mockFeedbacks,
  주간: mockWeeklyReports,
};

interface ListProps {
  title: string;
  type: "할일" | "피드백" | "주간";
  selectedDate?: string;
}

const List: React.FC<ListProps> = ({ title, type, selectedDate }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("전체");

  const isFilterableType = (
    type: ListProps["type"],
  ): type is "할일" | "피드백" => type !== "주간";

  const sourceItems = SOURCE_MAP[type];

  const filteredItems = isFilterableType(type)
  ? (sourceItems as FilterableItem[])
      .filter((item) =>
        selectedDate ? item.date === selectedDate : true,
      )
      .filter((item) =>
        selectedTab === "전체" ? true : item.category === selectedTab,
      )
  : sourceItems;

  return (
    <div className="bg-white rounded-md px-8 py-5">
      <span className="flex text-lg font-semibold pb-3 px-1">{title}</span>

      <div className="space-y-3">
        {isFilterableType(type) && (
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <FilterButton
                key={tab}
                value={tab}
                isActive={selectedTab === tab}
                onClick={setSelectedTab}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-5 gap-4 px-1 pt-5">
          {LIST_TITLES[type].map((title) => (
            <div key={title} className="font-semibold text-sm text-gray-600">
              {title}
>>>>>>> e4845d1d2761bc22bf059e99466ab1dd388d374f
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mb-4"></div>

        <div className="space-y-8 px-1">
<<<<<<< HEAD
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
=======
          {filteredItems.map((item) =>
            type === "주간" ? (
              <WeeklyRow key={item.id} item={item as WeeklyReportItem} />
            ) : (
              <FilteredRow key={item.id} item={item as FilterableItem} />
            ),
          )}
>>>>>>> e4845d1d2761bc22bf059e99466ab1dd388d374f
        </div>
      </div>
    </div>
  );
};

export default List;
