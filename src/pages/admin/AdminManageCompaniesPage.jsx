import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import AdminManageHeader from "../../components/users/admin/AdminManageUserHeader";
import AdminCompaniesTable from "../../components/users/admin/table/AdminCompaniesTable";
import { getRequest, postRequest } from "../../api/apiHelpers";
import useForm from "../../hooks/useForm";
import FormModal from "../../components/modals/FormModal";
import AdminCompanyFormAdd from "./forms/AdminCompanyFormAdd";

const AdminManageCompaniesPage = () => {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Select State
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Fetch State
  const [companies, setCompanies] = useState([]);

  // Form State
  // Using the custom hook for Company Information
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
            /* handleArchiveBySelectedIds={handleArchiveBySelectedIds} */
            data={companies}
            /* handleEdit={handleEdit} */
            /* handleArchive={handleArchive} */
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
      </Section>
    </>
  );
};

export default AdminManageCompaniesPage;
