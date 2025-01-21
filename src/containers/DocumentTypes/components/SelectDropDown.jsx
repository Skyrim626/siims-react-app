import { Select } from "@headlessui/react";
import React from "react";

const SelectDropDown = ({ selectedStatus, setSelectedStatus }) => {
  return (
    <Select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value={"all"}>All</option>
      <option value={"archived"}>Archived</option>
    </Select>
  );
};

export default SelectDropDown;
