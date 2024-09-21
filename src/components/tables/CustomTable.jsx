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
import ArchiveButton from "./ArchiveButton";
import Pagination from "./Pagination";
import Search from "./Search";
import Filter from "./Filter";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableShowResult from "./TableShowResult";

// Per Page Numbers Modifier
const ITEMS_PER_PAGE_LISTS = [
  { value: 3 },
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

// A dynamic table
const Table = ({
  data,
  canSearch = true,
  canEdit = true,
  handleEdit = () => {},
  canView = true,
  canDelete = true,
}) => {
  /**
   * States
   */

  // Search States
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  // Sorting States
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null); // 'asc' or 'desc'

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [visibleColumns, setVisibleColumns] = useState(
    Object.keys(data[0]).filter((col) => col !== "id")
  );

  // Modal States
  const [selectedData, setSelectedData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Dropdown for filters

  // Search Logic
  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Filter Logic
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

  const handleArchive = (id) => {
    console.log(`Archive company with ID: ${id}`);
  };

  // Archive the selected row
  const handleArchiveSelected = () => {
    console.log(selectedIds);
  };

  return (
    <Section>
      {/* Archive Button */}
      {canDelete && <ArchiveButton onClick={handleArchiveSelected} />}

      {/* Pagination */}
      {/* <Pagination currentPage={currentPage}  /> */}
      <div className="flex justify-between items-center mb-4 mt-2">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMS_PER_PAGE_LISTS={ITEMS_PER_PAGE_LISTS}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          handleItemsPerPageChange={handleItemsPerPageChange}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
        <div className="flex items-center gap-2">
          <Search
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
          />
          <Filter
            data={data}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            visibleColumns={visibleColumns}
            handleColumnVisibilityChange={handleColumnVisibilityChange}
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableHead
            selectedIds={selectedIds}
            paginatedSongs={paginatedSongs}
            handleSelectAllChange={handleSelectAllChange}
            visibleColumns={visibleColumns}
            sortData={sortData}
            renderSortIcon={renderSortIcon}
          />
          <TableBody
            paginatedSongs={paginatedSongs}
            selectedIds={selectedIds}
            handleCheckboxChange={handleCheckboxChange}
            visibleColumns={visibleColumns}
            handleView={handleView}
            handleEdit={handleEdit}
            handleArchive={handleArchive}
          />
        </table>
      </div>
      <TableShowResult
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
      />
    </Section>
  );
};

export default Table;
