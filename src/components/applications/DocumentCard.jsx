import React from "react";
import { getStatusBgColor, getStatusColor } from "../../utils/statusColor";
import toFilePath from "../../utils/baseURL";
import { formatDateTime } from "../../utils/formatDate";
import Text from "../common/Text";

const DocumentCard = ({ doc, handleStatusChange, statuses }) => {
  return (
    <li
      key={doc.id}
      className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <span className="text-lg font-bold text-gray-800 ">
          {doc.document_type}
        </span>
        <span
          className={`text-sm px-3 py-1 rounded-full font-semibold ${getStatusColor(
            doc.status
          )} ${getStatusBgColor(doc.status)}`}
        >
          {doc.status}
        </span>
      </div>
      <p className="text-sm text-gray-700 mt-2">
        <strong>Remarks:</strong> {doc.remarks}
      </p>
      <div className="text-sm text-gray-600 mt-2">
        {doc.file_path ? (
          <p>
            <strong>Document:</strong>{" "}
            <a
              href={toFilePath(doc.file_path)}
              className="text-blue-500 hover:text-blue-700 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              View here
            </a>
          </p>
        ) : (
          <p>
            <strong>Resume:</strong> Not uploaded
          </p>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-2 flex justify-between">
        <div className="flex flex-col">
          <Text className="font-bold">Created At</Text>
          <Text className="text-xs">{formatDateTime(doc.created_at)}</Text>
        </div>

        <div className="flex flex-col">
          <Text className="font-bold">Updated At</Text>
          <Text className="text-xs">{formatDateTime(doc.updated_at)}</Text>
        </div>
      </div>
      {/* Document Status Dropdown (Select) */}
      {[1, 2, 3].includes(doc.doc_type_id) && doc.status_id !== 2 && (
        <div className="mt-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Change Status
          </label>
          <select
            id="status"
            value={
              statuses.find((status) => status.name === doc.status)?.id || ""
            }
            onChange={(e) => handleStatusChange(doc.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          >
            {statuses &&
              statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
          </select>
        </div>
      )}
    </li>
  );
};

export default DocumentCard;
