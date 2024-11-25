import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../../../api/apiHelpers";
import Section from "../../../../components/common/Section";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../../components/common/Modal";
import AdminManageHeader from "../../../../components/users/admin/AdminManageUserHeader";
import ChairpersonFormAdd from "../../forms/ChairpersonFormAdd";
import useSearch from "../../../../hooks/useSearch";
import Table from "../../../../components/tables/Table";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ManageHeader from "../../../../components/common/ManageHeader";
import FormModal from "../../../../components/modals/FormModal";
import ChairpersonForm from "../../../../components/forms/ChairpersonForm";

const AdminManageChairpersonsPage = () => {
  // Fetch Chaipersons and Programs data
  const { chairpersons, programs } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Chairperson Input State
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [programId, setProgramId] = useState("");
  const [errors, setErrors] = useState({});

  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Selected Data State
  const [selectedData, setSelectedData] = useState({});

  /**
   * Allow State
   */
  // Allow Coordinator Inclusion
  const [isCheckAllowCoordinator, setIsCheckAllowCoordinator] = useState(0);

  // Soft Delete Chairperson
  const softDeleteChairperson = async (id) => {
    console.log(id);
  };

  // Edit Chairperson
  const editChairperson = async () => {};

  // Grab Chairperson
  const grabChairperson = (chairperson) => {
    console.log(chairperson);
  };

  // Add Chairperson (optional: allow coordinaator)
  const addChairperson = async (e) => {
    e.preventDefault();

    // console.log("Checkbox value:", isCheckAllowCoordinator);

    try {
      // Ready Payload
      const payload = {
        id,
        password,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        program_id: programId,
        allow_coordinator: isCheckAllowCoordinator,
      };

      console.log(payload);

      // POST
      const response = await postRequest({
        url: "/api/v1/users/chairpersons",
        data: payload,
      });

      // Check response
      if (response) {
        setIsOpen(!isOpen);
        navigate(location.pathname, { replace: true });
        // window.location.reload();
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <Section>
      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Chairperson"
        showImportButton={false}
        showExportButton={false}
      />

      <Table
        data={chairpersons}
        handleEdit={grabChairperson}
        handleArchive={softDeleteChairperson}
      />

      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Chairperson"
        onSubmit={addChairperson}
      >
        <ChairpersonForm
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
          isCheckAllowCoordinator={isCheckAllowCoordinator}
          setIsCheckAllowCoordinator={setIsCheckAllowCoordinator}
        />
      </FormModal>
    </Section>
  );
};

export default AdminManageChairpersonsPage;
