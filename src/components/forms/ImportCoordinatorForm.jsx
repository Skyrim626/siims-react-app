import React, { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Input, Select } from "@headlessui/react";

const ImportCoordinatorForm = ({
  file,
  setFileType,
  status,
  setStatus,
  handleFileChange,
  programs,
  programId,
  setProgramId,
  requiredFields = {
    programId: true,
  },
  withSelection = false,
}) => {
  return (
    <div className="p-6 w-96 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Import Coordinators
      </h2>

      {withSelection && (
        <div className="mb-4">
          <Select
            name="programId"
            className="border data-[focus]:bg-blue-100 h-full outline-none p-2 w-full"
            aria-label="Select Program"
            onChange={(e) => {
              setProgramId(e.target.value);
            }}
            required={requiredFields.programId}
            value={programId}
          >
            <option value="">-Select a Program-</option>
            {programs.map((program) => {
              return (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              );
            })}
          </Select>
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
        >
          <Upload className="w-5 h-5 text-gray-500 mr-2" />
          {file ? (
            <span className="text-gray-700">{file.name}</span>
          ) : (
            <span className="text-gray-500">Choose a CSV file</span>
          )}
          <Input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {status === "success" && (
        <div className="mt-4 flex items-center text-green-600">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>File uploaded successfully!</span>
        </div>
      )}
      {status === "error" && (
        <div className="mt-4 flex items-center text-red-600">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Please select a file before uploading.</span>
        </div>
      )}
    </div>
  );
};

export default ImportCoordinatorForm;
