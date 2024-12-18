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
  const staticColumns = useMemo(() => {
    const columns = [
      {
        field: "id",
        headerName: "ID",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "company_name",
        headerName: "Company Name",
        width: 450,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "website_url",
        headerName: "Website",
        width: 200,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          <a
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {params.value}
          </a>
        ),
      },
      {
        field: "total_supervisors",
        headerName: "Total Supervisors",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "first_name",
        headerName: "First Name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "middle_name",
        headerName: "Middle Name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "last_name",
        headerName: "Last Name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email_verified_at",
        headerName: "Email Verified At",
        width: 250,
        headerClassName: "super-app-theme--header",
      },

      {
        field: "gender",
        headerName: "Gender",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "phone_number",
        headerName: "Phone Number",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "street",
        headerName: "Street",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "barangay",
        headerName: "Barangay",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "city_municipality",
        headerName: "City/Municipality",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "province",
        headerName: "Province",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "postal_code",
        headerName: "Postal Code",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "updated_at",
        headerName: "Updated At",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
    ];

    if (authorizeRole === "admin") {
      columns.push({
        field: "deleted_at",
        headerName: "Deleted At",
        width: 300,
        headerClassName: "super-app-theme--header",
      });
    }

    return columns;
  }, [authorizeRole]);

  // Action Column
  const actionColumn = useMemo(
    () => ({
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex space-x-2 items-center justify-center">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            onClick={() => handleEditModal(params.row)}
          >
            Edit
          </Button>

          {authorizeRole === "admin" &&
            (params.row.deleted_at ? (
              <Button
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
                onClick={() => console.log("Restored")}
              >
                Restore
              </Button>
            ) : (
              <Button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                onClick={() => handleDeleteModal(params.row)}
              >
                Delete
              </Button>
            ))}
        </div>
      ),
      sortable: false, // Prevent sorting for the actions column
      filterable: false, // Prevent filtering for the actions column
    }),
    [authorizeRole]
  );

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
