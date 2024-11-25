import React, { useState } from "react";
import {
  useLoaderData,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { Button, Dialog, Input } from "@headlessui/react";
import Page from "../../components/common/Page";
import { getStatusBgColor, getStatusColor } from "../../utils/statusColor";
import { putRequest } from "../../api/apiHelpers";
import toFilePath from "../../utils/baseURL";

const CompanyManageApplicantPage = () => {
  // Fetch data
  const { application, statuses } = useLoaderData();
  // console.log(status);
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(application);

  // State to manage documents
  const [documents, setDocuments] = useState(application.documents);

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Open modal
  const openModal = () => setIsOpen(true);

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedFile(null); // Clear the file after closing modal
  };

  // Handle Status Change
  const handleStatusChange = async (docId, newStatusId) => {
    // console.log("Selected status_id:", newStatusId); // Log the selected status ID

    // console.log(`Updating document with ID: ${docId} to status ID: ${newStatusId}`); // Log the docId and statusId

    const selectedStatus = statuses.find(
      (status) => status.id === Number(newStatusId)
    );

    if (selectedStatus) {
      const updatedDocuments = documents.map((doc) =>
        doc.id === docId ? { ...doc, status: selectedStatus.name } : doc
      );

      setDocuments(updatedDocuments);

      // Find the updated document and log its remarks (optional)
      const updatedDoc = updatedDocuments.find((doc) => doc.id === docId);
      // console.log(updatedDoc);

      try {
        // Ready for payload
        const payload = {
          status_id: Number(newStatusId),
          remarks: "Lupercal",
        };

        // console.log(newStatusId);
        // console.log(updatedDoc.id);
        // console.log(payload);

        // METHOD PUT
        const response = await putRequest({
          url: `/api/v1/company/applicants/${application.id}/update/${docId}`,
          data: payload,
        });

        // console.log(response);

        if (response) {
          navigate(location.pathname);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Handle Approve
  const handleApprove = async (application_id) => {
    // Approve Instantly
    try {
      // READY PUT METHOD
      const response = await putRequest({
        url: `api/v1/applications/${application_id}/mark-as-approve`,
      });

      if (response) {
        // console.log(response);
        navigate(location.pathname, { replace: true });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // Handle remarks change for each document
  const handleRemarksChange = (docId, newRemarks) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === docId ? { ...doc, remarks: newRemarks } : doc
      )
    );
  };

  return (
    <Page>
      <div className="container mx-auto p-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-xl mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            Applicant Overview
          </h1>
          <p className="text-center text-lg">
            Manage applicant information and document status with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Applicant Info Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-indigo-700">
              Personal Information
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong>{" "}
                {`${application.first_name} ${application.middle_name} ${application.last_name}`}
              </p>
              <p>
                <strong>Email:</strong> {application.email}
              </p>
              <p>
                <strong>Phone:</strong> {application.phone_number}
              </p>
              <p>
                <strong>Date of Birth:</strong> {application.date_of_birth}
              </p>
              <p>
                <strong>Program:</strong> {application.program}
              </p>
              <p>
                <strong>College:</strong> {application.college}
              </p>
            </div>
            <div className="flex items-center justify-between mt-6">
              <p className="text-xl font-semibold">Status: </p>
              <span
                className={`px-4 py-2 rounded-full ${getStatusColor(
                  application.status
                )} text-lg font-bold ${getStatusBgColor(application.status)} `}
              >
                {application.status}
              </span>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-indigo-700">
              Document Status
            </h2>
            <ul className="space-y-4">
              {documents.map((doc) => {
                // console.log(doc);

                return (
                  <li
                    key={doc.id}
                    className="p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-xl transform transition hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">
                        {doc.document_type}
                      </span>
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-semibold ${getStatusColor(
                          doc.status
                        )} ${getStatusBgColor(doc.status)} `}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Remarks:</strong> {doc.remarks}
                    </p>
                    <div className="text-sm text-gray-500 mt-2">
                      {doc.file_path ? (
                        <p>
                          <strong>Document:</strong>
                          <a
                            href={toFilePath(doc.file_path)}
                            className="text-blue-600 hover:text-blue-800 transition-all"
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
                    <div className="text-xs text-gray-400 mt-2">
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(doc.created_at).toLocaleString()}
                      </p>
                      <p>
                        <strong>Updated At:</strong>{" "}
                        {new Date(doc.updated_at).toLocaleString()}
                      </p>
                    </div>
                    {/* Document Status Dropdown (Select) */}
                    {[1, 2, 3].includes(doc.doc_type_id) &&
                      doc.status_id !== 2 && (
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
                              statuses.find(
                                (status) => status.name === doc.status
                              )?.id || ""
                            }
                            onChange={(e) =>
                              handleStatusChange(doc.id, e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
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
              })}
            </ul>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex justify-center mt-8 space-x-4">
          {/* <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-6 rounded-full text-lg font-bold hover:scale-105 transform transition-all">
            Manage Documents
          </Button> */}

          {/* Generate Acceptance Letter Button */}
          {/* <Link
            to={`${location.pathname}/generate-acceptance`}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-6 rounded-full text-lg font-bold hover:scale-105 transform transition-all"
          >
            Generate Acceptance Letter
          </Link> */}

          {/* Upload Button */}
          <Button
            onClick={openModal}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-6 rounded-full text-lg font-bold hover:scale-105 transform transition-all"
          >
            Upload Document
          </Button>
          {/* Approve Button */}
          <Button
            onClick={() => handleApprove(application.id)}
            className={`bg-gradient-to-r ${
              application.status === "Applying"
                ? "from-green-600 to-green-400"
                : "from-gray-600 to-gray-400 cursor-not-allowed"
            } text-white py-2 px-6 rounded-full text-lg font-bold hover:scale-105 transform transition-all`}
            disabled={application.status !== "Applying"}
          >
            Approve
          </Button>
        </div>
      </div>

      {/* Modal for File Upload */}
      <Dialog open={isOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Upload New Document</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            {selectedFile && (
              <p className="text-sm text-gray-600">
                Selected File: {selectedFile.name}
              </p>
            )}
            <div className="mt-6 flex justify-between">
              <Button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </Button>
              <Button className="bg-blue-500 text-white px-6 py-2 rounded-full">
                Upload
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </Page>
  );
};

export default CompanyManageApplicantPage;
