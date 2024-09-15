import React from "react";
import { motion } from "framer-motion";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

const Modal = ({ isOpen, setIsOpen, modalTitle = "Create User", children }) => {
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
            className="max-w-4xl space-y-4 bg-gray-100"
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
            <div className="px-8 pb-4">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
