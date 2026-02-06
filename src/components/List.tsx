import FilterButton from "./FilterButton";
import { TABS, type TabType } from "../types/filter";
import { useState } from "react";
import {
  LIST_TITLES,
  type FeedbackItem,
  type ListProps,
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

const List: React.FC<ListProps> = ({ title, type }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("전체");

  const isFilterableType = (
    type: ListProps["type"],
  ): type is "할일" | "피드백" => type !== "주간";

  const sourceItems = SOURCE_MAP[type];

  const filteredItems = isFilterableType(type)
    ? selectedTab === "전체"
      ? sourceItems
      : (sourceItems as FilterableItem[]).filter(
          (item) => item.category === selectedTab,
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
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mb-4"></div>

        <div className="space-y-8 px-1">
          {filteredItems.map((item) =>
            type === "주간" ? (
              <WeeklyRow key={item.id} item={item as WeeklyReportItem} />
            ) : (
              <FilteredRow key={item.id} item={item as FilterableItem} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
