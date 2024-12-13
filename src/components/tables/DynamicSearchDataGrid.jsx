import React from "react";
import Text from "../common/Text";
import { Pagination } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Input } from "@headlessui/react";

const DynamicSearchDataGrid = ({
  totalCount,
  paginationModel,
  handlePaginationModelChange,
  searchInput,

  handleSearchInputChange,
  handleSearchKeyDown,
}) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      {/* Pagination */}
      <div className="flex items-center space-x-3">
        <Text className="font-semibold">Page</Text>

        <Pagination
          count={Math.ceil(totalCount / paginationModel.pageSize)} // Calculate number of pages
          page={paginationModel.page + 1} // Pagination uses 1-based index
          onChange={(event, page) =>
            handlePaginationModelChange({
              ...paginationModel,
              page: page - 1,
            })
          } // Handle page change
          shape="rounded"
          variant="outlined"
        />
      </div>

      <div className="p-2 w-[300px] rounded-full border border-blue-950 flex items-center space-x-3 bg-white">
        <Search size={20} />
        <Input
          type="text"
          placeholder="Search Document Types"
          value={searchInput}
          onChange={handleSearchInputChange} // Update input field only
          className={"bg-transparent w-full outline-none"}
          onKeyDown={handleSearchKeyDown} // Trigger search on Enter key press
        />
      </div>
    </div>
  );
};

export default DynamicSearchDataGrid;
