import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Heading from "../../components/common/Heading";
import { postRequest } from "../../api/apiHelpers";
import AdminRolesTable from "../../components/users/admin/table/AdminRolesTable";
import { Button } from "@headlessui/react";
import AdminUserRolesTable from "../../components/users/admin/table/AdminUserRolesTable";
import FormModal from "../../components/modals/FormModal";
import AdminRoleFormAdd from "./forms/AdminRoleFormAdd";
import ManageHeader from "../../components/common/ManageHeader";
import { useLoaderData } from "react-router-dom";
import Table from "../../components/tables/Table";

const AdminManageRolesPage = () => {
  // Retrieve the user_roles data from the loader
  const { initialRoles, userRoles } = useLoaderData();

  // console.log(userRoles);

  // State for roles and form modal
  const [roles, setRoles] = useState(initialRoles);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  // Form input and errors
  const [roleName, setRoleName] = useState("");
  const [errors, setErrors] = useState({});

  // Submit new role data
  const submitRole = async () => {
    try {
      // Prepare the payload
      const payload = {
        name: roleName,
      };

      // Make the POST request
      const response = await postRequest({
        url: "/api/v1/admin/roles",
        data: payload,
      });

      // Add the new role to the local state
      setRoles((prevRoles) => [...prevRoles, response.data]);

      // Reset form and close modal on success
      setRoleName("");
      setErrors({});
      setIsOpen(false);
    } catch (error) {
      // Handle and set errors
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <Page>
      <Section>
        <Heading level={3} text="Roles" />
        <Text className="text-md text-blue-950">
          This is where you manage the roles.
        </Text>
        <hr className="my-3" />
      </Section>
      <Section className="flex gap-5 text-md">
        <Button
          onClick={() => setSelectedTab(0)}
          className={`transition duration-300 border-b-2 border-transparent ${
            selectedTab === 0
              ? "border-b-blue-800 font-bold"
              : "hover:border-blue-900"
          }`}
        >
          User Roles
        </Button>
        <Button
          onClick={() => setSelectedTab(1)}
          className={`transition duration-300 border-b-2 border-transparent ${
            selectedTab === 1
              ? "border-b-blue-800 font-bold"
              : "hover:border-blue-900"
          }`}
        >
          Roles
        </Button>
      </Section>
      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Role"
        showAllButtons={selectedTab === 1}
      />

      {selectedTab === 0 ? (
        <AdminUserRolesTable searchPlaceholder="Search User" data={userRoles} />
      ) : (
        <Table data={roles} includeCheckboxes={false} />
      )}

      {/* {selectedTab === 0 ? (
        <AdminUserRolesTable searchPlaceholder="Search User" data={userRoles} />
      ) : (
        <AdminRolesTable searchPlaceholder="Search Role" data={roles} />
      )} */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Role"
        onSubmit={submitRole}
      >
        <AdminRoleFormAdd
          roleName={roleName}
          setRoleName={setRoleName}
          errors={errors}
        />
      </FormModal>
    </Page>
  );
};

export default AdminManageRolesPage;
