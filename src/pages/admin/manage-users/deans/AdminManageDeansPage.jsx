import React, { useEffect, useState } from "react";
import Section from "../../../../components/common/Section";
import { Button } from "@headlessui/react";
import { FileDown, FileUp, UserRoundPlus } from "lucide-react";
import useSearch from "../../../../hooks/useSearch";
import Table from "../../../../components/tables/Table";
import useForm from "../../../../hooks/useForm";
import DeanForm from "../../../../components/forms/DeanForm";
import { getRequest, postRequest } from "../../../../api/apiHelpers";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../../components/common/Modal";
import DeanModalFormFields from "../../../../components/forms/modal-forms/DeanModalFormFields";
import ManageHeader from "../../../../components/common/ManageHeader";
import Loader from "../../../../components/common/Loader";

// AdminManageDeansPage component handles the management of deans in the admin dashboard.
const AdminManageDeansPage = () => {
  // State to store the list of deans
  const [deans, setDeans] = useState([]); // Initializing state to hold dean data
  // State to store the list of colleges
  const [colleges, setColleges] = useState([]); // Initializing state to hold college data

  // Loading State
  const [loading, setLoading] = useState();

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(deans, ""); // Using the custom hook to manage search term and filtered data

  // Select State for Dean
  const [selectedDean, setSelectedDean] = useState();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Form State
  // Using the custom hook for Dean Information
  const [deanInfo, handleDeanInfoChange] = useForm({
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
    college_id: "",
  });

  // useEffect hook to fetch deans from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Perform GET request to retrieve deans
      const deanResponse = await getRequest({
        url: "/api/v1/admin/users/deans", // API endpoint for fetching deans
      });

      // Update the state with the fetched dean data
      setDeans(deanResponse); // Setting the fetched dean data in state

      // Perform GET request to retrieve colleges
      const collegeResponse = await getRequest({
        url: "/api/v1/admin/colleges", // API endpoint for fetching colleges
      });

      // Update the state with the fetched college data
      setColleges(collegeResponse); // Setting the fetched college data in state
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handle Add Submit
  const handleAddSubmit = async () => {
    // Loading State
    setLoading(true);

    try {
      // Payload
      const payload = deanInfo;

      // Send Request
      const response = await postRequest({
        url: "/api/v1/admin/users/deans",
        data: payload,
      });

      // Reset Input
      handleDeanInfoChange({ target: { name: "name", value: "" } });

      // Set Deans Again
      setDeans(response.data);
      // Close Modal
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Archive
  const handleArchive = async (data) => {
    console.log(data);
  };

  // Handle Edit
  const handleEdit = (data) => {
    // Set to true -- Open Edit Form
    setSelectedDean(data);
    setEditIsOpen(true);
  };

  return (
    <Section>
      <Loader loading={loading} />

      <ManageHeader
        addPlaceholder="Add Dean"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        showExportButton={false}
        showImportButton={false}
      />

      {deans.length > 0 ? (
        <Table
          data={deans}
          searchPlaceholder="Search Dean..."
          term={term}
          includeCheckboxes={false}
          filteredData={filteredData}
          handleSearchChange={handleSearchChange}
          handleArchive={handleArchive}
          handleEdit={handleEdit}
        />
      ) : (
        <div>No Data</div>
      )}

      {deans && colleges.length !== 0 && (
        <AnimatePresence>
          {isOpen && (
            <Modal
              modalTitle="Create Dean"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              modalType="form"
              handleSubmit={handleAddSubmit}
            >
              <DeanModalFormFields
                colleges={colleges}
                deanInfo={deanInfo}
                handleDeanInfoChange={handleDeanInfoChange}
              />
            </Modal>
          )}
        </AnimatePresence>
      )}

      {/* <AnimatePresence>
        {isOpenEdit && (
          <Modal
            modalTitle="Edit Dean"
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
          >
            <DeanFormEdit
              selectedDeanId={selectedDeanId}
              isOpen={isOpenEdit}
              setIsOpen={setIsOpenEdit}
            />
          </Modal>
        )}
      </AnimatePresence> */}
    </Section>
  );
};

export default AdminManageDeansPage;
