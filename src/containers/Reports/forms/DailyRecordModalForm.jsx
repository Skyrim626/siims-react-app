import React from "react";
import Modal from "../../../components/modals/Modal";
import { Button, Field, Input, Label } from "@headlessui/react";
import Text from "../../../components/common/Text";

const DailyRecordModalForm = ({
  method = "post",
  formData,
  handleInputChange,
  isOpen,
  setIsOpen,
  addDailyTimeRecord,
  validationErrors = {},
}) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle="Daily Time Record Information"
      minWidth="min-w-[500px]"
    >
      <form method={method} onSubmit={addDailyTimeRecord}>
        <div className="flex items-center gap-3 justify-between">
          <div>
            <Field className="w-[400px]">
              <Label
                htmlFor="time_in"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time In:
              </Label>
              <Input
                type="time"
                id="time_in"
                name="time_in"
                value={formData.time_in}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </Field>
            {validationErrors.time_in && (
              <Text className="text-red-500">
                {validationErrors.time_in[0]}
              </Text>
            )}
          </div>

          <div>
            <Field className="w-[400px]">
              <Label
                htmlFor="time_out"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time Out:
              </Label>
              <Input
                type="time"
                id="time_out"
                name="time_out"
                value={formData.time_out}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </Field>

            {validationErrors.time_out && (
              <Text className="text-red-500">
                {validationErrors.time_out[0]}
              </Text>
            )}
          </div>
        </div>

        <div className="mt-3">
          <Field>
            <Label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date:
            </Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </Field>
        </div>

        <div className="mt-3">
          <Field>
            <Label
              htmlFor="hours_received"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Hours Received:
            </Label>
            <Input
              type="text"
              id="hours_received"
              name="hours_received"
              value={formData.hours_received} // Now gets the updated state value
              disabled
              className="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
            />
          </Field>
        </div>

        <div className="mt-3">
          <Button
            type="submit"
            className="w-full py-2 px-3 text-center bg-blue-500 hover:bg-blue-600 rounded-sm font-semibold text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DailyRecordModalForm;
