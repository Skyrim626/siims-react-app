import { useState } from "react";
import useCheckboxSelection from "../../../../hooks/useCheckboxSelection";
import useColumnVisibility from "../../../../hooks/useColumnVisibility";
import usePagination from "../../../../hooks/usePagination";
import useSearch from "../../../../hooks/useSearch";
import useSort from "../../../../hooks/useSort";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import ArchiveButton from "../../../tables/ArchiveButton";
import Pagination from "../../../tables/Pagination";
import Search from "../../../tables/Search";
import Filter from "../../../tables/Filter";
import Section from "../../../common/Section";
import AdminCompaniesTableBody from "./AdminCompaniesTableBody";
import AdminCompaniesTableHead from "./AdminCompaniesTableHead";

const AdminCompaniesTable = ({
  data, // Data to be displayed in the table
  searchPlaceholder = "Search something...", // Placeholder for the search input
  handleArchiveBySelectedIds, // Function to handle archiving selected users
  handleArchive, // Function to handle archiving a single user
  handleEdit, // Function to handle editing a user
  handleDelete, // Function to handle deleting a user
  handleView, // Function to handle viewing user details
  ITEMS_PER_PAGE_LISTS = [
    // Options for items per page
    { value: 25 },
    { value: 50 },
    { value: 100 },
    { value: 250 },
    { value: 500 },
  ],
  IDsIsLink = true, // Flag to determine if IDs should be displayed as links
  term, // Current search term
  filteredData, // Data after filtering
  handleSearchChange, // Function to handle changes in the search input
}) => {
  // Sorting hook
  const { sortedData, sortData, sortField, sortDirection } =
    useSort(filteredData); // Using the custom hook to sort the filtered data

  // Pagination hook
  const {
    currentPage, // Current page number
    totalPages, // Total number of pages
    startIndex, // Start index of paginated data
    endIndex, // End index of paginated data
    paginatedData, // Data for the current page
    handlePageChange, // Function to change the current page
    handleItemsPerPageChange, // Function to change the number of items per page
  } = usePagination(sortedData, ITEMS_PER_PAGE_LISTS[0].value); // Using the custom hook for pagination

  // Checkbox selection hook
  const { selectedIds, handleCheckboxChange, handleSelectAllChange } =
    useCheckboxSelection(paginatedData); // Using the custom hook for checkbox selection

  // Column visibility hook
  const { visibleColumns, handleColumnVisibilityChange } =
    useColumnVisibility(data); // Using the custom hook for managing column visibility

  // Filter Toggle States
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to manage filter dropdown visibility

  // Render sorting icon based on current sort field and direction
  const renderSortIcon = (field) => {
    if (sortField === field) {
      return sortDirection === "asc" ? ( // Check if the current field is sorted in ascending order
        <FaSortUp className="inline-block ml-1" /> // Render ascending icon
      ) : (
        <FaSortDown className="inline-block ml-1" /> // Render descending icon
      );
    }
    return <FaSort className="inline-block ml-1" />; // Render default sort icon
  };

  return (
    <Section>
      {handleArchiveBySelectedIds && ( // Render ArchiveButton if archiving function is provided
        <ArchiveButton
          onClick={() => handleArchiveBySelectedIds(selectedIds)} // Call the archiving function with selected IDs
        />
      )}
      <div className="flex justify-between items-center mb-4 mt-2">
        <Pagination
          totalPages={totalPages} // Total number of pages for pagination
          currentPage={currentPage} // Current active page
          setCurrentPage={handlePageChange} // Function to set the current page
          ITEMS_PER_PAGE_LISTS={ITEMS_PER_PAGE_LISTS} // Options for items per page
          totalItems={sortedData.length} // Total number of items
          handleItemsPerPageChange={handleItemsPerPageChange} // Function to change items per page
          handleNextPage={() => handlePageChange(currentPage + 1)} // Function to go to the next page
          handlePrevPage={() => handlePageChange(currentPage - 1)} // Function to go to the previous page
        />
        <div className="flex items-center gap-2">
          {/* Search */}
          {searchPlaceholder && ( // Render Search component if a placeholder is provided
            <Search
              placeholder={searchPlaceholder} // Search input placeholder
              searchTerm={term} // Current search term
              handleSearchChange={handleSearchChange} // Function to handle search input changes
            />
          )}
          {/* Filter */}
          <Filter
            isFilterOpen={isFilterOpen} // Current state of the filter dropdown
            setIsFilterOpen={setIsFilterOpen} // Function to set the filter dropdown state
            data={data} // Data for the filter component
            visibleColumns={visibleColumns} // Columns currently visible
            handleColumnVisibilityChange={handleColumnVisibilityChange} // Function to change column visibility
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          {/* Table structure */}
          <AdminCompaniesTableHead
            selectedIds={selectedIds} // Currently selected IDs for checkboxes
            handleSelectAllChange={handleSelectAllChange} // Function to handle "Select All" checkbox
            visibleColumns={visibleColumns} // Columns that are visible
            sortData={sortData} // Function to sort data
            renderSortIcon={renderSortIcon} // Function to render sorting icons
            paginatedData={paginatedData} // Data for the current page
            handleEdit={handleEdit} // Function to handle editing a user
            handleDelete={handleDelete} // Function to handle deleting a user
            handleView={handleView} // Function to handle viewing user details
            handleArchive={handleArchive} // Function to handle archiving a user
          />
          <AdminCompaniesTableBody
            paginatedData={paginatedData} // Data for the current page
            selectedIds={selectedIds} // Currently selected IDs for checkboxes
            handleCheckboxChange={handleCheckboxChange} // Function to handle checkbox changes
            visibleColumns={visibleColumns} // Columns that are visible
            handleArchive={handleArchive} // Function to handle archiving a user
            handleEdit={handleEdit} // Function to handle editing a user
            handleDelete={handleDelete} // Function to handle deleting a user
            handleView={handleView} // Function to handle viewing user details
            IDsIsLink={IDsIsLink} // Flag to determine if IDs should be displayed as links
          />
        </table>
      </div>
    </Section>
  );
};

export default AdminCompaniesTable; // Exporting the Table component for use in other parts of the application
