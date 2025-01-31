import React from "react";
import Modal from "../../../components/modals/Modal";
import { Button, Field, Input, Label } from "@headlessui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Text from "../../../components/common/Text";

const WeeklyRecordModalForm = ({
  method = "post",
  formData = {},
  handleInputChange,
  isOpen,
  setIsOpen,
  errors,
  onSubmit,
  validationErrors = {},
}) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle="Weekly Time Record Information"
      minWidth="min-w-[500px]"
    >
      <form method={method} onSubmit={onSubmit}>
        <div>
          <Field className="flex-1">
            <Label
              htmlFor="week_number"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Week Number <span className="text-red-500 text-lg">*</span>
            </Label>
            <Input
              type="number"
              id="week_number"
              name="week_number"
              value={formData.week_number}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1"
              required
            />
          </Field>
          {validationErrors.week_number && (
            <Text className="text-red-500">
              {validationErrors.week_number[0]}
            </Text>
          )}
        </div>

        <div className="flex items-center gap-3 justify-between mt-3">
          <div>
            <Field className="w-[400px]">
              <Label
                htmlFor="start_date"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Start Date <span className="text-red-500 text-lg">*</span>
              </Label>
              <Input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </Field>
            {validationErrors.start_date && (
              <Text className="text-red-500">
                {validationErrors.start_date[0]}
              </Text>
            )}
          </div>

          <div>
            <Field className="w-[400px]">
              <Label
                htmlFor="end_date"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                End Date <span className="text-red-500 text-lg">*</span>
              </Label>
              <Input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </Field>
            {validationErrors.end_date && (
              <Text className="text-red-500">
                {validationErrors.end_date[0]}
              </Text>
            )}
          </div>
        </div>

        {/* Tasks Input */}
        <Field className="mt-4">
          <Label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
            Tasks <span className="text-red-500 text-lg">*</span>
          </Label>
          <ReactQuill
            theme="snow"
            value={formData.tasks}
            onChange={(value) =>
              handleInputChange({ target: { name: "tasks", value } })
            }
            className="bg-white dark:bg-gray-800"
          />
          {validationErrors.tasks && (
            <Text className="text-red-500 text-sm mt-1">
              {validationErrors.tasks[0]}
            </Text>
          )}
        </Field>

        {/* Learnings Input */}
        <Field className="mt-4">
          <Label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
            Learnings <span className="text-red-500 text-lg">*</span>
          </Label>
          <ReactQuill
            theme="snow"
            value={formData.learnings}
            onChange={(value) =>
              handleInputChange({ target: { name: "learnings", value } })
            }
            className="bg-white dark:bg-gray-800"
          />
          {validationErrors.learnings && (
            <Text className="text-red-500 text-sm mt-1">
              {validationErrors.learnings[0]}
            </Text>
          )}
        </Field>

        <div>
          <Field className="flex-1">
            <Label
              htmlFor="no_of_hours"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Number of Hours <span className="text-red-500 text-lg">*</span>
            </Label>
            <Input
              type="number"
              id="no_of_hours"
              name="no_of_hours"
              value={formData.no_of_hours}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1"
              required
            />
          </Field>
          {validationErrors.no_of_hours && (
            <Text className="text-red-500">
              {validationErrors.no_of_hours[0]}
            </Text>
          )}
        </div>

        <div className="mt-3">
          <Button
            type={"submit"}
            className="w-full text-center bg-blue-500 hover:bg-blue-600 transition rounded-sm text-white font-semibold py-2 px-3"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default WeeklyRecordModalForm;
