// Libraries
import React from "react";

// Button Component
import { Button } from "@headlessui/react";

// Icons
import { UserCheck } from "lucide-react";

// Ready to Deployment Button
const ReadyToDeployButton = ({ onClick = () => {}, disabled = false }) => {
  return (
    <div className="flex">
      <Button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
          disabled
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-yellow-500 text-white hover:bg-yellow-600 transition"
        }`}
      >
        <UserCheck className="w-5 h-5" />
        Ready for Deployment
      </Button>
    </div>
  );
};

export default ReadyToDeployButton;
