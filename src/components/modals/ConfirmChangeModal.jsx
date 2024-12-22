import { Button, Dialog } from "@headlessui/react";
import { TriangleAlert } from "lucide-react";

export default function ConfirmChangeModal({
  open,
  setOpen,
  handleConfirm,
  title = "Change Something Logo",
  message = "Are you sure you want to change the someone? This action will update the someone immediately.",
  icon = (
    <TriangleAlert aria-hidden="true" className="h-6 w-6 text-yellow-600" />
  ),
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />
      {/* Modal */}
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                {icon}
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
            <Button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
