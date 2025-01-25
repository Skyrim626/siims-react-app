import React from "react";
import { Button } from "@headlessui/react";
import {
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Dialog,
} from "@headlessui/react";
import { Delete, Trash2 } from "lucide-react";
import ModalDialog from "./ModalDialog";

const DeleteConfirmModal = ({ open, setOpen, handleDelete }) => {
  return (
    <>
      <ModalDialog
        open={open}
        setOpen={setOpen}
        iconBgColor={"bg-red-100"}
        icon={<Trash2 size={20} className="text-red-600" />}
        title={"Delete Endorsement Request"}
        description={
          "Are you sure you want to delete an endorsement letter request? This action cannot be undone."
        }
      >
        <Button
          type="button"
          onClick={handleDelete}
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Delete
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
    </>
  );
};

export default DeleteConfirmModal;
