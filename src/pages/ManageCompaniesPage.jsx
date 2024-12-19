import React, { useMemo, useState } from "react";
import Page from "../components/common/Page";
import { Button } from "@headlessui/react";
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
import {
  getCompanyActionColumns,
  getCompanyStaticColumns,
} from "../utils/columns";

const ManageCompaniesPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Row State
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Select State
  const [selectedCompany, setSelectedCompany] = useState({});

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    id: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    street: "",
    barangay: "",
    cityMunicipality: "",
    province: "",
    postalCode: "",

    // Company unique fields
    companyName: "",
    websiteURL: "",
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
      payload: {
        id: formData.id,
        password: formData.password,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        phone_number: formData.phoneNumber,
        street: formData.street,
        barangay: formData.barangay,
        city_municipality: formData.cityMunicipality,
        province: formData.province,
        postal_code: formData.postalCode,
        name: formData.companyName,
        website_url: formData.websiteURL,
      },
      resetForm: resetForm,
    });
  };

  // Function that updates the company
  const updateCompany = () => {
    putData({
      url: `/users/companies/${selectedCompany["id"]}`,
      payload: {
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        phone_number: formData.phoneNumber,
        street: formData.street,
        barangay: formData.barangay,
        city_municipality: formData.cityMunicipality,
        province: formData.province,
        postal_code: formData.postalCode,
        name: formData.companyName,
        website_url: formData.websiteURL,
      },
      selectedData: selectedCompany,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedCompany(row);

    // console.log(row);

    // Set Form Values
    setFormValues({
      firstName: row.first_name,
      middleName: row.middle_name,
      lastName: row.last_name,
      email: row.email,
      gender: row.gender.toLowerCase(),
      phoneNumber: row.phone_number,
      street: row.street,
      barangay: row.barangay,
      cityMunicipality: row.city_municipality,
      province: row.province,
      postalCode: row.postal_code,
      companyName: row.company_name,
      websiteURL: row.website_url,
    });

    // Open Edit Modal
    setEditIsOpen(true);
  };

  /**
   * Function that deletes a company
   */
  const deleteCompany = () => {
    // DELETE METHOD
    deleteData({
      url: `/users/companies/${selectedCompany["id"]}`,
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
        authorizeRole: authorizeRole,
        pathname: location.pathname,
      }),
    [authorizeRole]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getCompanyActionColumns(
        authorizeRole,
        handleEditModal,
        handleDeleteModal
      ),
    [authorizeRole]
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
          <ManageHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            addPlaceholder="Add New Company"
            showExportButton={false}
            showImportButton={false}
          />

          <DynamicDataGrid
            searchPlaceholder={"Search Company"}
            rows={rows}
            setRows={setRows}
            columns={columns}
            url={"/users/companies"}
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
              companyInfo={formData}
              handleCompanyInfoChange={handleInputChange}
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
              companyInfo={formData}
              handleCompanyInfoChange={handleInputChange}
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
