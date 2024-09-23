import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Heading from "../../components/common/Heading";
import AdminManageHeader from "../../components/users/admin/AdminManageUserHeader";
import { getRequest, postRequest, putRequest } from "../../api/apiHelpers";
import AdminRolesTable from "../../components/users/admin/table/AdminRolesTable";
import { Button } from "@headlessui/react";
import AdminUserRolesTable from "../../components/users/admin/table/AdminUserRolesTable";
import FormModal from "../../components/modals/FormModal";
import AdminRoleFormAdd from "./forms/AdminRoleFormAdd";
import useForm from "../../hooks/useForm";
import AdminRoleFormEdit from "./forms/AdminRoleFormEdit";

const AdminManageRolesPage = () => {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Select State
  const [selectedRole, setSelectedRole] = useState(null);

  // Tab State
  const [selectedTab, setSelectedTab] = useState(0);

  // Fetch State
  const [userRoles, setUserRoles] = useState([]);
  const [roles, setRoles] = useState([]);

  // Form State
  // Using the custom hook for Role Information
  const [roleInfo, handleRoleInfoChange] = useForm({
    name: "",
  });

  const [editRoleInfo, handleEditRoleInfoChange] = useForm({
    name: "",
  });

  // Use Effect: Fetching Data
  useEffect(() => {
    // Method: fetchData
    const fetchData = async () => {
      // Response: userRolesResponse
      const userRolesResponse = await getRequest({
        url: "/api/v1/admin/roles/user-roles",
      });

      // Response: rolesResponse
      const rolesResponse = await getRequest({
        url: "/api/v1/admin/roles",
      });

      // Set User Role State
      setUserRoles(userRolesResponse);
      // Set Role State
      setRoles(rolesResponse);
    };

    // Call Method: fetchData
    fetchData();
  }, []);

  // Handle Add Submit
  const handleAddSubmit = async () => {
    // Payload
    const payload = roleInfo;

    // Send Request
    const response = await postRequest({
      url: "/api/v1/admin/roles",
      data: payload,
    });

    // Reset Input
    handleRoleInfoChange({ target: { name: "name", value: "" } });

    // Set Role Again
    setRoles(response.data);
    // Close Modal
    setIsOpen(false);
  };

  // Handle Edit Submit
  const handleEditSubmit = async () => {
    // Ready Payload
    const payload = editRoleInfo;

    // Send Request
    const response = await putRequest({
      url: `/api/v1/admin/roles/${selectedRole["id"]}`,
      data: payload,
    });

    // Reset Input
    handleEditRoleInfoChange({ target: { name: "name", value: "" } });

    // Set Role Again
    setRoles(response.data);

    // Close Modal
    setEditIsOpen(false);
  };

  // Handle Edit Select Role
  const handleEdit = (role) => {
    // Set Role State
    setSelectedRole(role);

    // Pre-fill the roleInfo with the selected role's name
    handleEditRoleInfoChange({ target: { name: "name", value: role.name } });

    // Open Modal
    setEditIsOpen(true);
  };

  return (
    <>
      <Page>
        <Section>
          <Heading level={3} text={"Roles"} />
          <Text className="text-md text-blue-950">
            This is where you manage the roles.
          </Text>
          <hr className="my-3" />
        </Section>
        <Section className="flex gap-5 text-md">
          <Button
            onClick={() => {
              setSelectedTab(0);
            }}
            className={`transition duration-300 border-b-2 border-transparent ${
              selectedTab === 0
                ? " border-b-blue-800 font-bold"
                : "hover:border-blue-900"
            }`}
          >
            User Roles
          </Button>
          <Button
            onClick={() => {
              setSelectedTab(1);
            }}
            className={`transition duration-300 border-b-2 border-transparent ${
              selectedTab === 1
                ? " border-b-blue-800 font-bold"
                : " hover:border-blue-900"
            }`}
          >
            Roles
          </Button>
        </Section>
        <AdminManageHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          addPlaceholder="Add New Role"
        />
        {/* Table */}
        {userRoles.length !== 0 &&
          roles.length !== 0 &&
          roles &&
          (selectedTab === 0 ? (
            <AdminUserRolesTable
              searchPlaceholder={"Search User"}
              data={userRoles}
            />
          ) : (
            <AdminRolesTable
              handleEdit={handleEdit}
              searchPlaceholder="Search Role"
              data={roles}
            />
          ))}

        {/* Form Modal */}
        {/* Add Form Modal */}
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add Role"
          onSubmit={handleAddSubmit}
        >
          <AdminRoleFormAdd
            roleInfo={roleInfo}
            handleRoleInfoChange={handleRoleInfoChange}
          />
        </FormModal>

        {/* Edit Form Modal */}
        {selectedRole && (
          <FormModal
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
            modalTitle="Edit Role"
            onSubmit={handleEditSubmit}
          >
            <AdminRoleFormEdit
              role={selectedRole}
              editRoleInfo={editRoleInfo}
              handleEditRoleInfoChange={handleEditRoleInfoChange}
            />
          </FormModal>
        )}
      </Page>
    </>
  );
};

export default AdminManageRolesPage;
