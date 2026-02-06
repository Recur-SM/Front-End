import type { FilterableItem } from "../types/list";

const FilteredRow = ({ item }: { item: FilterableItem }) => {
  return (
    <div className="grid grid-cols-5 gap-4 items-center text-xs">
      <div className="flex gap-3 cursor-pointer">
        <div>{item.title}</div>
        <img src="/src/assets/arrow.svg" alt="arrow" />
      </div>

      <div>{item.date}</div>

      <div className="flex gap-3 cursor-pointer">
        <div>{item.file || "-"}</div>
        {item.file && (
          <img src="/src/assets/download.svg" alt="download" />
        )}
      </div>

      <div>{item.goal || "-"}</div>

      {"isFeedback" in item && (
        <div className="flex px-6">
          <input
            type="checkbox"
            checked={item.isFeedback}
            readOnly
            className="sr-only peer"
          />
          <div className="w-4 h-4 rounded border border-[#505050] flex items-center justify-center peer-checked:bg-[#FF6738]">
            {item.isFeedback && (
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 9.8a1 1 0 0 1 1.4-1.4l3 3 6.7-6.7a1 1 0 0 1 1.4 0z" />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteredRow;