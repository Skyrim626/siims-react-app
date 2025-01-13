import React, { useState } from "react";
import SearchableDropdown from "./SearchableDropdown";

const SectionsDropdown = () => {
  // Container state
  const [sections, setSections] = useState([]);

  return <SearchableDropdown />;
};

export default SectionsDropdown;
