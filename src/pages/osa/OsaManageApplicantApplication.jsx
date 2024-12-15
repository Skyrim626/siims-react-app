import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { putRequest } from "../../api/apiHelpers";
import { Button } from "@headlessui/react";
import Loader from "../../components/common/Loader";
import ApplicationHeader from "../../components/applications/ApplicationHeader";
import PersonalInformationSection from "../../components/applications/PersonalInformationSection";
import DocumentSection from "../../components/applications/DocumentSection";
import Page from "../../components/common/Page";

const OsaManageApplicantApplication = () => {
  // Fetch Data
  const { application, statuses } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // State to manage documents
  const [documents, setDocuments] = useState(application.documents);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Handle Approve Change
  const handleApprove = async () => {
    // console.log("Approve");

    // Loading State
    setLoading(true);

    try {
      // PUT METHOD
      const response = await putRequest({
        url: `/api/v1/applications/${application.id}/mark-all-step-2-documents-as-approve`,
      });

      // Check response
      if (response) {
        navigate(location.pathname);
      }
    } catch (errors) {
      console.log(errors);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle Approve Document
  const handleApproveDocument = async (id) => {
    console.log(id);
  };

  // Handle Reject Document
  const handleRejectDocument = async (id) => {
    console.log(id);
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

      // Set Loading State
      setLoading(true);

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
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Page>
      <Loader loading={loading} />

      <div className="container mx-auto p-8">
        <ApplicationHeader
          title="Applicant Overview"
          description="Manage applicant information and document status with ease."
        />
        <Button
          onClick={() => handleApprove(application.id)}
          className={`mb-6 bg-gradient-to-r from-green-600 to-green-400 text-white py-2 px-6 rounded-full text-lg font-bold hover:scale-105 transform transition-all`}
        >
          Approve All Documents
        </Button>
        <div className="grid gap-5 mb-8">
          {/* Applicant Info Section */}
          <PersonalInformationSection application={application} />

          {/* Documents Section */}
          <DocumentSection
            documents={documents}
            statuses={statuses}
            handleStatusChange={handleStatusChange}
            allowActions={true}
            handleApproveDocument={handleApproveDocument}
            handleRejectDocument={handleRejectDocument}
          />
        </div>
      </div>
    </Page>
  );
};

export default OsaManageApplicantApplication;
