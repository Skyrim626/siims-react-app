import { useState, useEffect } from "react";
import axios from "axios";
import { getRequest } from "../api/apiHelpers";

const useFetchTableData = ({ url }) => {
  // Rows State
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Current value in the input field
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [tableDataloading, setTableDataLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setTableDataLoading(true);
      try {
        const response = await getRequest({
          url: `/api/v1${url}`,
          params: {
            page: paginationModel.page + 1, // Correct API expects page to start at 1
            perPage: paginationModel.pageSize, // Items per page
            search: searchTerm, // Search term
          },
        });

        setRows(response.data);
        setTotalCount(response.meta.total); // Update the total count for pagination
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTableDataLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, paginationModel]);

  // Handle pagination model change
  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel); // Update pagination model (page and pageSize)
  };

  // Handle input field change
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    if (value === "") {
      // Reload data if input is cleared
      setSearchTerm("");
      setPaginationModel({ ...paginationModel, page: 0 });
    }
  };

  // Trigger search only on Enter key press
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchTerm(searchInput); // Use the input value for fetching data
      setPaginationModel({ ...paginationModel, page: 0 }); // Reset to first page
    }
  };

  return {
    rows,
    setRows,
    searchInput,
    totalCount,
    paginationModel,
    tableDataloading,
    handleSearchInputChange,
    handlePaginationModelChange,
    handleSearchKeyDown,
  };
};

export default useFetchTableData;
