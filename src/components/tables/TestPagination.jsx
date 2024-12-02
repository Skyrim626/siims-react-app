import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Text from "../common/Text";
import { Button, Input } from "@headlessui/react";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  ITEMS_PER_PAGE_LISTS,
  itemsPerPage,
  totalItems,
  handleItemsPerPageChange,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3 text-sm">
        <Text>Page</Text>
        <div className="flex gap-1 items-stretch">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-2 text-sm bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            <FaChevronLeft />
          </Button>
          <Input
            className="py-1 px-3 text-sm text-gray-700 border-2 bg-white outline-none w-[50px] h-full text-center"
            type="text"
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
          />

          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-2 text-sm bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            <FaChevronRight />
          </Button>
          <div className="flex gap-1">
            <p className="my-auto">of {totalPages} | View</p>
            <select
              id="itemsPerPage"
              value={itemsPerPage} // Ensure this is bound to the itemsPerPage state
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))} // This will update the state with the selected value
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
    </div>
  );
};

export default Pagination;
