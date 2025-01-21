"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from "../../../../components/modals/Modal";
import Text from "../../../../components/common/Text";

export default function DeleteConfirmModal({
  open,
  setOpen,
  handleDelete,
  minWidth = "",
  maxWidth = "",
}) {
  return (
    <>
      <Modal
        isOpen={open}
        setIsOpen={setOpen}
        modalTitle="Delete Document Type"
        minWidth={minWidth}
        maxWidth={maxWidth}
      >
        <div className="mt-2">
          <Text className="text-sm text-gray-500">
            Are you sure you want to archive a document type?
          </Text>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <Button
            type="button"
            onClick={handleDelete}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Delete
          </Button>
          <Button
            type="button"
            data-autofocus
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
