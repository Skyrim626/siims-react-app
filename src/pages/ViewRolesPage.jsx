import React, { useMemo, useState } from "react";
import Page from "../components/common/Page";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import ManageHeader from "../components/common/ManageHeader";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Button } from "@headlessui/react";
import FormModal from "../components/modals/FormModal";
import RoleForm from "../components/forms/RoleForm";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import Loader from "../components/common/Loader";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

const ViewRolesPage = () => {
  // Row State
  const [rows, setRows] = useState([]);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm } = useForm({
    roleName: "",
  });

  /**
   * Use Request
   */
  const { errors: validationErrors, postData } = useRequest({
    setData: setRows,
    setIsOpen: setIsOpen,
    setLoading: setLoading,
  });

  /**
   * Function that adds a new role
   */
  const addRole = () => {
    // POST METHOD
    postData({
      url: "/roles",
      payload: {
        name: formData.roleName,
        resetForm: resetForm,
      },
    });
  };

  // Static Columns
  const staticColumns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 90,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "name",
        headerName: "Role Name",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
    ],
    []
  );

  const columns = useMemo(() => [...staticColumns], [staticColumns]);

  return (
    <Page>
      <Loader loading={loading} />
      <Section>
        <Heading level={3} text="Manage Roles" />
        <Text className="text-md text-blue-950">
          This is where you manage the roles.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Role"
        showExportButton={false}
        showImportButton={false}
      />

      <DynamicDataGrid
        searchPlaceholder={"Search Roles"}
        allowSearch={false}
        rows={rows}
        setRows={setRows}
        columns={columns}
        url={"/roles"}
      />

      {/* Modals */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Role"
        onSubmit={addRole}
      >
        <RoleForm
          roleName={formData.roleName}
          handleInputChange={handleInputChange}
          errors={validationErrors}
        />
      </FormModal>
    </Page>
  );
};

export default ViewRolesPage;
