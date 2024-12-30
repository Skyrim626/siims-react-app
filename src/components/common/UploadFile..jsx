import React, { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Input, Select } from "@headlessui/react";

const UploadFile = ({
  title = "Upload Endorsement Letter",
  file,
  setFileType,
  status,
  setStatus,
  handleFileChange,
}) => {
  return (
    <div className="p-6 w-96 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="mb-4">
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
        >
          <Upload className="w-5 h-5 text-gray-500 mr-2" />
          {file ? (
            <span className="text-gray-700">{file.name}</span>
          ) : (
            <span className="text-gray-500">Choose a PDF file</span>
          )}
          <Input
            type="file"
            id="fileInput"
            accept=".pdf"
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

export default UploadFile;
