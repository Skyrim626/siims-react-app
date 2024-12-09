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
import { postFormDataRequest, putRequest } from "../../api/apiHelpers";
import toFilePath from "../../utils/baseURL";
import Loader from "../../components/common/Loader";
import FormModal from "../../components/modals/FormModal";
import UploadFile from "../../components/common/UploadFile.";
import ApplicationHeader from "../../components/applications/ApplicationHeader";
import PersonalInformationSection from "../../components/applications/PersonalInformationSection";
import DocumentSection from "../../components/applications/DocumentSection";

const CompanyManageApplicantPage = () => {
  // Fetch data
  const { application, statuses } = useLoaderData();
  // console.log(status);
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(application);

  // Loader State
  const [loading, setLoading] = useState(false);

  // State to manage documents
  const [documents, setDocuments] = useState(application.documents);

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  /**
   * File State
   */
  const [isOpenImport, setIsOpenImport] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(false);

  /**
   * Handle File Upload
   */
  const handleOpenModal = (selectedIds) => {
    setIsOpenImport(true);
  };

  /**
   * Handle File Change
   */
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setStatus(""); // Reset status on file selection
  };

  // Submit File
  const submitFile = async (event) => {
    // Set Loading
    setLoading(true);

    event.preventDefault();
    if (!file) {
      setStatus("error");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);

    try {
      // POST FORM DATA
      const response = await postFormDataRequest({
        url: `/api/v1/applications/${application.id}/submit-acceptance-letter`,
        data: formData,
      });

      if (response) {
        setIsOpenImport(false);
        // navigate(-1);
        setStatus("Endorsement Letter Uploaded Successfully!");
      }
    } catch (error) {
      // console.log(error.response.data.errors);
      setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
    } finally {
      setLoading(false);
    }
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

      // Set Loading
      setLoading(true);

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
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle Approve
  const handleApprove = async (application_id) => {
    setLoading(true);

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
    } finally {
      setLoading(false);
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
      <Loader loading={loading} />

      <div className="container mx-auto p-8">
        <ApplicationHeader
          title="Applicant Overview"
          description="Manage applicant information and document status with ease."
        />
        <div className="grid gap-5 mb-8">
          {/* Applicant Info Section */}
          <PersonalInformationSection application={application} />

          {/* Documents Section */}
          <DocumentSection
            documents={documents}
            statuses={statuses}
            handleStatusChange={handleStatusChange}
          />
        </div>

        {/* Action Section */}
        <div className="flex justify-center mt-8 space-x-4">
          {/* <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-6 rounded-full text-lg font-bold hover:scale-105 transform transition-all">
            Manage Documents
          </Button> */}

          {/* Upload Button */}
          <Button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white py-2 px-6 rounded border border-blue-600 text-lg font-semibold hover:bg-blue-600 hover:border-blue-700 transition-all"
          >
            Upload Document
          </Button>

          {/* Generate Acceptance Letter Button */}
          <Link
            to={`${location.pathname}/generate-acceptance`}
            state={{
              application: application,
            }}
            className="bg-blue-500 text-white py-2 px-6 rounded border border-blue-600 text-lg font-semibold hover:bg-blue-600 hover:border-blue-700 transition-all"
          >
            Generate Acceptance Letter
          </Link>

          {/* Approve Button */}
          <Button
            onClick={() => handleApprove(application.id)}
            className={`${
              application.status === "Applying"
                ? "bg-blue-500 text-white border border-blue-600 hover:bg-blue-600 hover:border-blue-700"
                : "bg-gray-300 text-gray-600 border border-gray-400 cursor-not-allowed"
            } py-2 px-6 rounded text-lg font-semibold transition-all`}
            disabled={application.status !== "Applying"}
          >
            Approve
          </Button>
        </div>
      </div>

      {/* Modal for File Upload */}
      <FormModal
        isOpen={isOpenImport}
        setIsOpen={setIsOpenImport}
        modalTitle="Upload Acceptance Letter"
        onSubmit={submitFile}
      >
        <UploadFile
          file={file}
          set={setFile}
          handleFileChange={handleFileChange}
        />
      </FormModal>
    </Page>
  );
};

export default CompanyManageApplicantPage;
