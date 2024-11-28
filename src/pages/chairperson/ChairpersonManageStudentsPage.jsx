import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import Table from "../../components/tables/Table";
import FormModal from "../../components/modals/FormModal";
import ImportStudentForm from "../admin/forms/ImportStudentForm";
import { postFormDataRequest } from "../../api/apiHelpers";
import EmptyState from "../../components/common/EmptyState";

const ChairpersonManageStudentsPage = () => {
  // Fetch Data
  const { initial_students, current_program_id } = useLoaderData();

  // console.log(current_program_id);

  // State for students and form modal
  const [students, setStudents] = useState(initial_students);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenImport, setIsOpenImport] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Update Student Status to Deployed
  const handleAssignToCoordinatorsBySelectedIds = async (selectedIds) => {
    //console.log(selectedIds); // Example output: Set { 2024301502 }

    try {
      // Prepare payload
      const payload = {
        ids: Array.from(selectedIds), // Convert Set to array
      };

      // console.log(payload);

      // Call putRequest
      const response = await putRequest({
        url: "/api/v1/coordinator/students/deploy-students",
        data: payload,
      });

      //   successful response
      // console.log("Deployment successful:", response);

      if (response) {
        navigate(location.pathname);
      }
    } catch (error) {
      // Handle error response
      console.error(
        "Error during deployment:",
        error.response?.data || error.message
      );
    }
  };

  /**
   * File State
   */
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(""); // 'success' or 'error'

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setStatus(""); // Reset status on file selection
  };

  // Submit File
  const submitFile = async (event) => {
    event.preventDefault();
    if (!file) {
      setStatus("error");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Set Loading
      setLoading(true);

      // Assuming your backend has an endpoint for file upload
      const response = await postFormDataRequest({
        url: `/api/v1/users/students/${current_program_id}/upload-students`,
        data: formData,
      });

      setIsOpenImport(false);
      setStatus("success");

      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Loader loading={loading} />
      <Section>
        <Heading level={3} text={"Students"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the students.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Student"
        showExportButton={false}
        showImportButton={true}
        isImportOpen={isOpenImport}
        setIsImportOpen={setIsOpenImport}
      />

      {/* Table */}
      {students.length > 0 ? (
        <Table
          data={students}
          handleAssignToCoordinatorsBySelectedIds={
            handleAssignToCoordinatorsBySelectedIds
          }
        />
      ) : (
        <EmptyState
          title="No students available at the moment"
          message="Once activities are recorded, students will appear here."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          }
        />
      )}

      <FormModal
        isOpen={isOpenImport}
        setIsOpen={setIsOpenImport}
        modalTitle="Import Students"
        onSubmit={submitFile}
      >
        <ImportStudentForm
          file={file}
          set={setFile}
          status={status}
          setStatus={setStatus}
          handleFileChange={handleFileChange}
          currentProgram={current_program_id}
        />
      </FormModal>
    </Page>
  );
};

export default ChairpersonManageStudentsPage;
