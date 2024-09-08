import React, { useState } from "react";
import Page from "../../components/common/Page";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import Section from "../../components/common/Section";
import { Download, User, UserRoundPlus } from "lucide-react";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import DynamicTable from "../../components/common/Table";

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

// Admin Manage Users Page
const AdminManageUsers = () => {
  // Open Location
  const location = useLocation();
  const [selectedUserType, setSelectedUserType] = useState(buttons[0].type);

  // Load data
  const data = useLoaderData();

  return (
    <Page>
      <Section className="mt-4">
        <div className="flex justify-between items-center">
          <div>
            <Heading level={2} text={"Users"} />
            <p className="text-blue-950">Manage different types of users</p>
          </div>
        </div>
        <hr className="my-3" />
      </Section>

      <Section>
        <div className="flex space-x-4 mb-4">
          {buttons.map((button, index) => {
            return (
              <Button
                key={index}
                className={`rounded-md p-3 font-bold text-white bg-blue-600 ${
                  selectedUserType === button.type
                    ? "bg-blue-800"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() => setSelectedUserType(button.type)}
              >
                {button.label}
              </Button>
            );
          })}
        </div>
        {selectedUserType === "users" ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {navUsers.map((navUser) => {
              return (
                <Link to={`${location.pathname + navUser.path}`}>
                  <div className="testing h-[250px] rounded-md flex items-center justify-center border-2 border-blue-700 transition duration-100 hover:bg-blue-700 group">
                    <div className="flex flex-col gap-2 items-center justify-center group-hover:text-white">
                      <User size={40} />
                      <span className="font-bold text-md">{navUser.name}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <DynamicTable
            data={data}
            enableDelete
            enableFilters
            enableSearch
            filterLabels={[
              "All",
              "Dean",
              "Chairperson",
              "Coordinator",
              "Company",
              "OSA",
              "Student",
              "Supervisor",
              "Work Provider",
            ]}
            itemsPerPage={10}
            enableActions
          />
        )}
      </Section>
    </Page>
  );
};

export default AdminManageUsers;
