import { useState, useEffect } from "react";
import { getRequest } from "../api/apiHelpers";

const useFetch = ({
  url,
  initialPage = 1,
  initialItemsPerPage = 10,
  options = {},
  searchTerm = "",
  setData = () => {},
  setLoading,
}) => {
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (page, perPage, search) => {
    setLoading(true);
    setError(null);

    try {
      const fullUrl = `/api/v1${url}?page=${page}&per_page=${perPage}&search=${search}`;
      const response = await getRequest({ url: fullUrl, ...options });
      setData(response.data || []);
      setTotalItems(response.meta.total || 0);
      setTotalPages(response.meta.last_page || 1);
    } catch (err) {
      setError(err.message || "Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, itemsPerPage, searchTerm); // Fetch data with search term
  }, [url, currentPage, itemsPerPage, searchTerm]); // Depend on searchTerm

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (perPage) => {
    // console.log(perPage.target.value);
    setItemsPerPage(Number(perPage.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);

  return {
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    handleNextPage,
    handlePrevPage,
  };
};

export default useFetch;
