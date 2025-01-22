import { Button, Select } from "@headlessui/react";
import React from "react";

const ImportAssignCoordinators = ({
  selectedCoordinatorID,
  setSelectedCoordinatorID,
  coordinators = [],
  selectedProgramID,
  setSelectedProgramID,
  programs = [],
  handleFileChange,
  file,
  handleModalClose,
  handleSubmit,
}) => {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div>
          <p className="text-sm font-semibold">Coordinators</p>

          <Select
            value={selectedCoordinatorID}
            onChange={(e) => setSelectedCoordinatorID(e.target.value)}
            className="mt-1 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""}>-Select Coordinator-</option>
            {coordinators.map((coordinator) => (
              <option key={coordinator.id} value={coordinator.id}>
                {coordinator.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <p className="text-sm font-semibold">Programs</p>

          <Select
            value={selectedProgramID}
            onChange={(e) => setSelectedProgramID(e.target.value)}
            className="mt-1 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""}>-Select Program-</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-3">
        Upload a file to import student data and assign coordinators.
      </p>

      <div className="mb-4">
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
        />
        {file && (
          <p className="text-sm text-green-600 mt-2">
            Selected file: {file.name}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleModalClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className={`${
            file || status === "AddNewStudent"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          } text-white px-4 py-2 rounded-full`}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default ImportAssignCoordinators;
