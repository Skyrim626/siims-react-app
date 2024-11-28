// Libraries
import React from "react";

// Button Component
import { Button } from "@headlessui/react";

// Icons
import { CheckCircle } from "lucide-react";

// Approve Endorsement Letter Button
const ApproveEndorsementLetter = ({ onClick = () => {}, disabled = false }) => {
  return (
    <div className="flex">
      <Button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
          disabled
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600 transition"
        }`}
      >
        <CheckCircle className="w-5 h-5" />
        Approve Endorsement Letter
      </Button>
    </div>
  );
};

export default ApproveEndorsementLetter;
