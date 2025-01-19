import { Select } from "@headlessui/react";
import React from "react";

const StatusDropdown = ({
  selectedStatus,
  setSelectedStatus,
  options = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "archived",
      name: "Archived",
    },
  ],
}) => {
  return (
    <Select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {options.length > 0 &&
        options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
    </Select>
  );
};

export default StatusDropdown;
