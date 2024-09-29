import React, { useEffect, useState } from "react";
import Section from "../../components/common/Section";
import ManageHeader from "../../components/common/ManageHeader";
import useSearch from "../../hooks/useSearch";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/common/Modal";
import { getRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Table from "../../components/tables/Table";
import SupervisorModalFormAdd from "../../components/forms/modal-forms/SupervisorModalFormAdd";

const CompanyManageSupervisorsPage = () => {
  // States
  const [supervisors, setSupervisors] = useState([]);

  // Create Modal Modal
  const [isOpen, setIsOpen] = useState(false);

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(supervisors, ""); // Using the custom hook to manage search term and filtered data

  // Selected Data State
  const [selectedData, setSelectedData] = useState({});

  // Fetch supervisors data
  useEffect(() => {
    const fetch = async () => {
      const response = await getRequest({
        url: "/api/v1/company/supervisors",
      });

      // Update the state with the fetched supevisor data
      setSupervisors(response); // Setting the fetched user data in state
    };

    fetch(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <>
      <Page>
        <Section>
          <ManageHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            addPlaceholder="Add New Chairperson"
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
            {isOpen && (
              <Modal
                modalTitle="Create Supervisor"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              >
                <SupervisorModalFormAdd isOpen={isOpen} setIsOpen={setIsOpen} />
              </Modal>
            )}
          </AnimatePresence>
        </Section>
      </Page>
    </>
  );
};

export default CompanyManageSupervisorsPage;
