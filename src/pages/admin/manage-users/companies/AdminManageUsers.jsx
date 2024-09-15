import React, { useState } from "react";
import Page from "../../../../components/common/Page";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import Section from "../../../../components/common/Section";
import { Download, User, UserRoundPlus } from "lucide-react";
import Button from "../../../../components/common/Button";
import Heading from "../../../../components/common/Heading";
import DynamicTable from "../../../../components/common/Table";

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
const AdminManageUsers = () => {
  // Open Location
  const location = useLocation();

  const [selectedUserType, setSelectedUserType] = useState(buttons[0].type);

  // Load data
  const data = useLoaderData();

  //

  return (
    <Section>
      <DynamicTable
        data={data}
        enableDelete
        enableFilters
        enableSearch
        itemsPerPage={10}
        enableActions
      />
    </Section>
  );
};

export default AdminManageUsers;
