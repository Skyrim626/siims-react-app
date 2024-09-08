import React, { useState } from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"; // React Icons
import Section from "../common/Section";

const TestTable = ({ data }) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items per page
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Example data with additional attributes and ID
  const initialSongs = [
    {
      id: 1,
      song: "Bohemian Rhapsody",
      artist: "Queen",
      year: 1975,
      genre: "Rock",
      album: "A Night at the Opera",
      duration: "5:55",
      releaseDate: "1975-10-31",
      popularity: 85,
      language: "English",
      label: "EMI",
      country: "UK",
    },
    {
      id: 2,
      song: "Imagine",
      artist: "John Lennon",
      year: 1971,
      genre: "Pop",
      album: "Imagine",
      duration: "3:01",
      releaseDate: "1971-10-11",
      popularity: 90,
      language: "English",
      label: "Apple",
      country: "UK",
    },
    // More song entries here...
  ];

  const [songs, setSongs] = useState(data);

  // Extract column headers dynamically from the first object in the data array
  const columns = Object.keys(songs[0]).filter((col) => col !== "id");

  // Sort data based on the selected field and direction
  const sortData = (field) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);

    const sortedSongs = [...songs].sort((a, b) => {
      if (typeof a[field] === "string") {
        return direction === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
      return direction === "asc" ? a[field] - b[field] : b[field] - a[field];
    });

    setSongs(sortedSongs);
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

  // Pagination logic
  const totalItems = songs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const paginatedSongs = songs.slice(
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

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700">
          Found total {totalItems} records. Showing results {startIndex} to{" "}
          {endIndex} of {totalItems} results
        </span>
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2 text-gray-700">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="mr-4 border-gray-300 rounded"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <span className="mx-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
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
              {columns.map((column) => (
                <th
                  key={column}
                  className="py-2 px-4 border-b bg-gray-800 text-white whitespace-nowrap cursor-pointer"
                  onClick={() => sortData(column)}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}{" "}
                  {renderSortIcon(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedSongs.map((song, index) => (
              <tr
                key={song.id}
                className="bg-white border-b text-blue-500 font-bold dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-2 px-4">{startIndex + index}</td>
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(song.id)}
                    onChange={() => handleCheckboxChange(song.id)}
                    className="form-checkbox"
                  />
                </td>
                <td className="py-2 px-4">{song.id}</td>
                {columns.map((column) => (
                  <td key={column} className="py-2 px-4 whitespace-nowrap">
                    {song[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

export default TestTable;
