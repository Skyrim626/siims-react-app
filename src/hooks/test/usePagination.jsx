import { useState, useEffect } from "react";

const usePagination = ({
  fetchData,
  initialItemsPerPage = 5,
  initialPage = 1,
}) => {
  // States for pagination
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Function to handle fetching data when pagination parameters change
  const fetchPaginatedData = async () => {
    setLoading(true);
    try {
      const response = await fetchData(currentPage, itemsPerPage); // This should be the fetch function passed to the hook
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.last_page);
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever currentPage or itemsPerPage changes
  useEffect(() => {
    fetchPaginatedData();
  }, [currentPage, itemsPerPage]);

  // Functions to handle page change and items per page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    loading,
    handlePageChange,
    handleItemsPerPageChange,
    handleNextPage,
    handlePrevPage,
  };
};

export default usePagination;
