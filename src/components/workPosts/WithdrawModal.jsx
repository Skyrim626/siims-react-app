import { Button, Dialog } from "@headlessui/react";
import React from "react";

const WithdrawModal = ({
  isWithdrawModalOpen,
  setIsWithdrawalModalOpen,
  handleConfirmWithdraw,
}) => {
  return (
    <Dialog
      open={isWithdrawModalOpen}
      onClose={() => setIsWithdrawalModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300"
    >
      <Dialog.Panel className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full">
        <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
          Confirm Application
        </Dialog.Title>
        <Dialog.Description className="text-gray-700 mb-6">
          Are you sure you want to withdraw from this job? This action cannot be
          undone.
        </Dialog.Description>
        <div className="flex justify-end gap-4">
          <Button
            onClick={handleConfirmWithdraw}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Yes
          </Button>
          <Button
            onClick={() => setIsWithdrawalModalOpen(false)}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            No
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default WithdrawModal;
