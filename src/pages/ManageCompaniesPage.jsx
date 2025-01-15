import React, { useEffect, useMemo, useState } from "react";
import Page from "../components/common/Page";
import { Button, Select } from "@headlessui/react";
import Loader from "../components/common/Loader";
import ManageHeader from "../components/common/ManageHeader";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import FormModal from "../components/modals/FormModal";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import CompanyForm from "../components/forms/CompanyForm";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import { personalInfo } from "../formDefaults/personalInfo";
import { GET_API_ROUTE_PATH, PUT_API_ROUTE_PATH } from "../api/resources";
import { companyInfo } from "../formDefaults/companyInfo";
import { loginInfo } from "../formDefaults/loginInfo";
import { addressInfo } from "../formDefaults/addressInfo";
import {
  getCompanyActionColumns,
  getCompanyStaticColumns,
} from "../utils/columns/companiesColumns";

const ManageCompaniesPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Row State
  const [rows, setRows] = useState([]);

  /**
   *
   *
   *
   * URL State
   *
   *
   */
  const [dataGridUrl, setDataGridUrl] = useState("/users/companies");

  /**
   *
   *
   * Modal State
   *
   *
   *
   */
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);

  /**
   * ! ONLY: ADMIN CAN DO THIS STATE
   */
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /**
   *
   *
   * Select State
   *
   *
   *
   */
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState({});

  useEffect(() => {
    setDataGridUrl(
      selectedStatus === "archived"
        ? `${GET_API_ROUTE_PATH.companies}?status=archived`
        : GET_API_ROUTE_PATH.companies
    );
  }, [selectedStatus]);

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    ...loginInfo,
    ...personalInfo,
    ...addressInfo,
    ...companyInfo,
  });

  /**
   * Use Request
   */
  const {
    errors: validationErrors,
    postData,
    putData,
    deleteData,
  } = useRequest({
    setData: setRows,
    setIsOpen: setIsOpen,
    setLoading: setLoading,
  });

  // Function that adds new company
  const addCompany = () => {
    // POST METHOD
    postData({
      url: "/users/companies",
      payload: formData,
      resetForm: resetForm,
    });
  };

  // Function that updates the company
  const updateCompany = () => {
    putData({
      url: `/users/companies/${selectedCompany["id"]}`,
      payload: formData,
      selectedData: selectedCompany,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that restore a deleted company type
   */
  const restoreCompany = (id) => {
    // console.log(id);

    // UPDATE METHOD
    putData({
      url: `${PUT_API_ROUTE_PATH.companies}/${id}/restore`,
      id: id,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedCompany(row);

    // Set Form Values
    setFormValues({
      ...row,
      name: row.company_name,
      gender: row.gender ? row.gender.toLowerCase() : row.gender,
    });

    // Open Edit Modal
    setEditIsOpen(true);
  };

  /**
   * Function that deletes a company
   */
  const deleteCompany = () => {
    // console.log(selectedCompany);

    // DELETE METHOD
    deleteData({
      url: `/users/v2/companies/${selectedCompany["id"]}`,
      id: selectedCompany["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedCompany(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getCompanyStaticColumns({
        pathname: location.pathname,
        selectedStatus: selectedStatus,
      }),
    [authorizeRole, selectedStatus]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getCompanyActionColumns(
        selectedStatus,
        handleEditModal,
        handleDeleteModal,
        restoreCompany
      ),
    [authorizeRole, selectedStatus]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <>
      <Page className={`${authorizeRole !== "admin" ? "px-4" : ""}`}>
        <Loader loading={loading} />

        {/* For those roles that is not admin */}
        {authorizeRole !== "admin" && (
          <Section>
            <Heading level={3} text="Manage Companies" />
            <Text className="text-md text-blue-950">
              This is where you manage the companies.
            </Text>
            <hr className="my-3" />
          </Section>
        )}

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="archived">Archived</option>
            </Select>

            <ManageHeader
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              addPlaceholder="Add New Company"
              showExportButton={false}
              showImportButton={false}
            />
          </div>

          <DynamicDataGrid
            searchPlaceholder={"Search Company"}
            rows={rows}
            setRows={setRows}
            columns={columns}
            url={dataGridUrl}
            checkboxSelection={false}
          />

          {/* Modals */}
          {/* Add Form Modal */}
          <FormModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle="Add Company"
            onSubmit={addCompany}
          >
            <CompanyForm
              method="post"
              formData={formData}
              handleCompanyInfoChange={handleInputChange}
              errors={validationErrors}
            />
          </FormModal>

          {/* Edit Form Modal */}
          <FormModal
            isOpen={isEditOpen}
            setIsOpen={setEditIsOpen}
            modalTitle="Edit Company"
            onSubmit={updateCompany}
          >
            <CompanyForm
              method="put"
              formData={formData}
              handleCompanyInfoChange={handleInputChange}
              errors={validationErrors}
            />
          </FormModal>

          {/* Delete Form Modal */}
          <DeleteConfirmModal
            open={isDeleteOpen}
            setOpen={setIsDeleteOpen}
            title={`Delete ${selectedCompany["company_name"]}?`}
            message="Are you sure you want to delete this company?"
            handleDelete={deleteCompany}
          />
        </div>
      </Page>
    </>
  );
};

export default ManageCompaniesPage;
