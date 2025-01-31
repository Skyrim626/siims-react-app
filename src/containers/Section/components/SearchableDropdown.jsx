import { Button, Input } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

const SearchableDropdown = ({
  items = [],
  selectedItem,
  setSelectedItem,
  isOpen,
  setIsOpen,
  searchTerm = "", // Default value for searchTerm
  setSearchTerm,
  placeholder = "Search Something...",
  onSearchSubmit,
}) => {
  // Add "All" as the first item with id set to null
  const updatedItems = [
    { id: null, name: "All" },
    { id: "no-sections", name: "No Sections" },
    ...items,
  ];

  // If no selectedItem, default to "All"
  const displaySelectedItem = selectedItem?.name || "All";

  return (
    <div className="relative w-64">
      {/* Dropdown button */}
      <Button
        className="bg-white w-full px-4 py-2 flex items-center justify-between border-2 border-gray-300 rounded-md shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displaySelectedItem}</span>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </Button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search input */}
          <Input
            type="text"
            className="w-full px-4 py-2 text-sm border-b border-gray-200 focus:outline-none"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearchSubmit(); // Trigger the search on Enter
              }
            }}
          />

          {/* Items */}
          <ul className="max-h-40 overflow-y-auto">
            {updatedItems.length > 0 ? (
              updatedItems
                .filter((item) =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedItem(item); // Update the selected section
                      setIsOpen(false); // Close the dropdown
                    }}
                  >
                    {item.name}
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
