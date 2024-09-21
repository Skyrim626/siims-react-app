import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Section from "../../../components/common/Section";
import { getRequest } from "../../../api/apiHelpers";
import AdminUserTableView from "../../../components/tables/AdminUserTableView";
import Table from "../../../components/tables/Table";

// User Selection Links
const navUsers = [
  {
    path: "/deans",
    name: "Deans",
  },
  {
    path: "/chairpersons",
    name: "Chairpersons",
  },
  {
    path: "/coordinators",
    name: "Coordinators",
  },

  {
    path: "/students",
    name: "Students",
  },
  {
    path: "/companies",
    name: "Companies",
  },
  {
    path: "/departments",
    name: "Departments",
  },
  {
    path: "/work-providers",
    name: "Work Providers",
  },
];

// Configure User buttons
const buttons = [
  {
    type: "users",
    label: "Users",
  },
  {
    type: "table",
    label: "Table",
  },
];

// Role Labels
const userTypeLabels = [
  {
    to: "/admin/users",
    role: "All",
  },
  {
    to: "/admin/users/deans",
    role: "Deans",
  },
  {
    to: "/admin/users/chairpersons",
    role: "Chairpersons",
  },
  {
    to: "/admin/users/coordinators",
    role: "Coordinators",
  },
  {
    to: "/admin/users/companies",
    role: "Companies",
  },
  {
    to: "/admin/users/osa",
    role: "Osa",
  },
  {
    to: "/admin/users/students",
    role: "Students",
  },
  {
    to: "/admin/users/supervisors",
    role: "Supervisors",
  },
];

// Admin Manage Users Page
const AdminManageUsersPage = () => {
  // Open Location
  const location = useLocation();
  const [selectedUserType, setSelectedUserType] = useState(buttons[0].type);

  // States
  // Users
  const [users, setUsers] = useState([]);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getRequest({
        url: "/api/v1/admin/users",
      });

      // Set users
      setUsers(response);

      /* console.log(response); */
    };

    fetchUsers();
  }, []);

  return (
    <Section>
      {users.length !== 0 && (
        <Table data={users}>
          <AdminUserTableView />
        </Table>
      )}
    </Section>
  );
};

export default AdminManageUsersPage;
