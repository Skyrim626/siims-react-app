import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Button from "../common/Button";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  setIsOpen,
  modalTitle = "Enter Info Here",
  minWidth = "",
  maxWidth = "", // Default to a larger max-width
  children,
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

                <div className="px-8 pb-4">{children}</div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
