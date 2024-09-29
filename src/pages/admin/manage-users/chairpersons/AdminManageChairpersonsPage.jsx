import React, { useEffect, useState } from "react";
import { getRequest } from "../../../../api/apiHelpers";
import Section from "../../../../components/common/Section";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../../components/common/Modal";
import AdminManageHeader from "../../../../components/users/admin/AdminManageUserHeader";
import ChairpersonFormAdd from "../../forms/ChairpersonFormAdd";
import useSearch from "../../../../hooks/useSearch";
import Table from "../../../../components/tables/Table";

const AdminManageChairpersonsPage = () => {
  // States
  const [chairpersons, setChairpersons] = useState([]);

  // Create Chairperson
  const [isOpen, setIsOpen] = useState(false);

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(
    chairpersons,
    ""
  ); // Using the custom hook to manage search term and filtered data

  // Selected Data State
  const [selectedData, setSelectedData] = useState({});

  // Fetch chairpersons data
  useEffect(() => {
    const fetchChairpersons = async () => {
      const chairpersonResponse = await getRequest({
        url: "/api/v1/admin/users/chairpersons",
      });

      // Update the state with the fetched chairperson data
      setChairpersons(chairpersonResponse); // Setting the fetched user data in state
    };

    fetchChairpersons(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <Section>
      <AdminManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Chairperson"
      />

      {/* {companies.length !== 0 && <AdminCompanyTableView data={companies} />} */}
      {/* {companies.length !== 0 && <Table data={companies} />} */}
      {chairpersons.length !== 0 && (
        <Table
          data={chairpersons}
          term={term}
          filteredData={filteredData}
          handleSearchChange={handleSearchChange}
        />
      )}

      {/* Modals */}
      {/* <AnimatePresence>
        {isOpenEdit && (
          <Modal
            modalTitle="Edit Company"
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
          >
            <CompanyFormEdit
              selectedData={selectedData}
              isOpen={isOpenEdit}
              setIsOpen={setIsOpenEdit}
              companies={companies}
              setCompanies={setCompanies}
            />
          </Modal>
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {isOpen && (
          <Modal
            modalTitle="Create Chairperson"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            <ChairpersonFormAdd
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              companies={chairpersons}
              setCompanies={setChairpersons}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default AdminManageChairpersonsPage;
