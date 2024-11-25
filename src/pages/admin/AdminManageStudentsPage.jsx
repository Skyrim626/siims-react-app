import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";
import ManageHeader from "../../components/common/ManageHeader";
import FormModal from "../../components/modals/FormModal";
import ImportStudentForm from "./forms/ImportStudentForm";

const AdminManageStudentsPage = () => {
  // Fetch students
  const { initial_students, colleges, programs } = useLoaderData();

  // State for students and form modal
  const [students, setStudents] = useState(initial_students);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [isOpenImport, setIsOpenImport] = useState(false);

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
  const submitFile = (event) => {
    event.preventDefault();
    if (!file) {
      setStatus("error");
      return;
    }

    console.log(file);
    // Simulate file upload
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };
  /**
   *
   */

  return (
    <Page>
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
      <Table data={students} />

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
        />
      </FormModal>
    </Page>
  );
};

export default AdminManageStudentsPage;
