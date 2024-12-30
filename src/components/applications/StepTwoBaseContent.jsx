import React from "react";
import { getStatusBgColor, getStatusColor } from "../../utils/statusColor";
import Text from "../common/Text";
import toFilePath from "../../utils/baseURL";
import { Button, Input } from "@headlessui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StepTwoBaseContent = ({
  stepTwoDocuments = [],
  handleFileUpload,
  handlePreviousStep,
  handleNextStep,
}) => {
  return (
    <>
      {/* Document List */}
      <div className="space-y-4">
        {stepTwoDocuments.map((doc) => {
          if (doc) {
            return (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
              >
                {/* Document Name */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {doc.name}
                  </h3>
                  {/* Dynamically render status color */}
                  <div
                    className={`text-sm flex gap-1 items-center ${getStatusColor(
                      doc.status
                    )}`}
                  >
                    <Text>Status:</Text>
                    <Text
                      className={`${getStatusBgColor(
                        doc.status
                      )} p-1 rounded-full`}
                    >
                      {doc.status}
                    </Text>
                  </div>
                </div>

                {/* Upload or View */}
                <div className="flex items-center space-x-4">
                  {doc.file_path ? (
                    <>
                      <a
                        href={toFilePath(doc.file_path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        View File
                      </a>
                      {doc.can_change && (
                        <label className="flex items-center space-x-2">
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload(e, doc.id)}
                            className="hidden"
                          />
                          <span className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
                            Change File
                          </span>
                        </label>
                      )}
                    </>
                  ) : (
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, doc.id)}
                      className="file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-500 file:text-white file:cursor-pointer"
                    />
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          onClick={handlePreviousStep}
          className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
          <span>Previous</span>
        </Button>

        {/* Next Button */}
        <Button
          onClick={handleNextStep}
          disabled={!stepTwoDocuments.every((doc) => doc.status === "Approved")}
          className={`flex items-center justify-center px-6 py-3 rounded-lg font-semibold ${
            !stepTwoDocuments.every((doc) => doc.status === "Approved")
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <span>Next</span>
          <ChevronRight className={`h-5 w-5 text-gray-700`} />
        </Button>
      </div>
    </>
  );
};

export default StepTwoBaseContent;
