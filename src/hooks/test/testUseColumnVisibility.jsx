import { useState } from "react";

const testUseColumnVisibility = (data) => {
  // Check if data is an array and contains elements
  const [visibleColumns, setVisibleColumns] = useState(
    (Array.isArray(data) && data.length > 0 ? Object.keys(data[0]) : []).filter(
      (col) => col !== "id"
    )
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

export default testUseColumnVisibility;
