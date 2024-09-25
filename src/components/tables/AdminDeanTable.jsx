import React, { useState } from "react";
import Section from "../common/Section";
import ArchiveButton from "./ArchiveButton";
import Pagination from "./Pagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableShowResult from "./TableShowResult";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import usePagination from "../../hooks/usePagination";
import useCheckboxSelection from "../../hooks/useCheckboxSelection";
import useSort from "../../hooks/useSort";
import useSearch from "../../hooks/useSearch";
import useColumnVisibility from "../../hooks/useColumnVisibility";
import Search from "./Search";
import Filter from "./Filter";
import { Select } from "@headlessui/react";

const AdminDeanTable = ({
  data,
  handleArchive,
  handleArchiveBySelectedIds,
  handleEdit,
  collegesForFilter,
  ITEMS_PER_PAGE_LISTS = [
    { value: 25 },
    { value: 50 },
    { value: 100 },
    { value: 250 },
    { value: 500 },
  ],
}) => {
  // State for selected college filter
  const [selectedCollege, setSelectedCollege] = useState("");

  // Search hook
  const { term, filteredData, handleSearchChange } = useSearch(data, "");

  // Filtered by college
  const filteredByCollege = selectedCollege
    ? filteredData.filter((item) => {
        // console.log(selectedCollege);
        return item.college_assigned === selectedCollege;
      })
    : filteredData;

  // Sorting hook
  const { sortedData, sortData, sortField, sortDirection } =
    useSort(filteredByCollege);

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

  // Handle college filter change
  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
  };

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
      {/* Filter by College */}
      <div className="mb-2">
        <Select
          className="px-4 py-2 outline-none text-sm cursor-pointer rounded-sm border-blue-500 border max-w-[150px]"
          value={selectedCollege}
          onChange={handleCollegeChange}
        >
          <option value="">--All Colleges--</option>
          {collegesForFilter.map((college) => (
            <option key={college["id"]} value={college.name}>
              {college.name}
            </option>
          ))}
        </Select>
      </div>
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
          <Search
            placeholder="Search dean..."
            searchTerm={term}
            handleSearchChange={handleSearchChange}
          />
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
          <TableHead
            selectedIds={selectedIds}
            handleSelectAllChange={handleSelectAllChange}
            visibleColumns={visibleColumns}
            sortData={sortData}
            renderSortIcon={renderSortIcon}
            paginatedData={paginatedData}
          />
          <TableBody
            paginatedData={paginatedData}
            selectedIds={selectedIds}
            handleCheckboxChange={handleCheckboxChange}
            visibleColumns={visibleColumns}
            handleArchive={handleArchive}
            handleEdit={handleEdit}
          />
        </table>
      </div>

      <TableShowResult startIndex={startIndex} endIndex={endIndex} />
    </Section>
  );
};

export default AdminDeanTable;
