import React, { useEffect, useState } from "react";
import Section from "../../components/common/Section";
import ManageHeader from "../../components/common/ManageHeader";
import useSearch from "../../hooks/useSearch";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/common/Modal";
import { getRequest, postRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Table from "../../components/tables/Table";
import Heading from "../../components/common/Heading";
import SupervisorForm from "../../components/forms/SupervisorForm";
import useForm from "../../hooks/useForm";

const CompanyManageSupervisorsPage = () => {
  // State to store the list of supervisors
  const [supervisors, setSupervisors] = useState([]); // Initializing state to hold supervisor data
  // State to store the list of offices
  const [offices, setOffices] = useState([]); // Initializing state to hold offices data

  // Create Modal Modal
  const [isOpen, setIsOpen] = useState(false);

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(supervisors, ""); // Using the custom hook to manage search term and filtered data

  // Selected Data State
  const [selectedData, setSelectedData] = useState({});

  // Form State
  // Using the custom hook for Dean Information
  const [supervisorInfo, handleSupervisorInfoChange, resetSupervisorInfo] =
    useForm({
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
      office_id: "",
    });

  // Fetch data
  useEffect(() => {
    const fetch = async () => {
      const supervisorsResponse = await getRequest({
        url: "/api/v1/company/supervisors",
      });

      // Update the state with the fetched supervisor data
      setSupervisors(supervisorsResponse); // Setting the fetched supervisor data in state

      const officesResponse = await getRequest({
        url: "/api/v1/company/offices",
      });

      // Update the state with the fetched office data
      setOffices(officesResponse); // Setting the fetched office data in state
    };

    fetch(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handle Add Submit
  const handleAddSubmit = async () => {
    // Payload
    const payload = supervisorInfo;

    console.log(payload);

    // Send Request
    const response = await postRequest({
      url: "/api/v1/company/supervisors",
      data: payload,
    });

    // Reset Input
    resetSupervisorInfo();

    // Set Supervisor State
    setSupervisors(response.data);
    // Close Modal
    setIsOpen(false);
  };

  return (
    <>
      <Page>
        <Section className="mt-4">
          <div className="flex justify-between items-center">
            {/* Display the heading and description */}
            <div>
              <Heading level={3} text={"Manage Supervisors"} />
              <p className="text-blue-950 text-sm">
                This is where you can manage your supervisors.
              </p>
            </div>
          </div>
          <hr className="my-3" />
        </Section>
        <Section>
          <ManageHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            addPlaceholder="Add New Supervisor"
          />

          {/* {companies.length !== 0 && <AdminCompanyTableView data={companies} />} */}
          {/* {companies.length !== 0 && <Table data={companies} />} */}
          {supervisors.length !== 0 && supervisors && (
            <Table
              data={supervisors}
              term={term}
              filteredData={filteredData}
              handleSearchChange={handleSearchChange}
            />
          )}

          <AnimatePresence>
            {isOpen && offices.length > 0 && (
              <Modal
                modalTitle="Create Supervisor"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleSubmit={handleAddSubmit}
              >
                <SupervisorForm
                  isFormModal={true}
                  method={"post"}
                  supervisorInfo={supervisorInfo}
                  handleSupervisorInfoChange={handleSupervisorInfoChange}
                  offices={offices}
                />
              </Modal>
            )}
          </AnimatePresence>
        </Section>
      </Page>
    </>
  );
};

export default CompanyManageSupervisorsPage;
