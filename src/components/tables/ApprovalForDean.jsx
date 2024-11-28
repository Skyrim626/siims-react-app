// Libraries
import React from "react";

// Button Component
import { Button } from "@headlessui/react";

// Icons
import { CheckCircle } from "lucide-react";

// Mark for Approval of Dean Button
const ApprovalForDean = ({ onClick = () => {}, disabled = false }) => {
  return (
    <div className="flex">
      <Button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
          disabled
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 transition"
        }`}
      >
        <CheckCircle className="w-5 h-5" />
        Mark for Approval of Dean
      </Button>
    </div>
  );
};

export default ApprovalForDean;
