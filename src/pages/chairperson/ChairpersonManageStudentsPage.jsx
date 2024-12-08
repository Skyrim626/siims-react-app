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
import { postFormDataRequest, putRequest } from "../../api/apiHelpers";
import EmptyState from "../../components/common/EmptyState";
import { Select } from "@headlessui/react";

const ChairpersonManageStudentsPage = () => {
  // Fetch Data
  const { initial_students, current_program_id, list_of_coordinators } =
    useLoaderData();

  // console.log(list_of_coordinators);
  // console.log(current_program_id);

  // State for students and form modal
  const [students, setStudents] = useState(initial_students);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenImport, setIsOpenImport] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Loading State
  const [loading, setLoading] = useState(false);
  /**
   * File State
   */
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(""); // 'success' or 'error'

  // Coordinators sample data
  const coordinators = list_of_coordinators;

  const handleOpenAssignModal = (selectedIds) => {
    setSelectedIds(selectedIds);
    setIsAssignModalOpen(true);
  };

  // Update Student Status to Deployed
  const handleConfirmAssign = async () => {
    // Loading State
    setLoading(true);

    // console.log(selectedIds);
    try {
      // Ensure a coordinator is selected
      if (!selectedCoordinator) {
        alert("Please select a coordinator before confirming.");
        return;
      }

      // Prepare payload
      const payload = {
        student_ids: Array.from(selectedIds).map((id) => ({ student_id: id })),
        coordinator_id: selectedCoordinator,
      };

      // Simulate API call
      console.log("Assigning students:", payload);

      const response = await putRequest({
        url: "/api/v1/chairperson/students/assign-to-coordinator",
        data: payload,
      });

      if (response) {
        // Close modal and reset state
        setIsAssignModalOpen(false);
        setSelectedCoordinator("");
      }
    } catch (error) {
      console.error("Error during assignment:", error);
    } finally {
      setLoading(false);
    }
  };

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
        showAddButton={false}
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
          handleAssignToCoordinatorsBySelectedIds={handleOpenAssignModal}
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
          currentProgram={current_program_id}
        />
      </FormModal>

      {/* Assign Students Modal */}
      <FormModal
        isOpen={isAssignModalOpen}
        setIsOpen={setIsAssignModalOpen}
        modalTitle="Assign Students to Coordinator"
        onSubmit={handleConfirmAssign}
      >
        <div className="space-y-4">
          <Text>Select a coordinator to assign students:</Text>
          <Select
            className="border rounded px-4 py-2 w-full"
            value={selectedCoordinator}
            onChange={(e) => setSelectedCoordinator(e.target.value)}
          >
            <option value="">-- Select Coordinator --</option>
            {coordinators.map((coordinator) => (
              <option key={coordinator.id} value={coordinator.id}>
                {coordinator.name} (Assigned: {coordinator.total_students})
              </option>
            ))}
          </Select>

          <div className="mt-4">
            <Text className="font-semibold">Selected Student IDs:</Text>
            {selectedIds.size > 0 ? (
              <ul className="list-disc ml-6 mt-2">
                {Array.from(selectedIds).map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            ) : (
              <Text className="text-gray-500">No students selected.</Text>
            )}
          </div>
        </div>
      </FormModal>
    </Page>
  );
};

export default ChairpersonManageStudentsPage;
