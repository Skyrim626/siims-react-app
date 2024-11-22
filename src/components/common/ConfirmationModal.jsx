import { Button } from "@headlessui/react";
import React from "react";

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-sm mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={onCancel}
            className="py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </Button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
