// hooks/useTableData.js
import { useMemo, useState } from "react";

export const useTableData = (data, searchTerm, sortField, sortDirection) => {
  // Search and sort logic
  const filteredData = useMemo(() => {
    return data
      .filter((xData) =>
        Object.values(xData).some(
          (value) =>
            (typeof value === "string" &&
              value.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof value === "number" && value.toString().includes(searchTerm))
        )
      )
      .sort((a, b) => {
        if (!sortField) return 0;
        if (typeof a[sortField] === "string") {
          return sortDirection === "asc"
            ? a[sortField].localeCompare(b[sortField])
            : b[sortField].localeCompare(a[sortField]);
        }
        return sortDirection === "asc"
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      });
  }, [data, searchTerm, sortField, sortDirection]);

  return filteredData;
};
