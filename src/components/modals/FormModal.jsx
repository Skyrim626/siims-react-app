import { AnimatePresence } from "framer-motion";
import React from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const FormModal = ({
  isOpen,
  setIsOpen,
  modalTitle = "Add Something",
  children,
  onSubmit,
  minWidth = "",
  maxWidth = "", // Default to a larger max-width
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
                className={`max-w-5xl space-y-4 bg-gray-100 ${minWidth}`}
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

                <div className="px-8 pb-4">
                  {/* Children here */}
                  <form onSubmit={onSubmit}>
                    {children}

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
                        onClick={onSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default FormModal;
