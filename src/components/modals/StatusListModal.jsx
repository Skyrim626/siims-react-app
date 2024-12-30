import { Button, Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import React from "react";
import { getTimeRecordStatusColor } from "../../utils/statusColor";

const StatusListModal = ({
  title,
  isOpen,
  setIsOpen,
  statusLists = [],
  getStatusColor = () => {},
}) => {
  return (
    <>
      {/* Status List Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Centered container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* Modal Panel */}
          <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <Dialog.Title className=" text-lg font-semibold text-gray-800">
                {title}
              </Dialog.Title>
              <Button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" /> {/* Lucide close icon */}
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {statusLists.map((status, index) => {
                const { textColor, backgroundColor } = getStatusColor(
                  status.name
                );

                return (
                  <div
                    key={index}
                    className="rounded-lg p-4 border border-gray-200 bg-gray-50"
                  >
                    <h3
                      className={`rounded-full px-3 text-base font-semibold ${textColor} ${backgroundColor}`}
                    >
                      {status.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {status.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-200 p-4">
              <Button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Close
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default StatusListModal;
