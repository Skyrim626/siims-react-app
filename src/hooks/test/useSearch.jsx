import React, { useState } from "react";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [triggerSearch, setTriggerSearch] = useState(false); // Flag to trigger search only once

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Trim to prevent accidental spaces
    setTriggerSearch(false); // Reset search trigger when the user changes input
  };

  // Handle Enter key press to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      setTriggerSearch(true); // Trigger search on Enter only if there's a search term
    }
  };

  return {
    searchTerm,
    triggerSearch,
    handleSearchChange,
    handleKeyDown,
  };
};

export default useSearch;
