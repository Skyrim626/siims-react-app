import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Heading from "../../components/common/Heading";
import { getRequest } from "../../api/apiHelpers";
import AdminRolesTable from "../../components/users/admin/table/AdminRolesTable";
import { Button } from "@headlessui/react";
import AdminUserRolesTable from "../../components/users/admin/table/AdminUserRolesTable";
import FormModal from "../../components/modals/FormModal";
import AdminRoleFormAdd from "./forms/AdminRoleFormAdd";
import useForm from "../../hooks/useForm";
import AdminRoleFormEdit from "./forms/AdminRoleFormEdit";
import useHandleSubmit from "../../hooks/useHandleSubmit"; // Import your custom hook
import ManageHeader from "../../components/common/ManageHeader";

const AdminManageRolesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [userRoles, setUserRoles] = useState([]);
  const [roles, setRoles] = useState([]);

  const [roleInfo, handleRoleInfoChange] = useForm({ name: "" });
  const [editRoleInfo, handleEditRoleInfoChange] = useForm({ name: "" });
  const { handleSubmit, isSubmitting, error } = useHandleSubmit();

  // Combined fetch logic
  const fetchRolesData = async () => {
    const userRolesResponse = await getRequest({
      url: "/api/v1/admin/roles/user-roles",
    });
    const rolesResponse = await getRequest({ url: "/api/v1/admin/roles" });
    setUserRoles(userRolesResponse);
    setRoles(rolesResponse);
  };

  useEffect(() => {
    fetchRolesData();
  }, []);

  // Submits Data
  const submitRole = async (isEdit) => {
    const payload = isEdit ? editRoleInfo : roleInfo;
    const url = isEdit
      ? `/api/v1/admin/roles/${selectedRole.id}`
      : "/api/v1/admin/roles";

    await handleSubmit({
      url,
      method: isEdit ? "put" : "post",
      data: payload,
      resetField: isEdit
        ? handleEditRoleInfoChange({
            target: { name: "name", value: "" },
          })
        : handleRoleInfoChange({
            target: { name: "name", value: "" },
          }),
      setState: setRoles,
      closeModal: () => {
        if (isEdit) {
          setEditIsOpen(false);
        } else {
          setIsOpen(false);
        }
      },
    });
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    handleEditRoleInfoChange({ target: { name: "name", value: role.name } });
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
        />
        {userRoles.length > 0 &&
          roles.length > 0 &&
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
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add Role"
          onSubmit={() => submitRole(false)}
        >
          <AdminRoleFormAdd
            roleInfo={roleInfo}
            handleRoleInfoChange={handleRoleInfoChange}
          />
        </FormModal>
        {selectedRole && (
          <FormModal
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
            modalTitle="Edit Role"
            onSubmit={() => submitRole(true)}
          >
            <AdminRoleFormEdit
              role={selectedRole}
              editRoleInfo={editRoleInfo}
              handleEditRoleInfoChange={handleEditRoleInfoChange}
            />
          </FormModal>
        )}
        {isSubmitting && <p>Submitting...</p>}
        {error && <p>Error: {error}</p>}
      </Page>
    </>
  );
};

export default AdminManageRolesPage;
