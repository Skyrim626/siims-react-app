import { Input } from "@headlessui/react";
import React from "react";

const TableHead = ({
  selectedIds,
  paginatedData,
  handleSelectAllChange,
  visibleColumns,
  sortData,
  renderSortIcon,
  handleEdit,
  handleDelete,
  handleView,
  handleArchive,
  includeCheckboxes,
}) => {
  return (
    <thead>
      <tr>
        <th className="py-2 px-4 border-b bg-gray-800 text-white">#</th>
        {includeCheckboxes && (
          <th className="py-2 px-4 border-b bg-gray-800 text-white">
            <Input
              type="checkbox"
              checked={selectedIds.size === paginatedData.length}
              onChange={handleSelectAllChange}
              className="form-checkbox"
            />
          </th>
        )}

        <th className="py-2 px-4 border-b bg-gray-800 text-white">ID</th>
        {visibleColumns.map((column) => {
          return (
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
          );
        })}
        {(handleEdit || handleDelete || handleView || handleArchive) && (
          <th className="py-2 px-4 border-b bg-gray-800 text-white">Actions</th>
        )}
      </tr>
    </thead>
  );
};

export default TableHead;
