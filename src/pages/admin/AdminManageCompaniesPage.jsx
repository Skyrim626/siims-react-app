import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import AdminManageHeader from "../../components/users/admin/AdminManageUserHeader";
import AdminCompaniesTable from "../../components/users/admin/table/AdminCompaniesTable";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/apiHelpers";
import useForm from "../../hooks/useForm";
import FormModal from "../../components/modals/FormModal";
import AdminCompanyFormAdd from "./forms/AdminCompanyFormAdd";
import AdminCompanyFormEdit from "./forms/AdminCompanyFormEdit";
import useSearch from "../../hooks/useSearch";
import Table from "../../components/tables/Table";

// AdminManageCompaniesPage component handles the management of companies in the admin dashboard.
const AdminManageCompaniesPage = () => {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Select State
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Fetch State
  const [companies, setCompanies] = useState([]);

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(companies, ""); // Using the custom hook to manage search term and filtered data

  // Form State
  // Using the custom hook for Company Information (Add)
  const [companyInfo, handleCompanyInfoChange, resetCompanyInfo] = useForm({
    id: "",
    password: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone_number: "",
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    postal_code: "",
    company_name: "",
    website_url: "",
  });

  // Using the custom hook for Company Information (Edit)
  const [
    editCompanyInfo,
    handleEditCompanyInfoChange,
    resetEditCompanyInfo,
    setEditCompanyInfo,
  ] = useForm({
    id: "",
    password: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone_number: "",
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    postal_code: "",
    company_name: "",
    website_url: "",
  });

  // Use Effect: Fetching Data
  useEffect(() => {
    // Method: fetchCompanies
    const fetchCompanies = async () => {
      const response = await getRequest({
        url: "/api/v1/admin/users/companies",
      });
      // Set Companies State
      setCompanies(response);
    };
    // Call Method: fetchCompanies
    fetchCompanies();
  }, []);

  // Handle Add Submit
  const handleAddSubmit = async () => {
    // Payload
    const payload = companyInfo;

    // Send Request
    const response = await postRequest({
      url: "/api/v1/admin/users/companies",
      data: payload,
    });

    // Reset Input
    resetCompanyInfo();

    // Set Company State
    setCompanies(response.data);
    // Close Modal
    setIsOpen(false);
  };

  // Handle Edit Select Company
  const handleEdit = (company) => {
    // console.log(company);

    // Set Company State
    setSelectedCompany(company);

    // Pre-fill the editCompanyInfo with the selected company's details
    setEditCompanyInfo({
      id: company.id || "",
      first_name: company.first_name || "",
      middle_name: company.middle_name || "",
      last_name: company.last_name || "",
      email: company.email || "",
      gender: company.gender || "",
      phone_number: company.phone_number || "",
      street: company.street || "",
      barangay: company.barangay || "",
      city_municipality: company.city_municipality || "",
      province: company.province || "",
      postal_code: company.postal_code || "",
      company_name: company.company_name || "",
      website_url: company.website_url || "",
    });

    // Open Modal
    setEditIsOpen(true);
  };

  // Handle Edit Submit
  const handleEditSubmit = async () => {
    // Ready Payload
    const payload = editCompanyInfo;

    // Send Request
    const response = await putRequest({
      url: `/api/v1/admin/users/companies/${selectedCompany["id"]}`,
      data: payload,
    });

    // Reset Input
    resetEditCompanyInfo();

    // Set Company Again
    setCompanies(response.data);

    // Close Modal
    setEditIsOpen(false);
  };

  // Handle Archive
  const handleArchive = async (id) => {
    // Send Request
    const response = await deleteRequest({
      url: `/api/v1/admin/users/companies/archive/${id}`,
      method: "delete",
    });

    // Set Company State
    setCompanies(response.data);
  };

  // Handle Archive Selected Id's
  const handleArchiveBySelectedIds = async (selectedIds) => {
    // console.log(selectedIds);
    // Ready Payload
    const payload = { ids: Array.from(selectedIds) };

    // Send Request
    const response = await deleteRequest({
      url: "/api/v1/admin/users/companies/archive/selected",
      data: payload,
      method: "post",
    });

    // Set Companies State
    setCompanies(response.data);
  };

  return (
    <>
      <Section>
        <AdminManageHeader
          addPlaceholder="Add New Company"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* Table */}
        {companies.length !== 0 && (
          <AdminCompaniesTable
            handleArchiveBySelectedIds={handleArchiveBySelectedIds}
            data={companies}
            handleEdit={handleEdit}
            handleArchive={handleArchive}
            term={term}
            filteredData={filteredData}
            handleSearchChange={handleSearchChange}
          />
        )}

        {/* Form Modal */}
        {/* Add Form Modal */}
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add Company"
          onSubmit={handleAddSubmit}
        >
          <AdminCompanyFormAdd
            companyInfo={companyInfo}
            handleCompanyInfoChange={handleCompanyInfoChange}
          />
        </FormModal>

        {/* Edit Form Modal */}
        <FormModal
          isOpen={editIsOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit Company"
          onSubmit={handleEditSubmit}
        >
          <AdminCompanyFormEdit
            companyInfo={editCompanyInfo}
            handleCompanyInfoChange={handleEditCompanyInfoChange}
          />
        </FormModal>
      </Section>
    </>
  );
};

export default AdminManageCompaniesPage;
