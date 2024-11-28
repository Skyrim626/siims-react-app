import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import { getRequest, postRequest, putRequest } from "../../api/apiHelpers";
import useForm from "../../hooks/useForm";
import FormModal from "../../components/modals/FormModal";
import ChairpersonManageHeader from "../../components/users/chairperson/ChairpersonManageHeader";
import ChairpersonCompanyFormAdd from "../../components/users/chairperson/forms/ChairpersonCompanyFormAdd";
import ChairpersonCompaniesTable from "../../components/users/chairperson/table/ChairpersonCompaniesTable";

// Chairperson Companies Page
const ChairpersonManageCompaniesPage = () => {
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
        url: "/api/v1/chairperson/companies",
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
      url: "/api/v1/chairperson/companies",
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
        <ChairpersonManageHeader
          addPlaceholder="Add New Company"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        {companies.length !== 0 && (
          <ChairpersonCompaniesTable
            data={companies}
            searchPlaceholder="Search Companies"
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
          <ChairpersonCompanyFormAdd
            companyInfo={companyInfo}
            handleCompanyInfoChange={handleCompanyInfoChange}
          />
        </FormModal>
      </Page>
    </>
  );
};

export default ChairpersonManageCompaniesPage;
