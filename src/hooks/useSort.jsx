import { useState } from "react";

const useSort = (data) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null); // 'asc' or 'desc'

  const sortData = (field) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedData = [...data].sort((a, b) => {
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

  return { sortedData, sortData, sortField, sortDirection };
};

export default useSort;
