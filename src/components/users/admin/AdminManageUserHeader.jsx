import React from "react";
import Button from "../../common/Button";
import { FileDown, FileUp, UserRoundPlus } from "lucide-react";

const AdminManageHeader = ({
  addPlaceholder = "Add new something...",
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="flex justify-end items-center">
      <div className="button-group | flex gap-2">
        <Button className="transition text-sm px-3 py-1 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
          <FileUp size={15} />
          <p>Export</p>
        </Button>
        <Button className="transition text-sm px-3 py-1 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
          <FileDown size={15} />
          <p>Import</p>
        </Button>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`transition text-sm py-1 px-3 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent ${
            isOpen ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <UserRoundPlus size={15} />
          <p>{addPlaceholder}</p>
        </Button>
      </div>
    </div>
  );
};

export default AdminManageHeader;
