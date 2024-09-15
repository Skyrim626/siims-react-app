import React, { useState, useMemo } from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaEye, // View icon
  FaEdit, // Edit icon
  FaArchive, // Archive icon
} from "react-icons/fa"; // React Icons
import Section from "../common/Section";
import Text from "../common/Text";
import { Button } from "@headlessui/react";

// Per Page Numbers Modifier
const ITEMS_PER_PAGE_LISTS = [
  { value: 5 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
  { value: 30 },
  { value: 35 },
  { value: 40 },
  { value: 45 },
  { value: 50 },
];

const TestTable = ({
  data,
  canSearch = true,
  canEdit = true,
  canView = true,
  canDelete = true,
}) => {
  /**
   * States
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  // Sorting States
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null); // 'asc' or 'desc'

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [visibleColumns, setVisibleColumns] = useState(
    Object.keys(data[0]).filter((col) => col !== "id")
  );

  // Search States
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Dropdown for filters

  // Filter and sort data based on search term
  const filteredSongs = useMemo(() => {
    return data
      .filter((song) =>
        Object.values(song).some(
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

  // Pagination logic
  const totalItems = filteredSongs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };

  // Handle select all checkbox
  const handleSelectAllChange = () => {
    if (selectedIds.size === paginatedSongs.length) {
      setSelectedIds(new Set());
    } else {
      const newSelectedIds = new Set(paginatedSongs.map((song) => song.id));
      setSelectedIds(newSelectedIds);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Handle column visibility toggle
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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Sort data based on the selected field and direction
  const sortData = (field) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  // Render sorting icon dynamically for each column
  const renderSortIcon = (field) => {
    if (sortField === field) {
      return sortDirection === "asc" ? (
        <FaSortUp className="inline-block ml-1" />
      ) : (
        <FaSortDown className="inline-block ml-1" />
      );
    }
    return <FaSort className="inline-block ml-1" />;
  };

  // Handler functions for action buttons
  const handleView = (id) => {
    console.log(`View company with ID: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit company with ID: ${id}`);
  };

  const handleArchive = (id) => {
    console.log(`Archive company with ID: ${id}`);
  };

  return (
    <Section>
      <div className="flex">
        <Button
          className={
            "flex items-center gap-1 p-2 rounded-full text-sm text-white font-bold bg-indigo-500 transition hover:bg-indigo-600"
          }
        >
          <FaArchive size={20} />
          Archive
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3 text-sm">
          <Text>Page</Text>
          <div className="flex gap-1 items-stretch">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-2 text-sm bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <input
              className="py-1 px-3 text-sm text-gray-700 border-2 bg-white outline-none w-[50px] h-full text-center"
              type="text"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            />

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-2 text-sm bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
            <div className="flex gap-1">
              <p className="my-auto">of {totalPages} | View</p>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-2 outline-none border-2 cursor-pointer border-gray-300 rounded text-sm"
              >
                {ITEMS_PER_PAGE_LISTS.map((array) => (
                  <option key={array.value} value={array.value}>
                    {array.value}
                  </option>
                ))}
              </select>
              <span className="my-auto text-sm">records|</span>
              <span className="text-gray-700 text-sm my-auto">
                Found total {totalItems} records.
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm px-2 py-2 rounded-full border border-blue-950 bg-white">
            <FaSearch />
            <input
              type="text"
              placeholder="Search company..."
              className="outline-none text-sm bg-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
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
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-800 text-white">#</th>
              <th className="py-2 px-4 border-b bg-gray-800 text-white">
                <input
                  type="checkbox"
                  checked={selectedIds.size === paginatedSongs.length}
                  onChange={handleSelectAllChange}
                  className="form-checkbox"
                />
              </th>
              <th className="py-2 px-4 border-b bg-gray-800 text-white">ID</th>
              {visibleColumns.map((column) => (
                <th
                  key={column}
                  className="py-2 px-4 border-b bg-gray-800 text-white whitespace-nowrap cursor-pointer"
                  onClick={() => sortData(column)}
                >
                  {column
                    .replace(/_/g, " ") // Replace underscores with spaces
                    .charAt(0)
                    .toUpperCase() + column.slice(1).replace(/_/g, " ")}{" "}
                  {renderSortIcon(column)}
                </th>
              ))}
              <th className="py-2 px-4 border-b bg-gray-800 text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedSongs.map((song, index) => (
              <tr
                key={song.id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(song.id)}
                    onChange={() => handleCheckboxChange(song.id)}
                    className="form-checkbox"
                  />
                </td>
                <td className="py-2 px-4 border-b">{song.id}</td>
                {visibleColumns.map((column) => (
                  <td key={column} className="py-2 px-4 border-b">
                    {song[column]}
                  </td>
                ))}
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(song.id)}
                      className="text-blue-600 hover:underline"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(song.id)}
                      className="text-yellow-600 hover:underline"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleArchive(song.id)}
                      className="text-red-600 hover:underline"
                    >
                      <FaArchive size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Text>
          Showing result {startIndex} to {endIndex} of {totalItems} results.
        </Text>
      </div>
    </Section>
  );
};

export default TestTable;
