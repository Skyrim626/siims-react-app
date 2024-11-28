import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import DeanManageHeader from "../../components/users/dean/DeanManageHeader";
import { getRequest, postRequest, putRequest } from "../../api/apiHelpers";
import DeanCompaniesTable from "../../components/users/dean/table/DeanCompaniesTable";
import useForm from "../../hooks/useForm";
import FormModal from "../../components/modals/FormModal";
import DeanCompanyFormAdd from "../../components/users/dean/forms/DeanCompanyFormAdd";
import EmptyState from "../../components/common/EmptyState";

// Dean Companies Page
const DeanManageCompaniesPage = () => {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Fetch State
  const [companies, setCompanies] = useState([]);

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

  // Use Effect: Fetching Data
  useEffect(() => {
    // Method: fetchCompanies
    const fetchCompanies = async () => {
      const response = await getRequest({
        url: "/api/v1/dean/companies",
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

    console.log(payload);

    // Send Request
    const response = await postRequest({
      url: "/api/v1/dean/companies",
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
      <Page>
        <Section>
          <Heading level={3} text={"Companies"} />
          <Text className="text-sm text-blue-950">
            This is where you manage companies.
          </Text>
          <hr className="my-3" />
        </Section>
        <DeanManageHeader
          addPlaceholder="Add New Company"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {companies.length > 0 ? (
          <DeanCompaniesTable
            data={companies}
            searchPlaceholder="Search Companies"
          />
        ) : (
          <EmptyState
            title="No companies available at the moment"
            message="Once activities are recorded, companies will appear here."
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
          <DeanCompanyFormAdd
            companyInfo={companyInfo}
            handleCompanyInfoChange={handleCompanyInfoChange}
          />
        </FormModal>
      </Page>
    </>
  );
};

export default DeanManageCompaniesPage;
