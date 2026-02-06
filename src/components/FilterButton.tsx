import React from "react";
import type { FilterButtonProps } from "../types/filter";

const FilterButton: React.FC<FilterButtonProps> = ({
  value,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
      <button
        className={`tab ${isActive ? "active text-[#FF6738] border-[#FF6738]" : "text-[#111111] border-[#F7F7F7]"} border rounded-xl px-4 py-1.5 text-sm`}
        onClick={handleClick}
      >
        {value}
      </button>
  );
};

export default FilterButton;
