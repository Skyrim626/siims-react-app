import { Input } from "@headlessui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({
  searchTerm,
  handleSearchChange,
  placeholder = "Search something...",
  handleKeyDown,
}) => {
  return (
    <div className="flex items-center gap-2 text-sm px-2 py-2 rounded-full border border-blue-950 bg-white">
      <FaSearch />
      <Input
        type="text"
        placeholder={placeholder}
        className="outline-none text-sm bg-transparent"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
