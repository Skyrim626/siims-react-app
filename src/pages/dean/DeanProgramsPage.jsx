import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Heading from "../../components/common/Heading";
import ManageHeader from "../../components/common/ManageHeader";
import DeanProgramsTable from "../../components/users/dean/table/DeanProgramsTable";
import FormModal from "../../components/modals/FormModal";
import DeanProgramFormAdd from "./forms/DeanProgramFormAdd";
import { postRequest, putRequest } from "../../api/apiHelpers";
import DeanProgramFormEdit from "./forms/DeanProgramFormEdit";
import ProgramForm from "../../components/forms/ProgramForm";

const DeanProgramsPage = () => {
  // Retrieve the programs data from the loader
  const initial_programs = useLoaderData();

  // console.log(initial_programs);
  // State for programs and form modal
  const [programs, setPrograms] = useState(initial_programs);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Form input and errors
  const [programName, setProgramName] = useState("");
  const [errors, setErrors] = useState({});

  // Select State
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Update Program
  const updateProgram = async () => {
    try {
      // Ready payload
      const payload = {
        name: programName,
      };

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
      setProgramName("");
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
    setProgramName(program["name"]);

    // Open Modal
    setEditIsOpen(true);
  };

  // Add new Program
  const addProgram = async () => {
    try {
      // Ready for payload
      const payload = {
        name: programName,
      };

      // Make the POST request
      const response = await postRequest({
        url: "/api/v1/programs",
        data: payload,
      });

      // Add the new program to the local state
      setPrograms((prevPrograms) => [...prevPrograms, response.data]);
      // Reset form and close modal on success
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
      <DeanProgramsTable data={programs} handleEdit={handleEdit} />

      {/* Modals */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Program"
        onSubmit={addProgram}
      >
        <ProgramForm
          programName={programName}
          setProgramName={setProgramName}
          errors={errors}
          displayFields={{
            collegeId: false,
            programName: true,
          }}
        />
      </FormModal>

      {selectedProgram && (
        <FormModal
          isOpen={editIsOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit College"
          onSubmit={updateProgram}
        >
          <DeanProgramFormEdit
            programName={programName}
            setProgramName={setProgramName}
          />
        </FormModal>
      )}
    </Page>
  );
};

export default DeanProgramsPage;
