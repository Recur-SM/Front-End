import { useState } from "react";
import type { ListItem } from "../../types/list";
import Arrow from "../../assets/arrow.svg";
import Download from "../../assets/download.svg";

interface FilteredRowProps {
  item: ListItem;
  onClick?: () => void;
onDownloadFile?: (fileUrl: string) => void | Promise<void>;
}

const FilteredRow = ({ item, onClick, onDownloadFile }: FilteredRowProps) => {
  const [downloading, setDownloading] = useState(false);

  const handleTaskClick = () => {
    onClick?.();
  };

  const isDownloadable = Boolean(item.file);

  const handleFileDownload = async (e: React.MouseEvent) => {
  if (!isDownloadable) return;
  e.stopPropagation();
  if (downloading) return;

  setDownloading(true);
  try {
    await onDownloadFile?.(item.file!);
  } finally {
    setDownloading(false);
  }
};

  return (
    <div className="grid grid-cols-5 gap-4 items-center text-xs">
      <div
        className="flex gap-3 cursor-pointer"
        onClick={() => handleTaskClick()}
      >
        <div>{item.title}</div>
        <img src={Arrow} alt="arrow" />
      </div>

      <div>{item.date}</div>

      <div
        className={`flex gap-2 items-center min-w-0 ${
          isDownloadable ? "cursor-pointer hover:opacity-80" : ""
        }`}
        onClick={handleFileDownload}
        role={isDownloadable ? "button" : undefined}
        aria-label={isDownloadable ? "파일 다운로드" : undefined}
      >
        <span className="truncate">{item.file || "-"}</span>
        {item.file && (
          <img
            src={Download}
            alt="download"
            className="w-4 h-4 flex-shrink-0"
            aria-hidden
          />
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
          <div className="w-4 h-4 rounded border border-[#505050] flex items-center justify-center peer-checked:bg-[#FF6738] peer-checked:border-none">
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
