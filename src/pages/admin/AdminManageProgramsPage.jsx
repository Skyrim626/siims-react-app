import React, { useEffect, useState } from "react";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Heading from "../../components/common/Heading";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import AdminProgramsTable from "../../components/users/admin/table/AdminProgramsTable";
import FormModal from "../../components/modals/FormModal";
import useForm from "../../hooks/useForm";
import AdminProgramFormEdit from "./forms/AdminProgramFormEdit";
import AdminProgramFormAdd from "./forms/AdminProgramFormAdd";
import useHandleSubmit from "../../hooks/useHandleSubmit";
import { useLoaderData } from "react-router-dom";

const AdminManageProgramsPage = () => {
  // Retrieve the programs, list_of_chairperson, and list_of_colleges data from the loader
  const { initial_programs, list_of_chairpersons, list_of_colleges } =
    useLoaderData();

  // State for programs and form modal
  const [programs, setPrograms] = useState(initial_programs);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Form input and errors
  const [collegeId, setCollegeId] = useState(null);
  const [chairpersonId, setChairpersonId] = useState(null);
  const [programName, setProgramName] = useState("");
  const [errors, setErrors] = useState({});

  // Select State
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Delete a program
  const deleteProgram = async (id) => {
    try {
      // console.log(id);

      // Make the DELETE request
      const response = await deleteRequest({
        url: `/api/v1/admin/programs/${id}`,
      });

      setPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program.id !== id)
      );
    } catch (error) {
      console.log(`Cannot delete a program: `, error);
    }
  };

  // Submit new program data
  const submitProgram = async () => {
    try {
      const payload = {
        college_id: collegeId,
        name: programName,
      };

      // Make the POST request
      const response = await postRequest({
        url: "/api/v1/admin/programs",
        data: payload,
      });

      // Add the new program to the local state
      setPrograms((prevPrograms) => [...prevPrograms, response.data]);
      // Reset form and close modal on success
      setCollegeId("");
      setProgramName("");
      setErrors({});
      setIsOpen(false);
    } catch (error) {
      // Handle and set errors
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async () => {
    try {
      // Ready Payload
      const payload = {
        college_id: collegeId,
        chairperson_id: chairpersonId,
        name: programName,
      };

      // console.log(payload);
      // Send update request to the backend
      const response = await putRequest({
        url: `/api/v1/admin/programs/${selectedProgram["id"]}`,
        data: payload,
      });

      // Update the program in the state
      setPrograms((prevPrograms) =>
        prevPrograms.map((program) =>
          program.id === selectedProgram["id"]
            ? { ...program, ...response.data }
            : program
        )
      );

      // Reset inputs and modals
      setProgramName(null);
      setCollegeId(null);
      setChairpersonId(null);
      setEditIsOpen(false);
    } catch (error) {
      // Handle and set errors
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  // Handle Edit Select Program
  const handleEdit = (program) => {
    // Set Program State
    // console.log(program);
    setSelectedProgram(program);

    // Pre-fill the college_id, chairperson_id, name with in each fields
    setCollegeId(program["id"]);
    setChairpersonId(program["chairperson_id"]);
    setProgramName(program["name"]);

    // Open Modal
    setEditIsOpen(true);
  };

  return (
    <Page>
      <Section>
        <Heading level={3} text={"Programs"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the programs.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Program"
        showExportButton={false}
        showImportButton={false}
      />

      {/* Table */}
      <AdminProgramsTable
        data={programs}
        handleEdit={handleEdit}
        handleArchive={deleteProgram}
      />

      {/* Modals */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Program"
        onSubmit={submitProgram}
      >
        <AdminProgramFormAdd
          colleges={list_of_colleges}
          collegeId={collegeId}
          programName={programName}
          setCollegeId={setCollegeId}
          setProgramName={setProgramName}
          errors={errors}
        />
      </FormModal>

      {selectedProgram && (
        <FormModal
          isOpen={editIsOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit College"
          onSubmit={handleEditSubmit}
        >
          <AdminProgramFormEdit
            collegeId={collegeId}
            chairpersonId={chairpersonId}
            programName={programName}
            setCollegeId={setCollegeId}
            setProgramName={setProgramName}
            setChairpersonId={setChairpersonId}
            chairpersons={list_of_chairpersons} // Pass chairperson list to the form
            colleges={list_of_colleges}
          />
        </FormModal>
      )}
    </Page>
  );
};

export default AdminManageProgramsPage;
