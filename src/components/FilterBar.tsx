interface FilterBarProps {
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, selectedFilter, onFilterChange }) => {
  return (
    <div className="flex space-x-[0.52vw] my-[0.19vh]">
      {filters.map((filter) => {
        const isActive = selectedFilter === filter;
        
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`
              px-[0.83vw] py-[0.56vh] rounded-[1.11vh] border text-[0.68vw] font-medium transition-all
              ${isActive 
                ? 'border-[#FF6738] text-[#FF6738] bg-white'
                : 'border-[#F7F7F7] text-[#111111] bg-white'
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;