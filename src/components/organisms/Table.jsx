import React, { useState } from "react";
import Button from "../atoms/Button";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Trash2,
} from "lucide-react";
import Input from "../atoms/Input";

export default function Table({
  data,
  filterLabels = [],
  enableFilterDropDown = false,
  enableMarkApprove = false,
  enableMarkDelete = false,
  enableSearch = false,
}) {
  // States for filters
  const [filter, setFilter] = useState("All");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [visibleAttributes, setVisibleAttributes] = useState(
    new Set(Object.keys(data[0] || {}))
  );

  // States for Search
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Toggle visibility of attributes
  const handleAttributeToggle = (attr) => {
    setVisibleAttributes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(attr)) {
        newSet.delete(attr);
      } else {
        newSet.add(attr);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="py-4">
        {/* Enable filter if the filterLabel has values */}
        {filterLabels && (
          <div className="flex space-x-4">
            {filterLabels.map((filterLabel, index) => {
              // TODO: Add functionality for filter button
              return (
                <Button
                  key={index}
                  onClick={() => {}}
                  className={`px-4 py-2 text-gray-900 border-b-2 ${
                    filter === filterLabel
                      ? "  border-blue-600 text-blue-500 font-semibold"
                      : " hover:border-gray-900 transition"
                  }`}
                >
                  {filterLabel}
                </Button>
              );
            })}
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <div className="button-group | flex items-center gap-2">
            {/*  Enable Mark Approve if the prop enableMarkApprove is true */}
            {enableMarkApprove && (
              <Button className="bg-gray-900 font-semibold rounded-full p-2 text-sm flex items-center gap-2">
                <CheckCircle2
                  size={20}
                  className="text-green-400 hover:text-green-500"
                />
                <p className="text-gray-100 hover:text-white">
                  Mark as approved
                </p>
              </Button>
            )}

            {/* Enable Mark Delete if the prop enableMarkDelete is true */}
            {enableMarkDelete && (
              <Button className="bg-gray-900 font-semibold rounded-full p-2 text-sm flex items-center gap-2">
                <Trash2 size={20} className="text-red-500 hover:text-red-600" />
                <p className="text-gray-100 hover:text-white">Delete</p>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Search Component */}
            {/* Enable Search if the enableSearch is true */}
            {enableSearch && (
              <div className="flex items-center border px-3 rounded-full border-blue-950 bg-white">
                <Search size={20} />
                <Input
                  type="text"
                  placeholder="Search for items"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full py-3 ml-2 pl-3 outline-none"
                />
              </div>
            )}

            {/* Enable filter drop down if prop enableFilterDropDown is true */}
            {enableFilterDropDown && (
              <div className="relative">
                <Button
                  className="flex items-center bg-gray-900 text-white rounded-full p-2 text-sm"
                  onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                >
                  Filter{" "}
                  <span className="ml-2">
                    {isFilterDropdownOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </Button>
                {isFilterDropdownOpen && (
                  <div className="absolute mt-2 bg-white border rounded shadow-lg z-10 right-0">
                    <div className="p-4 py-2">
                      <div className="flex flex-col">
                        {Object.keys(data[0] || {}).map((key) => {
                          return (
                            <label
                              key={key}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={visibleAttributes.has(key)}
                                onChange={() => handleAttributeToggle(key)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                              <span>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg"></div>
    </>
  );
}
