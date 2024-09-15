// Libraries
import React from "react";

// Button Component
import { Button } from "@headlessui/react";

// Icons
import { FaArchive } from "react-icons/fa";

// Part of the Table Component
const ArchiveButton = ({ onClick = () => {}, disabled = false }) => {
  return (
    <div className="flex">
      <Button
        onClick={onClick}
        className={`flex items-center gap-1 p-2 rounded-full text-sm text-white font-bold ${
          disabled
            ? "bg-gray-400"
            : "bg-indigo-500 transition hover:bg-indigo-600"
        }`}
      >
        <FaArchive size={20} />
        Archive
      </Button>
    </div>
  );
};

export default ArchiveButton;
