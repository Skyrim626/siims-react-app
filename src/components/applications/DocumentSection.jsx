import React from "react";
import { getStatusBgColor, getStatusColor } from "../../utils/statusColor";
import toFilePath from "../../utils/baseURL";
import { formatDateTime } from "../../utils/formatDate";
import { Button } from "@headlessui/react";

const DocumentSection = ({
  documents = [],
  statuses = [],
  handleStatusChange,
  role,
  allowActions = false,
  handleApproveDocument,
  handleRejectDocument,
}) => {
  // console.log(documents);

  // Render Document List
  const renderDocumentList = () => {
    switch (role) {
      case "coordinator":
        return (
          <>
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Document Type
                </th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Document
                </th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Last Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-100">
                  <td className="border border-gray-200 p-3 text-sm text-gray-800">
                    {doc.document_type.name}
                  </td>
                  <td
                    className={`border border-gray-200 p-3 text-sm font-semibold ${getStatusColor(
                      doc.status.name
                    )} ${getStatusBgColor(doc.status.name)}`}
                  >
                    {doc.status.name}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-blue-500">
                    {doc.file_path ? (
                      <a
                        href={toFilePath(doc.file_path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-700 transition-all"
                      >
                        View here
                      </a>
                    ) : (
                      "Not uploaded"
                    )}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-600">
                    {formatDateTime(doc.updated_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        );

      case "osa":
        break;

      default:
        return (
          <>
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Document Type
                </th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Remarks
                </th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Document
                </th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Created At
                </th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Updated At
                </th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                  Change Status
                </th>
                {allowActions && (
                  <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-100">
                  <td className="border border-gray-200 p-3 text-sm text-gray-800">
                    {doc.document_type}
                  </td>
                  <td
                    className={`border border-gray-200 p-3 text-sm font-semibold ${getStatusColor(
                      doc.status
                    )} ${getStatusBgColor(doc.status)}`}
                  >
                    {doc.status}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-700">
                    {doc.remarks}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-blue-500">
                    {doc.file_path ? (
                      <a
                        href={toFilePath(doc.file_path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-700 transition-all"
                      >
                        View here
                      </a>
                    ) : (
                      "Not uploaded"
                    )}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-600">
                    {formatDateTime(doc.created_at)}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-600">
                    {formatDateTime(doc.updated_at)}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm">
                    {[1, 2, 3].includes(doc.doc_type_id) &&
                    doc.status_id !== 2 ? (
                      <select
                        id="status"
                        value={
                          statuses.find((status) => status.name === doc.status)
                            ?.id || ""
                        }
                        onChange={(e) =>
                          handleStatusChange(doc.id, e.target.value)
                        }
                        className="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                      >
                        {statuses.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  {allowActions && (
                    <td className="border border-gray-200 p-3 text-sm flex items-center justify-center gap-3">
                      <Button
                        onClick={() => handleApproveDocument(doc.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handeRejectDocument(doc.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      >
                        Reject
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700">Document List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          {renderDocumentList()}
        </table>
      </div>
    </div>
  );
};

export default DocumentSection;
