import { useState } from "react";

const useColumnVisibility = (data) => {
  const [visibleColumns, setVisibleColumns] = useState(
    Object.keys(data[0]).filter((col) => col !== "id")
  );

  const handleColumnVisibilityChange = (column) => {
    if (visibleColumns.includes(column)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== column));
    } else {
      const newVisibleColumns = [...visibleColumns];
      const originalIndex = Object.keys(data[0]).indexOf(column);
      newVisibleColumns.splice(originalIndex, 0, column); // Reinsert the column in its original position
      setVisibleColumns(newVisibleColumns);
    }
  };

  return { visibleColumns, handleColumnVisibilityChange };
};

export default useColumnVisibility;
