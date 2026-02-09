import FilterButton from "./FilterButton";
import { TABS, type TabType } from "../types/filter";
import { useEffect, useState } from "react";
import { LIST_TITLES, type FeedbackItem, type TodoItem } from "../types/list";
import FilteredRow from "./learning/FilteredRow";
import { getTasks } from "../api/task";
import { useMenteeStore } from "../stores/menteeStroe";

type FilterableItem = TodoItem | FeedbackItem;

interface ListProps {
  title: string;
  type: "할일" | "피드백";
  selectedDate?: string;
}

const List: React.FC<ListProps> = ({ title, type, selectedDate }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("전체");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  // const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const { selectedMentee } = useMenteeStore();
  const today = new Date().toISOString().split("T")[0];

  const isFilterableType = (type: ListProps["type"]): type is "할일" | "피드백" => true;

  useEffect(() => {
    if (!selectedMentee) return; 
    const fetchTasks = async () => {
      try {
        const res = await getTasks(selectedMentee.menteeId, today);

        const fetchedTodos: TodoItem[] = res.result.tasks
          .filter((t) => t.taskType === "ADDITIONAL")
          .map((t) => ({
            id: t.taskId,
            title: t.taskName,
            date: t.taskDate,
            goal: t.taskGoal,
            file: t.pdfFileUrl,
             category: t.subjectName as TabType,
            type: "할일",
            isFeedback: t.hasFeedback,
          }));

        // const fetchedFeedbacks: FeedbackItem[] = res.result.tasks
        //   .filter((t) => t.taskType === "FIXED") // 피드백 기준
        //   .map((t) => ({
        //     id: t.taskId,
        //     title: t.taskName,
        //     date: t.taskDate,
        //     goal: t.taskGoal,
        //     file: t.pdfFileUrl,
        //     category: t.subjectName,
        //     type: "피드백",
        //     isFeedback: t.hasFeedback,
        //   }));

        setTodos(fetchedTodos);
        // setFeedbacks(fetchedFeedbacks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [selectedMentee, today]);

  const sourceItems = todos;

  const filteredItems: FilterableItem[] = sourceItems.filter((item) =>
    selectedDate ? item.date === selectedDate : true
  ).filter((item) =>
    selectedTab === "전체" ? true : item.category === selectedTab
  );

  return (
    <div className="bg-white rounded-md px-8 py-5">
      <span className="flex text-lg font-semibold pb-3 px-1">{title}</span>

      {isFilterableType(type) && (
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
      )}

      <div className="grid grid-cols-5 gap-4 px-1 pt-2">
        {LIST_TITLES[type].map((col) => (
          <div key={col} className="font-semibold text-sm text-gray-600">
            {col}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 mb-4"></div>

      <div className="space-y-4 px-1">
        {filteredItems.map((item) => (
          <FilteredRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default List;
