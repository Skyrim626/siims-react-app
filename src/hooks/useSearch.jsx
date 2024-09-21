import { useState } from "react";

const useSearch = (data = [], searchTerm) => {
  const [term, setTerm] = useState(searchTerm || "");

  const handleSearchChange = (event) => {
    setTerm(event.target.value);
  };

  const filteredData = data.filter((xData) =>
    Object.values(xData).some(
      (value) =>
        (typeof value === "string" &&
          value.toLowerCase().includes(term.toLowerCase())) ||
        (typeof value === "number" && value.toString().includes(term))
    )
  );

  return { term, filteredData, handleSearchChange };
};

export default useSearch;
