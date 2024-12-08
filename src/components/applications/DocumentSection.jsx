import React from "react";
import { getStatusBgColor, getStatusColor } from "../../utils/statusColor";
import toFilePath from "../../utils/baseURL";
import DocumentCard from "./DocumentCard";

const DocumentSection = ({
  documents = [],
  statuses = [],
  handleStatusChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700">
        Document Status
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => {
          return (
            <DocumentCard
              key={doc.id}
              doc={doc}
              handleStatusChange={handleStatusChange}
              statuses={statuses}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default DocumentSection;
