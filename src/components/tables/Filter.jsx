import React from "react";
import { FaFilter } from "react-icons/fa";

const Filter = ({
  data,
  isFilterOpen,
  setIsFilterOpen,
  visibleColumns,
  handleColumnVisibilityChange,
}) => {
  return (
    <div className="relative">
      <button
        className="text-sm px-3 py-2 flex items-center gap-2 border border-gray-300 bg-white rounded"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <FaFilter /> Filters
      </button>
      {isFilterOpen && (
        <div className="text-sm absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded shadow-lg p-3 z-10">
          <p className="font-bold mb-2">Toggle Columns:</p>
          {Object.keys(data[0])
            .filter((col) => col !== "id")
            .map((column) => (
              <div key={column} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(column)}
                  onChange={() => handleColumnVisibilityChange(column)}
                />
                <label>
                  {column
                    .replace(/_/g, " ") // Replace underscores with spaces
                    .charAt(0)
                    .toUpperCase() + column.slice(1).replace(/_/g, " ")}
                </label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
