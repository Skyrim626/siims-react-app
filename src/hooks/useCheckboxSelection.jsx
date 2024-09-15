import { useState } from "react";

const useCheckboxSelection = (paginatedData) => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleCheckboxChange = (id) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };

  const handleSelectAllChange = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
    } else {
      const newSelectedIds = new Set(paginatedData.map((item) => item.id));
      setSelectedIds(newSelectedIds);
    }
  };

  return { selectedIds, handleCheckboxChange, handleSelectAllChange };
};

export default useCheckboxSelection;
