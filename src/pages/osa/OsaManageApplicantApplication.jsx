import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/common/Page";
import { getStatusBgColor, getStatusColor } from "../../utils/statusColor";
import toFilePath from "../../utils/baseURL";
import { putRequest } from "../../api/apiHelpers";

const OsaManageApplicantApplication = () => {
  // Fetch Data
  const { application, statuses } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // State to manage documents
  const [documents, setDocuments] = useState(application.documents);

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

        // Path
        /* console.log(
          `/api/v1/osa/applicants/${application.student_id}/applications/${application.id}/update-document/${docId}`
        ); */

        // METHOD PUT
        const response = await putRequest({
          url: `/api/v1/osa/applicants/${application.student_id}/applications/${application.id}/status/${docId}`,
          data: payload,
        });

        // console.log(response);

        if (response) {
          navigate(location.pathname);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
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
                    {doc.can_modify && (
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
      </div>
    </Page>
  );
};

export default OsaManageApplicantApplication;
