import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/common/Page";
import ManageHeader from "../../components/common/ManageHeader";
import Table from "../../components/tables/Table";
import FormModal from "../../components/modals/FormModal";
import CoordinatorForm from "../../components/forms/CoordinatorForm";
import { postRequest } from "../../api/apiHelpers";

const AdminManageCoordinatorsPage = () => {
  // Fetch Coordinators Data
  const { initial_coordinators, programs } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Coordinator Input State
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [programId, setProgramId] = useState("");
  const [errors, setErrors] = useState({});

  // console.log(initial_coordinators);

  // Add Coordinator
  const addCoordinator = async () => {
    try {
      // Ready Payload
      const payload = {
        id,
        password,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastnName,
        email: email,
        phone_number: phoneNumber,
        program_id: programId,
      };

      console.log(payload);

      // POST
      const response = await postRequest({
        url: "/api/v1/users/coordinators",
        data: payload,
      });

      // Check response
      if (response) {
        navigate(location.pathname, { replace: true });
      }

      // console.log(payload);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Coordinator
  const editCoordinator = async () => {};

  // Soft Delete Coordinator
  const softDeleteCoordinator = async () => {};

  return (
    <Page>
      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Coordinator"
        showExportButton={false}
        showImportButton={false}
      />

      {/* Table */}
      <Table
        data={initial_coordinators}
        handleEdit={editCoordinator}
        handleArchive={softDeleteCoordinator}
        includeCheckboxes={false}
      />

      {/* Form Add for Coordinator */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Coordinator"
        onSubmit={addCoordinator}
      >
        <CoordinatorForm
          id={id}
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
          password={password}
          email={email}
          phoneNumber={phoneNumber}
          programId={programId}
          setId={setId}
          setPassword={setPassword}
          setFirstName={setFirstName}
          setMiddleName={setMiddleName}
          setLastName={setLastName}
          setPhoneNumber={setPhoneNumber}
          setEmail={setEmail}
          setProgramId={setProgramId}
          programs={programs}
          errors={errors}
          requiredFields={{
            id: true,
            password: true,
            firstName: true,
            middleName: false,
            lastName: false,
            phoneNumber: false,
            email: true,
            programId: true,
          }}
        />
      </FormModal>
    </Page>
  );
};

export default AdminManageCoordinatorsPage;
