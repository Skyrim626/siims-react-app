import React, { useEffect, useState } from "react"; // Importing necessary React hooks for state and lifecycle management
import Section from "../../../components/common/Section"; // Importing Section component for layout structure
import { deleteRequest, getRequest } from "../../../api/apiHelpers"; // Importing API helper functions for making HTTP requests
import Table from "../../../components/tables/Table"; // Importing Table component for displaying user data
import useSearch from "../../../hooks/useSearch"; // Importing custom hook for handling search functionality
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ManageHeader from "../../../components/common/ManageHeader";
import FormModal from "../../../components/modals/FormModal";
import UserFormAdd from "../../../components/forms/UserFormAdd";
import ConfirmationModal from "../../../components/common/ConfirmationModal";

// AdminManageUsersPage component handles the management of users in the admin dashboard.
const AdminManageUsersPage = () => {
  const { users, programs, colleges } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(users, ""); // Using the custom hook to manage search term and filtered data

  // Add new user
  const addUser = async (id) => {
    console.log(testing);
  };

  // Soft Deletes a User
  const softDeleteUser = async (id) => {
    const response = await deleteRequest({
      url: `/api/v1/users/${id}/soft-delete`,
      method: "delete",
    });

    setUsers(response.data);

    // Check response
    if (response) {
      navigate(location.pathname, { replace: true });
    }
  };

  // Function to handle the archiving of multiple users based on selected IDs
  const handleArchiveBySelectedIds = async (selectedIds) => {
    // Prepare payload containing the selected user IDs
    const payload = { ids: Array.from(selectedIds) }; // Converting selected IDs to an array for the payload

    // Perform POST request to archive the selected users
    const response = await deleteRequest({
      url: "/api/v1/admin/users/archive/selected", // API endpoint for archiving selected users
      data: payload, // Include the payload with selected IDs
      method: "post", // Specify the request method
    });

    if (response) {
      // Navigate the same
      navigate(location.pathname);
    }
  };

  // Handle confirmation modal actions
  const handleConfirm = () => {
    if (selectedUserId) {
      handleArchive(selectedUserId);
      setIsConfirmOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    setSelectedUserId(null);
  };

  return (
    <Section>
      {/* <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New User"
        showExportButton={false}
        showImportButton={false}
      /> */}
      <Table
        data={users}
        // IDsIsLink={false}
        handleArchiveBySelectedIds={handleArchiveBySelectedIds}
        handleArchive={softDeleteUser}
        term={term}
        filteredData={filteredData}
        handleSearchChange={handleSearchChange}
      />

      {/* Form Modal for Adding User */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add User"
        onSubmit={addUser}
      >
        <UserFormAdd programs={programs} colleges={colleges} />
      </FormModal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        title="Archive User"
        message="Are you sure you want to remove this user? This action cannot be undone."
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Section>
  );
};

export default AdminManageUsersPage; // Exporting the component for use in other parts of the application
