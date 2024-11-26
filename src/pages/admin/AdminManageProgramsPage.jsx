import React, { useState } from "react";
import { deleteRequest, postRequest, putRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Heading from "../../components/common/Heading";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import FormModal from "../../components/modals/FormModal";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/tables/Table";
import ProgramForm from "../../components/forms/ProgramForm";
import Loader from "../../components/common/Loader";

const AdminManageProgramsPage = () => {
  // Retrieve the programs, list_of_chairperson, and list_of_colleges data from the loader
  const { initial_programs, list_of_chairpersons, list_of_colleges } =
    useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Loader State
  const [loading, setLoading] = useState(false);

  // State for programs and form modal
  const [programs, setPrograms] = useState(initial_programs);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Form input and errors
  const [collegeId, setCollegeId] = useState(0);
  const [chairpersonId, setChairpersonId] = useState(null);
  const [programName, setProgramName] = useState("");
  const [errors, setErrors] = useState({});

  // Select State
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Delete a program
  const deleteProgram = async (id) => {
    // Set Loading
    setLoading(true);

    try {
      // console.log(id);

      // Make the DELETE request
      const response = await deleteRequest({
        url: `/api/v1/admin/programs/${id}`,
      });

      // Make the DELETE Request

      setPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program.id !== id)
      );
    } catch (error) {
      console.log(`Cannot delete a program: `, error);
    } finally {
      setLoading(true);
    }
  };

  // Submit new Program data
  const submitProgram = async () => {
    // Set Loading
    setLoading(true);

    try {
      const payload = {
        college_id: collegeId,
        name: programName,
      };

      // console.log(payload);

      // Make the POST request
      const response = await postRequest({
        url: "/api/v1/programs",
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
        // console.log(error.response.data.errors);
        setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
      } else {
        // console.error("An unexpected error occurred:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async () => {
    // Set Loader State
    setLoading(true);

    try {
      // Ready Payload
      const payload = {
        chairperson_id: chairpersonId,
        name: programName,
      };

      // console.log(payload);
      // console.log(selectedProgram["id"]);

      // console.log(payload);
      // Send update request to the backend
      const response = await putRequest({
        url: `/api/v1/programs/${selectedProgram["id"]}`,
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

      // Refresh
      if (response) {
        navigate(location.pathname, {
          replace: true,
        });
        // windows.reload
      }
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
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Select Program
  const handleEdit = (program) => {
    console.log(program);

    // Set Program State
    // console.log(program);
    setSelectedProgram(program);

    // Pre-fill the college_id, chairperson_id, name with in each fields
    setCollegeId(program["college_id"]);
    setChairpersonId(program["chairperson_id"]);
    setProgramName(program["name"]);

    // Open Modal
    setEditIsOpen(true);
  };

  return (
    <Page>
      <Loader loading={loading} />

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
      <Table
        data={programs}
        handleEdit={handleEdit}
        handleArchive={deleteProgram}
        includeCheckboxes={false}
      />

      {/* Modals */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Program"
        onSubmit={submitProgram}
      >
        <ProgramForm
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
          <ProgramForm
            method="put"
            collegeId={collegeId}
            chairpersonId={chairpersonId}
            programName={programName}
            setCollegeId={setCollegeId}
            setProgramName={setProgramName}
            setChairpersonId={setChairpersonId}
            chairpersons={list_of_chairpersons} // Pass chairperson list to the form
            colleges={list_of_colleges}
            errors={errors}
          />
        </FormModal>
      )}
    </Page>
  );
};

export default AdminManageProgramsPage;
