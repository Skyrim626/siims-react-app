import React, { useEffect, useState } from "react";
import {
  getDocumentStatusColor,
  getStatusBgColor,
  getStatusColor,
} from "../../utils/statusColor";
import toFilePath from "../../utils/baseURL";
import { formatDateOnly, formatDateTime } from "../../utils/formatDate";
import { Button } from "@headlessui/react";
import Text from "../common/Text";
import { HelpCircle, TriangleAlert } from "lucide-react";
import Loader from "../common/Loader";
import { getRequest } from "../../api/apiHelpers";
import StatusListModal from "../modals/StatusListModal";
import ConfirmChangeModal from "../modals/ConfirmChangeModal";
import useRequest from "../../hooks/useRequest";

const DocumentTable = ({
  applicationID,
  authorizeRole,
  applicationStatusID,
}) => {
  // Backend Resource
  const documentsResource = `/api/v1/applications/${applicationID}/documents?requestedBy=${authorizeRole}`;
  // console.log(documentsResource);
  const statusResource = `/api/v1/statuses/document-submission-statuses?requestedBy=${authorizeRole}`;

  // Loading State
  const [loading, setLoading] = useState(false);
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  // Container State
  const [documents, setDocuments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  // Document Status State
  const [documentStatuses, setDocumentStatuses] = useState({});
  // Select State
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedStatusID, setSelectedStatusID] = useState(null);
  // Track State
  const [updateFlag, setUpdateFlag] = useState(false);

  // Custom Hooks
  const { putData } = useRequest({
    setIsOpen: setIsStatusOpen,
    setLoading: setLoading,
    setData: setDocuments,
  });

  // Fetch Documents
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await getRequest({ url: documentsResource });
      if (response) {
        setDocuments(response);
        // Initialize statuses for each document
        const initialStatuses = response.reduce((acc, doc) => {
          acc[doc.id] = doc.status_id;

          return acc;
        }, {});

        setDocumentStatuses(initialStatuses);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Document Statuses
  const fetchDocumentStatuses = async () => {
    setLoading(true);
    try {
      const response = await getRequest({ url: statusResource });
      if (response) setStatuses(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchDocumentStatuses();
  }, [updateFlag]);

  // Handle Status Change
  const handleStatusChange = async () => {
    // Optionally handle backend updates here
    /* console.log(
      `Document ${selectedDocumentID} status updated to ${selectedStatusID}`
    ); */
    // console.log("Selected: ", selectedDocument);
    await putData({
      url: `/documents/${selectedDocument["id"]}/update-status`,
      payload: {
        document_status_id: selectedStatusID,
        document_id: selectedDocument["id"],
      },
      selectedData: selectedDocument,
      setIsOpen: setIsStatusOpen,
    });

    // console.log(documentStatuses);

    setDocumentStatuses((prev) => ({
      ...prev,
      [selectedDocument["id"]]: selectedStatusID,
    }));

    // Trigger useEffect by toggling the flag
    setUpdateFlag((prev) => !prev);
  };

  // Handle Confirm Status Change
  const handleConfirmStatusChange = (document, newStatusID) => {
    setIsStatusOpen(true);
    setSelectedDocument(document);
    setSelectedStatusID(newStatusID);
  };

  // Render Document List
  const renderDocumentList = () => {
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
              Created At
            </th>
            <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
              Updated At
            </th>
            <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
              Action
            </th>
            <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {documents &&
            documents.map((doc) => {
              const { textColor, backgroundColor } = getDocumentStatusColor(
                doc.status
              );
              return (
                <tr key={doc.id} className="hover:bg-gray-100">
                  <td className="border border-gray-200 p-3 text-sm text-gray-800">
                    {doc.name}
                  </td>
                  <td
                    className={`text-center border border-gray-200 p-3 text-sm font-semibold ${textColor} ${backgroundColor}`}
                  >
                    {doc.status}
                  </td>
                  <td className="text-center border border-gray-200 p-3 text-sm text-gray-800">
                    {doc.file_path && (
                      <a
                        href={doc.file_path}
                        target="_blank"
                        className="underline text-blue-500 hover:text-blue-600"
                      >
                        View File
                      </a>
                    )}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-800">
                    {formatDateOnly(doc.created_at)}
                  </td>
                  <td className="border border-gray-200 p-3 text-sm text-gray-800">
                    {formatDateOnly(doc.updated_at)}
                  </td>

                  {applicationStatusID !== 5 && doc.can_update && (
                    <td className="text-center border border-gray-200 p-3 text-sm text-gray-800">
                      <select
                        value={documentStatuses[doc.id] || ""}
                        className="p-3 outline-none"
                        onChange={(e) =>
                          handleConfirmStatusChange(doc, e.target.value)
                        }
                      >
                        <option value="">-Select Status-</option>
                        {statuses.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </>
    );
  };

  return (
    <div>
      <Loader loading={loading} />
      <div className="py-6 flex flex-col">
        <div className="text-sm/6 font-medium text-gray-900 flex items-center gap-3">
          <Text>Attachments</Text>
          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HelpCircle size={20} />
          </Button>
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="table-auto w-full border-collapse border border-gray-200">
            {documents && renderDocumentList()}
          </table>
        </div>
      </div>
      <StatusListModal
        title={"Document Status"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        statusLists={statuses}
        getStatusColor={getDocumentStatusColor}
      />

      {/* Modal */}
      <ConfirmChangeModal
        open={isStatusOpen}
        setOpen={setIsStatusOpen}
        handleConfirm={handleStatusChange}
        title={"Change Document Status"}
        message={
          "Are you sure you want to update this document? This action will update the someone immediately."
        }
        icon={
          <TriangleAlert
            aria-hidden="true"
            className="h-6 w-6 text-yellow-600"
          />
        }
      />
    </div>
  );
};

export default DocumentTable;
