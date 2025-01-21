import { Select } from "@headlessui/react";
import React from "react";

const SelectDropDown = ({
  items = [],
  selectedStatus,
  setSelectedStatus,
  selectedURL,
  setSelectedURL,
}) => {
  const handleChange = (e) => {
    const selectedItem = items.find((item) => item.value === e.target.value);
    if (selectedItem) {
      // console.log(selectedItem.url);

      setSelectedStatus(selectedItem.value);
      setSelectedURL(selectedItem.url);
    }
  };

  return (
    <Select
      value={selectedStatus}
      onChange={handleChange}
      className="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectDropDown;
