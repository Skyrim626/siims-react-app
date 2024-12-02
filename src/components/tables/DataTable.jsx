import { useState } from "react";
import useColumnVisibility from "../../hooks/useColumnVisibility";
import usePagination from "../../hooks/usePagination";
import useSearch from "../../hooks/useSearch";
import useSort from "../../hooks/useSort";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import Pagination from "../tables/Pagination";
import Search from "../tables/Search";
import Filter from "../tables/Filter";
import TableHead from "../tables/TableHead";
import TableShowResult from "../tables/TableShowResult";
import Section from "../common/Section";
import TableBody from "./TableBody";
import useCheckboxSelection from "../../hooks/useCheckboxSelection";
import ArchiveButton from "./ArchiveButton";
import DeployStudentButton from "./DeployStudentButton";
import AssignStudentButton from "./AssignStudentButton";
import ApprovalForDean from "./ApprovalForDean";
import ApproveEndorsementLetter from "./ApproveEndorsementLetter ";
import ReadyToDeployButton from "./ReadyToDeployButton";

const DataTable = ({
  data,

  handleArchiveBySelectedIds,
  handleDeployBySelectedIds,
  handleAssignToCoordinatorsBySelectedIds,
  includeCheckboxes = true,
  handleArchive,
  handleEdit,
  handleDelete,
  handleView,
  handleApprovalForDean,
  handleApprovedLetter,
  handleReadyToDeployBySelectedIds,
  openModal,

  /* Search */
  searchTerm,
  searchPlaceholder = "Search something...",
  handleSearchChange,
  handleKeyDown,

  /* Pagination */
  totalPages,
  currentPage,
  setCurrentPage,
  ITEMS_PER_PAGE_LISTS = [{ value: 5 }, { value: 25 }, { value: 50 }],
  itemsPerPage,
  totalItems,
  handleItemsPerPageChange,
  handleNextPage,
  handlePrevPage,
}) => {
  // console.log(data);

  // Sorting hook
  const { sortedData, sortData, sortField, sortDirection } = useSort(data);

  // Checkbox selection hook
  const { selectedIds, handleCheckboxChange, handleSelectAllChange } =
    useCheckboxSelection(sortedData);

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
          disabled={selectedIds.size === 0}
        />
      )}
      {handleDeployBySelectedIds && (
        <DeployStudentButton
          onClick={() => handleDeployBySelectedIds(selectedIds)}
          disabled={selectedIds.size === 0}
        />
      )}
      {handleReadyToDeployBySelectedIds && (
        <ReadyToDeployButton
          onClick={() => handleReadyToDeployBySelectedIds(selectedIds)}
          disabled={selectedIds.size === 0}
        />
      )}
      {handleAssignToCoordinatorsBySelectedIds && (
        <AssignStudentButton
          onClick={() => handleAssignToCoordinatorsBySelectedIds(selectedIds)}
          disabled={selectedIds.size === 0}
        />
      )}
      {handleApprovalForDean && (
        <ApprovalForDean
          onClick={() => handleApprovalForDean(selectedIds)}
          disabled={selectedIds.size === 0}
        />
      )}

      {handleApprovedLetter && (
        <ApproveEndorsementLetter
          onClick={() => handleApprovedLetter(selectedIds)}
          disabled={selectedIds.size === 0}
        />
      )}

      <div className="flex justify-between items-center mb-4 mt-2">
        {/* Pagination */}

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
          {/* Search */}
          {searchPlaceholder && (
            <Search
              placeholder={searchPlaceholder}
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              onKeyDown={handleKeyDown} // Add keydown event listener
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
          <TableHead
            selectedIds={selectedIds}
            handleSelectAllChange={handleSelectAllChange}
            visibleColumns={visibleColumns}
            sortData={sortData}
            renderSortIcon={renderSortIcon}
            paginatedData={sortedData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
            includeCheckboxes={includeCheckboxes}
          />
          <TableBody
            paginatedData={sortedData}
            selectedIds={selectedIds}
            handleCheckboxChange={handleCheckboxChange}
            visibleColumns={visibleColumns}
            handleArchive={handleArchive}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
            includeCheckboxes={includeCheckboxes}
            openModal={openModal}
          />
        </table>
      </div>
    </Section>
  );
};

export default DataTable;
