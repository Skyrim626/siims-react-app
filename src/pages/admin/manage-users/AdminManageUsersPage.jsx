import React, { useState } from "react"; // Importing necessary React hooks for state and lifecycle management
import Section from "../../../components/common/Section"; // Importing Section component for layout structure
import { deleteRequest } from "../../../api/apiHelpers"; // Importing API helper functions for making HTTP requests
import Table from "../../../components/tables/Table"; // Importing Table component for displaying user data
import { useLocation, useNavigate } from "react-router-dom";
import FormModal from "../../../components/modals/FormModal";
import UserFormAdd from "../../../components/forms/UserFormAdd";
import Loader from "../../../components/common/Loader";
import EmptyState from "../../../components/common/EmptyState";
import useSearch from "../../../hooks/test/useSearch";
import DataTable from "../../../components/tables/DataTable";
import useFetch from "../../../hooks/useFetch";

const AdminManageUsersPage = () => {
  // Location and Navigate
  const location = useLocation();
  const navigate = useNavigate();

  // Container state
  const [users, setUsers] = useState([]);

  /**
   * Loading State
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   *
   * Custom Hooks
   *
   *
   *
   */
  // Search Hooks
  const { searchTerm, triggerSearch, handleSearchChange, handleKeyDown } =
    useSearch();
  // Fetch document types with search and pagination
  const {
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    handleNextPage,
    handlePrevPage,
  } = useFetch({
    url: "/users", // URL for Users
    initialPage: 1,
    initialItemsPerPage: 5,
    searchTerm: triggerSearch ? searchTerm : "", // Only pass search term when search is triggered
    setData: setUsers,
    setLoading: setLoading,
  });

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

      {/* Table */}
      {error ? (
        <EmptyState title="Error" message={errors} />
      ) : users && users.length > 0 ? (
        <>
          <DataTable
            data={users} // Pass the fetched data to the table
            includeCheckboxes={true}
            /** Pagination */
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
            ITEMS_PER_PAGE_LISTS={[{ value: 5 }, { value: 25 }, { value: 50 }]}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handleItemsPerPageChange={handleItemsPerPageChange}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            /** Search */
            searchPlaceholder={"Search Users..."}
            searchTerm={searchTerm}
            handleKeyDown={handleKeyDown}
            handleSearchChange={handleSearchChange}
          />
        </>
      ) : (
        <EmptyState
          title="No users available at the moment"
          message="Once activities are recorded, users will appear here."
        />
      )}
    </Section>
  );
};

export default AdminManageUsersPage; // Exporting the component for use in other parts of the application
