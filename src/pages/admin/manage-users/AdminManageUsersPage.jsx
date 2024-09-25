import React, { useEffect, useState } from "react";
import Section from "../../../components/common/Section";
import { deleteRequest, getRequest } from "../../../api/apiHelpers";
import Table from "../../../components/tables/Table";

// AdminManageUsersPage component handles the management of users in the admin dashboard.
const AdminManageUsersPage = () => {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  // useEffect hook to fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      // Perform GET request to retrieve users
      const response = await getRequest({
        url: "/api/v1/admin/users",
      });

      // Update the state with the fetched user data
      setUsers(response);
    };

    fetchUsers(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Function to handle the archiving of a single user by their ID
  const handleArchive = async (id) => {
    // Perform DELETE request to archive the user
    const response = await deleteRequest({
      url: `/api/v1/admin/users/archive/${id}`,
      method: "delete",
    });

    // Update the users state with the response data
    setUsers(response.data);
  };

  // Function to handle the archiving of multiple users based on selected IDs
  const handleArchiveBySelectedIds = async (selectedIds) => {
    // Prepare payload containing the selected user IDs
    const payload = { ids: Array.from(selectedIds) };

    // Perform POST request to archive the selected users
    const response = await deleteRequest({
      url: "/api/v1/admin/users/archive/selected",
      data: payload,
      method: "post",
    });

    // Update the users state with the response data
    setUsers(response.data);
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
        />
      )}
    </Section>
  );
};

export default AdminManageUsersPage;
