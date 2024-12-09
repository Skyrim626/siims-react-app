import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Loader from "../../components/common/Loader";
import Table from "../../components/tables/Table";
import EmptyState from "../../components/common/EmptyState";
import FormModal from "../../components/modals/FormModal";
import UploadForm from "../admin/forms/UploadForm";
import { postFormDataRequest, putRequest } from "../../api/apiHelpers";

const DeanEndorsementLetterRequestsPage = () => {
  // Fetch Data
  const { initial_endorsement_letter_requests } = useLoaderData();

  // File Type
  const [file, setFile] = useState();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [status, setStatus] = useState("");

  // State to hold modal data
  const [selectedRow, setSelectedRow] = useState(null);

  // Container State
  const [endorsementLetters, setEndorsementLetters] = useState(
    initial_endorsement_letter_requests
  );

  // Modal open handler
  const openModal = (row) => {
    setSelectedRow(row); // Store the data of the clicked row
    setIsOpenUpload(true); // Open the modal
  };

  // Modal close handler
  const closeModal = () => {
    setIsOpenUpload(false);
    setSelectedRow(null); // Clear the selected row data
  };

  /**
   * Update Endorsement Letter
   */
  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected File:", selectedFile);
      setStatus("success");
    } else {
      setStatus("error");
    }
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
    formData.append("pdf_file", file);

    try {
      // POST FORM DATA
      const response = await postFormDataRequest({
        url: `/api/v1/endorsement-letter-requests/${selectedRow.id}/dean-submit-endorsement-letter`,
        data: formData,
      });

      if (response) {
        closeModal();
        setEndorsementLetters(response.data);
        setStatus("Endorsement Letter Uploaded Successfully!");
      }
    } catch (error) {
      // console.log(error.response.data.errors);
      setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
    } finally {
      setLoading(false);
    }
  };

  /**
   * Approves the selected Endorsement Letter Requests
   */
  const handleApprovedLetter = async (selectedIds) => {
    // console.log(selectedIds);

    // Set loading state
    setLoading(true);
    // console.log(selectedIds);
    try {
      // Prepare payload containing the selected user IDs
      const payload = { ids: Array.from(selectedIds) };
      // console.log(payload);
      // Perform POST request to archive the selected users
      const response = await putRequest({
        url: "/api/v1/endorsement-letter-requests/mark-as-approved",
        data: payload,
        method: "post",
      });

      // console.log(response);
      // Check Response
      if (response) {
        setEndorsementLetters(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text={"Endorsement Letter Requests"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the endorsement letter requests. Where you
          can update and approve letters.
        </Text>
        <hr className="my-3" />
      </Section>

      {/* Table */}
      {endorsementLetters.length > 0 ? (
        <Table
          data={endorsementLetters}
          openModal={openModal}
          handleApprovedLetter={handleApprovedLetter}
        />
      ) : (
        <EmptyState
          title="No endorsement approvals available at the moment"
          message="Once activities are recorded, endorsement approvals will appear here."
        />
      )}

      <FormModal
        isOpen={isOpenUpload}
        setIsOpen={setIsOpenUpload}
        modalTitle="Upload Endorsement Letter"
        onSubmit={submitFile}
      >
        <UploadForm
          file={file}
          set={setFile}
          status={status}
          setStatus={setStatus}
          handleFileChange={handleFileChange}
        />
      </FormModal>
    </Page>
  );
};

export default DeanEndorsementLetterRequestsPage;
