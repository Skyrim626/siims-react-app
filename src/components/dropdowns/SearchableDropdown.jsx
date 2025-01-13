import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SearchableDropdown = () => {
  const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ];

  // Set default value for selectedItem
  const [selectedItem, setSelectedItem] = useState(items[0]); // Default value is "Apple"
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    setSearchTerm(""); // Clear the search term
  };

  return (
    <div className="relative w-64">
      {/* Dropdown button */}
      <button
        className="bg-white w-full px-4 py-2 flex items-center justify-between border-2 border-gray-300 rounded-md shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedItem || "Select an item"}</span>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search input */}
          <input
            type="text"
            className="w-full px-4 py-2 text-sm border-b border-gray-200 focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Items */}
          <ul className="max-h-40 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                No items found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
