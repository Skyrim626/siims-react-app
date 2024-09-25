import React, { useEffect, useState } from "react"; // Importing necessary React hooks for state and lifecycle management
import Section from "../../../components/common/Section"; // Importing Section component for layout structure
import { deleteRequest, getRequest } from "../../../api/apiHelpers"; // Importing API helper functions for making HTTP requests
import Table from "../../../components/tables/Table"; // Importing Table component for displaying user data
import useSearch from "../../../hooks/useSearch"; // Importing custom hook for handling search functionality

// AdminManageUsersPage component handles the management of users in the admin dashboard.
const AdminManageUsersPage = () => {
  // State to store the list of users
  const [users, setUsers] = useState([]); // Initializing state to hold user data

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(users, ""); // Using the custom hook to manage search term and filtered data

  // useEffect hook to fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      // Perform GET request to retrieve users
      const response = await getRequest({
        url: "/api/v1/admin/users", // API endpoint for fetching users
      });

      // Update the state with the fetched user data
      setUsers(response); // Setting the fetched user data in state
    };

    fetchUsers(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Function to handle the archiving of a single user by their ID
  const handleArchive = async (id) => {
    // Perform DELETE request to archive the user
    const response = await deleteRequest({
      url: `/api/v1/admin/users/archive/${id}`, // API endpoint for archiving a user
      method: "delete", // Specify the request method
    });

    // Update the users state with the response data
    setUsers(response.data); // Updating the state with the response data after archiving
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

    // Update the users state with the response data
    setUsers(response.data); // Updating the state with the response data after archiving multiple users
  };

  return (
    <Section>
      {/* Render the Table component if there are users to display */}
      {users.length !== 0 && (
        <Table
          data={users} // Pass the list of users to the Table component
          IDsIsLink={false} // Indicates whether user IDs should be displayed as links
          handleArchiveBySelectedIds={handleArchiveBySelectedIds} // Pass function to handle archiving of selected users
          handleArchive={handleArchive} // Pass function to handle archiving of a single user
          term={term} // Pass the search term for filtering
          filteredData={filteredData} // Pass the filtered user data
          handleSearchChange={handleSearchChange} // Pass function to handle search input changes
        />
      )}
    </Section>
  );
};

export default AdminManageUsersPage; // Exporting the component for use in other parts of the application
