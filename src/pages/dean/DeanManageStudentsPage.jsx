import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Heading from "../../components/common/Heading";
import Loader from "../../components/common/Loader";
import ManageHeader from "../../components/common/ManageHeader";
import Table from "../../components/tables/Table";
import EmptyState from "../../components/common/EmptyState";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import FormModal from "../../components/modals/FormModal";
import { postFormDataRequest } from "../../api/apiHelpers";
import ImportStudentForm from "../admin/forms/ImportStudentForm";

const DeanManageStudentsPage = () => {
  // Fetch
  const { initial_students, programs } = useLoaderData();

  // Container State
  const [students, setStudents] = useState(initial_students);

  // Modal State
  const [isOpenImport, setIsOpenImport] = useState(false);

  // Select State
  const [programId, setProgramId] = useState();

  // Loader State
  const [loading, setLoading] = useState(false);

  /**
   * File State
   */
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(""); // 'success' or 'error

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
        url: `/api/v1/users/students/${programId}/upload-students`,
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
      {/* Loader component */}
      <Loader loading={loading} />
      <Section>
        <Heading level={3} text={"Students"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the students.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        showAddButton={false}
        // addPlaceholder="Add New Coordinator"
        showExportButton={false}
        showImportButton={true}
        isImportOpen={isOpenImport}
        setIsImportOpen={setIsOpenImport}
      />

      {/* Table */}
      {students && students.length > 0 ? (
        <Table
          data={students}
          // handleEdit={handleEdit}
          // handleArchive={deleteDocumentType}
          // includeCheckboxes={false}
        />
      ) : (
        <EmptyState
          title="No students available at the moment"
          message="Once activities are recorded, students will appear here."
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
          programs={programs}
          programId={programId}
          setProgramId={setProgramId}
          withSelection={true}
        />
      </FormModal>
    </Page>
  );
};

export default DeanManageStudentsPage;
