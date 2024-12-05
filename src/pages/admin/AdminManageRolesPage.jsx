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
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import useFetch from "../../hooks/useFetch";
import useRequest from "../../hooks/useRequest";
import DataTable from "../../components/tables/DataTable";
import useSearch from "../../hooks/test/useSearch";

const AdminManageRolesPage = () => {
  // Retrieve the user_roles data from the loader
  const { userRoles } = useLoaderData();

  // Container Data
  const [roles, setRoles] = useState([]);

  // Loader, Select, Modal State
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  // Form input and errors
  const [roleName, setRoleName] = useState("");

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
    url: "/roles", // URL for document types
    initialPage: 1,
    initialItemsPerPage: 5,
    searchTerm: triggerSearch ? searchTerm : "", // Only pass search term when search is triggered
    setData: setRoles,
    setLoading: setLoading,
  });

  /**
   * Use Request
   */
  const { errors, postData } = useRequest({
    setData: setRoles,
    setLoading,
    setIsOpen: setIsOpen,
  });

  // Submit new role data
  const addNewRole = async () => {
    // Prepare the payload
    const payload = {
      name: roleName,
    };

    postData({
      url: "/roles",
      payload: payload,
    });
  };

  return (
    <Page>
      <Loader loading={loading} />

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
        showImportButton={false}
        showExportButton={false}
      />

      {selectedTab === 0 ? (
        <AdminUserRolesTable searchPlaceholder="Search User" data={userRoles} />
      ) : roles && roles.length > 0 ? (
        <DataTable
          data={roles} // Pass the fetched data to the table
          // handleEdit={grabDocumentType}
          includeCheckboxes={false}
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
          searchPlaceholder={"Search Roles..."}
          searchTerm={searchTerm}
          handleKeyDown={handleKeyDown}
          handleSearchChange={handleSearchChange}
        />
      ) : (
        <EmptyState
          title="No roles available at the moment"
          message="Once activities are recorded, roles will appear here."
        />
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
        onSubmit={addNewRole}
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
