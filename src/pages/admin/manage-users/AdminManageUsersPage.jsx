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
import Loader from "../../../components/common/Loader";
import EmptyState from "../../../components/common/EmptyState";

// AdminManageUsersPage component handles the management of users in the admin dashboard.
const AdminManageUsersPage = () => {
  const { initial_users, programs, colleges } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Container state
  const [users, setUsers] = useState(initial_users);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(users, ""); // Using the custom hook to manage search term and filtered data
  // Function to handle the archiving of multiple users based on selected IDs
  const handleArchiveBySelectedIds = async (selectedIds) => {
    // Set loading state
    setLoading(true);

    try {
      // Prepare payload containing the selected user IDs
      const payload = { ids: Array.from(selectedIds) };
      // console.log(payload);
      // Perform POST request to archive the selected users
      const response = await deleteRequest({
        url: "/api/v1/users/archive/selected",
        data: payload,
        method: "post",
      });

      // console.log(response);
      // Check Response
      if (response) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <Loader loading={loading} />

      {users.length > 0 ? (
        <Table
          data={users}
          // IDsIsLink={false}
          handleArchiveBySelectedIds={handleArchiveBySelectedIds}
          term={term}
          filteredData={filteredData}
          handleSearchChange={handleSearchChange}
        />
      ) : (
        <EmptyState
          title="No users available at the moment"
          message="Once activities are recorded, users will appear here."
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

      {/* Form Modal for Adding User */}
      <FormModal isOpen={isOpen} setIsOpen={setIsOpen} modalTitle="Add User">
        <UserFormAdd programs={programs} colleges={colleges} />
      </FormModal>
    </Section>
  );
};

export default AdminManageUsersPage; // Exporting the component for use in other parts of the application
