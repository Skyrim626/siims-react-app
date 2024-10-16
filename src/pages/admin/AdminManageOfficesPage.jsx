import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import useSearch from "../../hooks/useSearch";
import { getRequest, postRequest, putRequest } from "../../api/apiHelpers";
import Table from "../../components/tables/Table";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/common/Modal";
import OfficeForm from "../../components/forms/OfficeForm";
import useForm from "../../hooks/useForm";

const AdminManageOfficesPage = () => {
  // State to store the list of offices
  const [offices, setOffices] = useState([]); // Initializing state to hold offices data
  // State to store the list of office types
  const [officeTypes, setOfficeTypes] = useState([]); // Initializing state to hold office type data
  // State to store the list of companies
  const [companies, setCompanies] = useState([]); // Initializing state to hold companies data

  // Select Office State
  const [selectedOffice, setSelectedOffice] = useState(null);

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(offices, ""); // Using the custom hook to manage search term and filtered data

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Form State
  // Using the custom hook for Office Information (Add)
  const [officeInfo, handleOfficeInfoChange, resetOfficeInfo] = useForm({
    company_id: "",
    name: "",
    phone_number: "",
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    postal_code: "",
    office_type_id: "",
  });

  // Form State
  // Using the custom hook for Office Information (Edit)
  const [
    editOfficeInfo,
    handleEditOfficeInfoChange,
    resetEditOfficeInfo,
    setEditOfficeInfo,
  ] = useForm({
    company_id: "",
    name: "",
    phone_number: "",
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    postal_code: "",
    office_type_id: "",
  });

  // useEffect hook to fetch offices from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Perform GET request to retrieve offices
      const officeResponse = await getRequest({
        url: "/api/v1/admin/offices", // API endpoint for fetching offices
      });

      // Update the state with the fetched office data
      setOffices(officeResponse); // Setting the fetched office data in state

      // Perform GET request to retrieve office types
      const officeTypeResponse = await getRequest({
        url: "/api/v1/admin/offices/types", // API endpoint for fetching office types
      });

      // Update the state with the fetched office type data
      setOfficeTypes(officeTypeResponse); // Setting the fetched office type data in state

      // Perform GET request to retrieve companies
      const companyResponse = await getRequest({
        url: "/api/v1/admin/users/companies", // API endpoint for fetching companies
      });

      // Update the state with the fetched company data
      setCompanies(
        companyResponse.map((company) => {
          return {
            id: company.id,
            name: company.company_name, // Include the name here
          };
        })
      ); // Setting the fetched company data in state
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handle Add Submit
  const handleAddSubmit = async () => {
    // Payload
    const payload = officeInfo;

    // Send Request
    const response = await postRequest({
      url: "/api/v1/admin/offices",
      data: payload,
    });

    // Reset Input
    resetOfficeInfo();

    // Set Role Again
    setOffices(response.data);
    // Close Modal
    setIsOpen(false);
  };

  // Handle Edit Office
  const handleEdit = (office) => {
    // Set to true -- Open Edit Form
    console.log(office);

    setSelectedOffice(office);

    // Pre-fill the editCompanyInfo with the selected company's details
    setEditOfficeInfo({
      company_id: office.company_id,
      company_name: office.company_name,
      office_type_id: office.office_type_id,
      name: office.office_name,
      phone_number: office.phone_number,
      street: office.street,
      barangay: office.barangay,
      city_municipality: office.city_municipality,
      province: office.province,
      postal_code: office.postal_code,
    });

    setEditIsOpen(true);
  };

  // Handle Edit Submit
  const handleEditSubmit = async () => {
    // Ready Payload
    const payload = editOfficeInfo;

    // Send Request
    const response = await putRequest({
      url: `/api/v1/admin/offices/${selectedOffice["id"]}`,
      data: payload,
    });

    // Reset Input
    resetEditOfficeInfo();

    // Set Office State
    setOffices(response.data);

    // Close Edit Modal
    setEditIsOpen(false);
  };

  return (
    <>
      <Page>
        {/* Dashboard Heading Section */}
        <Section className="mb-6">
          <Heading level={3} text="Manage Offices" className="text-blue-900" />
          <Text className="text-sm text-gray-600">
            This is where you can manage offices.
          </Text>
          <hr className="my-3 border-gray-300" />

          <ManageHeader
            addPlaceholder="Add Office"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

          {offices.length > 0 ? (
            <Table
              data={offices}
              searchPlaceholder="Search Office..."
              term={term}
              filteredData={filteredData}
              handleSearchChange={handleSearchChange}
              handleEdit={handleEdit}
            />
          ) : (
            <div>No Data</div>
          )}

          {offices.length > 0 && (
            <AnimatePresence>
              {isOpen && (
                <Modal
                  modalTitle="Create Office"
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  modalType="form"
                  handleSubmit={handleAddSubmit}
                  modalWidth="min-w-[1000px]"
                >
                  <OfficeForm
                    officeInfo={officeInfo}
                    handleOfficeInfoChange={handleOfficeInfoChange}
                    companies={companies}
                    officeTypes={officeTypes}
                    displayFields={{
                      company_id: true,
                      office_type_id: true,
                    }}
                    requiredFields={{
                      company_id: true,
                      office_type_id: true,
                      name: true,
                      phone_number: true,
                      street: false,
                      barangay: false,
                      city_municipality: false,
                      province: false,
                      postal_code: false,
                    }}
                  />
                </Modal>
              )}
              {editIsOpen && selectedOffice && (
                <Modal
                  modalTitle="Edit Office"
                  isOpen={editIsOpen}
                  setIsOpen={setEditIsOpen}
                  modalType="form"
                  handleSubmit={handleEditSubmit}
                  modalWidth="min-w-[1000px]"
                >
                  <OfficeForm
                    officeInfo={editOfficeInfo}
                    handleOfficeInfoChange={handleEditOfficeInfoChange}
                    companies={companies}
                    officeTypes={officeTypes}
                    displayFields={{
                      company_id: true,
                      office_type_id: true,
                    }}
                  />
                </Modal>
              )}
            </AnimatePresence>
          )}
        </Section>
      </Page>
    </>
  );
};

export default AdminManageOfficesPage;
