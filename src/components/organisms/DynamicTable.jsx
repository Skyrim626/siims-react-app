import React, { useState, useMemo } from "react";

// Import Components
import Input from "../atoms/Input";
import Button from "../atoms/Button";

// Import Icons
import {
  CheckCircle2,
  Search,
  Trash2,
  Eye,
  Edit,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ITEMS_PER_PAGE = 3;

export default function DynamicTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleAttributes, setVisibleAttributes] = useState(
    new Set(Object.keys(data[0] || {}))
  );
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Handle checkbox change for individual rows
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  // Handle checkbox change for selecting all items
  const handleSelectAllChange = (event) => {
    setSelectedItems((prevSelectedItems) =>
      event.target.checked ? filteredData.map((item) => item.id) : []
    );
  };

  // Handle view action
  const handleView = (id) => {
    console.log(`Viewing item with id: ${id}`);
    // Implement view functionality
  };

  // Handle edit action
  const handleEdit = (id) => {
    console.log(`Editing item with id: ${id}`);
    // Implement edit functionality
  };

  // Handle delete action
  const handleDelete = (id) => {
    console.log(`Deleting item with id: ${id}`);
    // Implement delete functionality
  };

  // Toggle visibility of attributes
  const handleAttributeToggle = (attr) => {
    setVisibleAttributes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(attr)) {
        newSet.delete(attr);
      } else {
        newSet.add(attr);
      }
      return newSet;
    });
  };

  // Filter data based on search term and status filter
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesStatus = filter === "All" || item.status === filter;
      const matchesSearch = Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesStatus && matchesSearch;
    });
  }, [data, filter, searchTerm]);

  // Paginate the filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Change page handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Check if all items in the filtered data are selected
  const isAllSelected =
    filteredData.length > 0 && selectedItems.length === filteredData.length;

  return (
    <>
      {/* Filters */}
      <div className="py-4">
        <div className="flex space-x-4">
          {["All", "Pending", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-2 text-gray-900 ${
                filter === status
                  ? "border-b-2 border-gray-900 font-semibold"
                  : "hover:bg-blue-600 transition hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="button-group | flex items-center gap-2">
            <Button className="bg-gray-900 font-semibold rounded-full p-2 text-sm flex items-center gap-2">
              <CheckCircle2
                size={20}
                className="text-green-400 hover:text-green-500"
              />
              <p className="text-gray-100 hover:text-white">Mark as approved</p>
            </Button>
            <Button className="bg-gray-900 font-semibold rounded-full p-2 text-sm flex items-center gap-2">
              <Trash2 size={20} className="text-red-500 hover:text-red-600" />
              <p className="text-gray-100 hover:text-white">Delete</p>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border px-3 rounded-full border-blue-950 bg-white">
              <Search size={20} />
              <Input
                type="text"
                placeholder="Search for items"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-3 ml-2 pl-3 outline-none"
              />
            </div>

            <div className="relative">
              <Button
                className="flex items-center bg-gray-900 text-white rounded-full p-2 text-sm"
                onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
              >
                Filter{" "}
                <span className="ml-2">
                  {isFilterDropdownOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
              </Button>
              {isFilterDropdownOpen && (
                <div className="absolute mt-2 bg-white border rounded shadow-lg z-10 right-0">
                  <div className="p-4 py-2">
                    <div className="flex flex-col">
                      {Object.keys(data[0] || {}).map((key) => (
                        <label
                          key={key}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={visibleAttributes.has(key)}
                            onChange={() => handleAttributeToggle(key)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-800 text-white">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAllChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </th>
              {/* Dynamically generate table headers */}
              {Array.from(visibleAttributes).map((attr) => (
                <th
                  key={attr}
                  className="py-2 px-4 border-b bg-gray-800 text-white"
                >
                  {attr.charAt(0).toUpperCase() + attr.slice(1)}
                </th>
              ))}
              <th className="py-2 px-4 border-b bg-gray-800 text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-96">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </td>
                  {/* Dynamically generate table data */}
                  {Array.from(visibleAttributes).map((attr) => (
                    <td key={attr} className="py-2 px-4 border-b">
                      {item[attr]}
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(item.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Array.from(visibleAttributes).length + 2}
                  className="py-2 px-4 border-b text-center"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-900 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-900 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
