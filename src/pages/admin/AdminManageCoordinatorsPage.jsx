import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/common/Page";
import ManageHeader from "../../components/common/ManageHeader";
import Table from "../../components/tables/Table";
import FormModal from "../../components/modals/FormModal";
import CoordinatorForm from "../../components/forms/CoordinatorForm";
import { deleteRequest, postRequest } from "../../api/apiHelpers";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";

const AdminManageCoordinatorsPage = () => {
  // Fetch Coordinators Data
  const { initial_coordinators, programs } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // console.log(initial_coordinators);

  // Set State
  const [coordinators, setCoordinators] = useState(initial_coordinators);

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
    // Set loading state
    setLoading(true);

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
      };

      // console.log(payload);

      // POST
      const response = await postRequest({
        url: "/api/v1/users/coordinators",
        data: payload,
      });

      console.log(response);
      console.log(response.data);

      // Check response
      if (response && response.data) {
        // Set State
        setCoordinators((prevCoordinators) => [
          ...prevCoordinators,
          response.data,
        ]);

        // Close Modal
        setIsOpen(false);

        // navigate(location.pathname, { replace: true });
      }

      // console.log(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Edit Coordinator
  const editCoordinator = async () => {};

  // Soft Delete Coordinator
  const softDeleteCoordinator = async (id) => {
    // console.log(id);
    // Set Loading
    setLoading(true);

    try {
      // DELETE
      const response = await deleteRequest({
        url: `/api/v1/users/coordinators/${id}`,
      });

      // Check response
      if (response) {
        // Filter out the coordinator with the matching ID
        setCoordinators((prevCoordinators) =>
          prevCoordinators.filter((coordinator) => coordinator.id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      {/* Loader */}
      <Loader loading={loading} />

      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Coordinator"
        showExportButton={false}
        showImportButton={false}
      />

      {/* Table */}
      {coordinators.length > 0 ? (
        <Table
          data={coordinators}
          handleEdit={editCoordinator}
          // handleArchive={softDeleteCoordinator}
          includeCheckboxes={false}
        />
      ) : (
        <EmptyState
          title="No coordinators available at the moment"
          message="Once activities are recorded, coordinators will appear here."
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
