import React from "react";
import { FileDown, FileUp, Plus, UserRoundPlus } from "lucide-react";
import { Button } from "@headlessui/react";
import Text from "./Text";

const ManageHeader = ({
  className = "mb-3",
  addPlaceholder = "Add new something...",
  isOpen,
  setIsOpen,
  showExportButton = true,
  showImportButton = true,
  showVerifyButton = false,
  showAddButton = true,
  showAllButtons = true,
  isImportOpen = false,
  setIsImportOpen = () => {},
  isVerifyOpen,
  setIsVerifyOpen,
}) => {
  return (
    <div className={`flex justify-end items-center ${className}`}>
      <div className="button-group | flex gap-2">
        {showAllButtons && (
          <>
            {showExportButton && (
              <Button className="transition text-sm px-3 py-1 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
                <FileUp size={15} />
                <Text>Export</Text>
              </Button>
            )}

            {showVerifyButton && (
              <Button
                onClick={() => {
                  setIsVerifyOpen(!isVerifyOpen);
                }}
                className="transition text-sm px-3 py-1 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white"
              >
                <FileDown size={15} />
                <Text>Verify Student</Text>
              </Button>
            )}

            {showImportButton && (
              <Button
                onClick={() => {
                  setIsImportOpen(!isImportOpen);
                }}
                className="transition text-sm px-3 py-1 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white"
              >
                <FileDown size={15} />
                <Text>Import</Text>
              </Button>
            )}
            {showAddButton && (
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition text-sm py-2 px-3 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent ${
                  isOpen ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                <Plus size={20} />
                <Text>{addPlaceholder}</Text>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageHeader;
