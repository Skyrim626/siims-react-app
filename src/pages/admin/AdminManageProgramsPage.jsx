import React, { useEffect, useState } from "react";
import { getRequest } from "../../api/apiHelpers";
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

const AdminManageProgramsPage = () => {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Fetch state
  const [programs, setPrograms] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [chairpersons, setChairpersons] = useState([]);

  // Select State
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Input State
  const [programInfo, handleProgramInfoChange] = useForm({
    college_id: null,
    name: "",
  });

  // Using the custom hook for College Information (Edit)
  const [editProgramInfo, handleEditProgramInfoChange] = useForm({
    id: "",
    name: "",
    college_id: "",
    chairperson_id: "",
  });

  const { handleSubmit, isSubmitting, error } = useHandleSubmit();

  useEffect(() => {
    // Fetch programs
    const fetchPrograms = async () => {
      const response = await getRequest({
        url: "/api/v1/admin/programs",
      });

      setPrograms(response);
    };

    // Fetch colleges
    const fetchColleges = async () => {
      const response = await getRequest({
        url: "/api/v1/admin/colleges",
      });

      setColleges(response.data);
    };

    // Fetch chairpersons
    const fetchChairpersons = async () => {
      const response = await getRequest({
        url: "/api/v1/admin/users/chairpersons",
      });

      setChairpersons(response);
    };

    fetchPrograms();
    fetchColleges();
    fetchChairpersons();
  }, []);

  // Submit new program data
  const submitProgram = async () => {
    await handleSubmit({
      url: "/api/v1/admin/programs",
      method: "post",
      data: programInfo,
      resetField: handleProgramInfoChange({
        target: { name: "name", value: "" },
      }),
      setState: setPrograms,
      closeModal: () => setIsOpen(false),
    });
  };

  // Handle Edit Submit
  const handleEditSubmit = async () => {
    // Ready Payload
    const payload = editProgramInfo;

    // Submit Form
    handleSubmit({
      method: "put",
      url: `/api/v1/admin/programs/${selectedProgram["id"]}`,
      data: payload,
      resetField: () =>
        handleEditProgramInfoChange({
          target: { name: "name", value: "" },
        }),
      setState: setPrograms,
      closeModal: () => setEditIsOpen(false),
    });
  };

  // Handle Edit Select Program
  const handleEdit = (program) => {
    // Set Program State
    setSelectedProgram(program);

    // Pre-fill the editProgramInfo with multiple fields
    handleEditProgramInfoChange({
      target: { name: "name", value: program.name },
    });
    handleEditProgramInfoChange({
      target: { name: "college_id", value: program.college_id },
    });
    handleEditProgramInfoChange({
      target: { name: "chairperson_id", value: program.chairperson_id },
    });

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
      {programs.length > 1 && (
        <AdminProgramsTable data={programs} handleEdit={handleEdit} />
      )}

      {colleges && (
        <>
          <FormModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle="Add Program"
            onSubmit={submitProgram}
          >
            <AdminProgramFormAdd
              colleges={colleges}
              programInfo={programInfo}
              handleProgramInfoChange={handleProgramInfoChange}
            />
          </FormModal>

          {chairpersons && (
            <FormModal
              isOpen={editIsOpen}
              setIsOpen={setEditIsOpen}
              modalTitle="Edit College"
              onSubmit={handleEditSubmit}
            >
              <AdminProgramFormEdit
                role={selectedProgram}
                editProgramInfo={editProgramInfo}
                handleEditProgramInfoChange={handleEditProgramInfoChange}
                chairpersons={chairpersons} // Pass chairperson list to the form
                colleges={colleges}
              />
            </FormModal>
          )}
        </>
      )}
    </Page>
  );
};

export default AdminManageProgramsPage;
