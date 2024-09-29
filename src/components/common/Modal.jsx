import React from "react";
import { motion } from "framer-motion";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

const Modal = ({
  modalTitle = "Create User",
  children,
  modalType = "form",
  handleSubmit = () => console.log("Testing"),
  isOpen,
  setIsOpen,
  modalWidth = "",
}) => {
  return (
    <Dialog
      static
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30"
      />

      <div className="fixed inset-0 w-screen overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`max-w-4xl space-y-4 bg-gray-100 ${modalWidth}`}
          >
            <div className="px-8 py-5 bg-blue-800 flex items-center justify-between">
              <DialogTitle className="text-md text-white font-bold">
                {modalTitle}
              </DialogTitle>
              <Button
                className="text-blue-950 transition duration-100 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </Button>
            </div>

            {/* Children here */}
            <div className="px-8 pb-4">
              {modalType === "form" && (
                <>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {children}
                  </form>

                  {/* Close and Submit  */}
                  <div className="flex justify-end items-end mt-3 gap-2">
                    <Button
                      type="button"
                      className="py-2 px-4 text-sm rounded-sm font-bold text-white transition duration-300 bg-gray-500 hover:bg-gray-600 "
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      type="button"
                      className="py-2 px-4 text-sm rounded-sm font-bold text-white transition duration-300 bg-blue-600 hover:bg-blue-700"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
