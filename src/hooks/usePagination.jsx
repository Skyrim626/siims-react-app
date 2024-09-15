import { useState } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPageState);
  const startIndex = (currentPage - 1) * itemsPerPageState + 1;
  const endIndex = Math.min(currentPage * itemsPerPageState, totalItems);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPageState,
    currentPage * itemsPerPageState
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPageState(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedData,
    handlePageChange,
    handleItemsPerPageChange,
  };
};

export default usePagination;
