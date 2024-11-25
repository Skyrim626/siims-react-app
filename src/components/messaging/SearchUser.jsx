import { Input } from "@headlessui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchUser = ({ searchUser, handleSearch, setSearchInput }) => {
  return (
    <div className="relative w-full flex items-center mb-4">
      <FaSearch className="absolute left-2 text-gray-500" />
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value) {
            searchUser(); // Cal the search function
          }
        }}
        className="w-full pl-8 py-2 border border-black rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default SearchUser;
