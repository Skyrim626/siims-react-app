import React from "react";
import ModalDialog from "./ModalDialog";
import { Check } from "lucide-react";
import { Button } from "@headlessui/react";

const RestoreConfirmModal = ({ open, setOpen, handleRestore }) => {
  return (
    <ModalDialog
      open={open}
      setOpen={setOpen}
      iconBgColor={"bg-green-200"}
      icon={<Check size={20} className="text-green-600" />}
      title={"Restore Deleted Endorsement Request"}
      description={
        "Are you sure you want to restore deleted an endorsement letter request?"
      }
    >
      <Button
        type="button"
        onClick={handleRestore}
        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
      >
        Restore
      </Button>

      <Button
        type="button"
        data-autofocus
        onClick={() => setOpen(false)}
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
      >
        Cancel
      </Button>
    </ModalDialog>
  );
};

export default RestoreConfirmModal;
