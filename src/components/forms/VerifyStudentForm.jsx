import { Input } from "@headlessui/react";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";
import React from "react";

const VerifyStudentForm = ({
  file,
  setFileType,
  status,
  setStatus,
  handleFileChange,
}) => {
  return (
    <div className="p-6 w-96 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Verify Students
      </h2>

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

export default VerifyStudentForm;
