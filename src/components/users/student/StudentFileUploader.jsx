import { Input } from "@headlessui/react";
import React from "react";
import Text from "../../common/Text";

const StudentFileUploader = ({ label, onUpload, fileName }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={onUpload}
        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {fileName && (
        <Text className="text-green-600 font-medium mt-2">
          Uploaded: {fileName}
        </Text>
      )}
    </div>
  );
};

export default StudentFileUploader;
