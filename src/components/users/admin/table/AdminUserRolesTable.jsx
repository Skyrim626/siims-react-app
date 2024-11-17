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
import TableHead from "../../../tables/TableHead";
import TableShowResult from "../../../tables/TableShowResult";
import Section from "../../../common/Section";
import AdminUserRolesTableBody from "./AdminUserRolesTableBody";
import AdminUserRolesTableHead from "./AdminUserRolesTableHead";

const AdminUserRolesTable = ({
  data,
  searchPlaceholder = "Search something...",
  handleArchiveBySelectedIds,
  handleArchive,
  handleEdit,
  handleDelete,
  handleView,

  ITEMS_PER_PAGE_LISTS = [
    { value: 25 },
    { value: 50 },
    { value: 100 },
    { value: 250 },
    { value: 500 },
  ],
}) => {
  // Search hook
  const { term, filteredData, handleSearchChange } = useSearch(data, "");

  // Sorting hook
  const { sortedData, sortData, sortField, sortDirection } =
    useSort(filteredData);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedData,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(sortedData, ITEMS_PER_PAGE_LISTS[0].value);

  // Checkbox selection hook
  const { selectedIds, handleCheckboxChange, handleSelectAllChange } =
    useCheckboxSelection(paginatedData);

  // Column visibility hook
  const { visibleColumns, handleColumnVisibilityChange } =
    useColumnVisibility(data);

  // Filter Toggle States
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Dropdown for filters

  // Render sorting icon
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

  return (
    <Section>
      {handleArchiveBySelectedIds && (
        <ArchiveButton
          onClick={() => handleArchiveBySelectedIds(selectedIds)}
        />
      )}
      <div className="flex justify-between items-center mb-4 mt-2">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={handlePageChange} // or setCurrentPage if you have that handler in your state
          ITEMS_PER_PAGE_LISTS={ITEMS_PER_PAGE_LISTS} // make sure to pass the itemsPerPage value
          totalItems={sortedData.length} // pass the total number of items
          handleItemsPerPageChange={handleItemsPerPageChange}
          handleNextPage={() => handlePageChange(currentPage + 1)} // go to next page
          handlePrevPage={() => handlePageChange(currentPage - 1)} // go to previous page
        />
        <div className="flex items-center gap-2">
          {/* Search */}
          {searchPlaceholder && (
            <Search
              placeholder={searchPlaceholder}
              searchTerm={term}
              handleSearchChange={handleSearchChange}
            />
          )}
          {/* Filter */}
          <Filter
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            data={data}
            visibleColumns={visibleColumns}
            handleColumnVisibilityChange={handleColumnVisibilityChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <AdminUserRolesTableHead
            selectedIds={selectedIds}
            handleSelectAllChange={handleSelectAllChange}
            visibleColumns={visibleColumns}
            sortData={sortData}
            renderSortIcon={renderSortIcon}
            paginatedData={paginatedData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
          />
          <AdminUserRolesTableBody
            paginatedData={paginatedData}
            selectedIds={selectedIds}
            handleCheckboxChange={handleCheckboxChange}
            visibleColumns={visibleColumns}
            handleArchive={handleArchive}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
          />
        </table>
      </div>
      <TableShowResult startIndex={startIndex} endIndex={endIndex} />
    </Section>
  );
};

export default AdminUserRolesTable;
