import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import useSearch from "../../hooks/useSearch";
import { getRequest } from "../../api/apiHelpers";
import Table from "../../components/tables/Table";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/common/Modal";
import OfficeForm from "../../components/forms/OfficeForm";

const AdminManageOfficesPage = () => {
  // State to store the list of offices
  const [offices, setOffices] = useState([]); // Initializing state to hold office data
  // State to store the list of office types
  const [officeTypes, setOfficeTypes] = useState([]); // Initializing state to hold office type data

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(offices, ""); // Using the custom hook to manage search term and filtered data

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

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
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handle Add Submit
  const handleAddSubmit = async () => {};

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
            />
          ) : (
            <div>No Data</div>
          )}

          {offices.length > 0 && (
            <AnimatePresence>
              {isOpen && (
                <Modal
                  modalTitle="Create Dean"
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  modalType="form"
                  handleSubmit={handleAddSubmit}
                  modalWidth="min-w-[1000px]"
                >
                  <OfficeForm officeTypes={officeTypes} />
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
