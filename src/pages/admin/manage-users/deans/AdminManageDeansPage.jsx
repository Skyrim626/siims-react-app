import React, { useEffect, useState } from "react";
import Section from "../../../../components/common/Section";
import Table from "../../../../components/tables/Table";
import useForm from "../../../../hooks/useForm";
import { getRequest, postRequest } from "../../../../api/apiHelpers";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../../components/common/Modal";
import DeanModalFormFields from "../../../../components/forms/modal-forms/DeanModalFormFields";
import ManageHeader from "../../../../components/common/ManageHeader";
import Loader from "../../../../components/common/Loader";
import useSearch from "../../../../hooks/test/useSearch";
import useFetch from "../../../../hooks/useFetch";
import useRequest from "../../../../hooks/useRequest";
import EmptyState from "../../../../components/common/EmptyState";
import DataTable from "../../../../components/tables/DataTable";
import { useLoaderData } from "react-router-dom";

const AdminManageDeansPage = () => {
  /**
   * Open Loader
   */
  // Fetch list of colleges
  const { colleges } = useLoaderData();

  // Container State and Modal State
  const [deans, setDeans] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  /**
   * Loading State
   */
  const [loading, setLoading] = useState(false);
  /**
   * Select State
   */
  const [selectedDean, setSelectedDean] = useState();
  /**
   * Input State
   */
  const [deanInfo, handleDeanInfoChange, resetForm, setFormValues] = useForm({
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

  /**
   *
   *
   *
   * Custom Hooks
   *
   *
   *
   */
  // Search Hooks
  const { searchTerm, triggerSearch, handleSearchChange, handleKeyDown } =
    useSearch();

  // Fetch document types with search and pagination
  const {
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    handleNextPage,
    handlePrevPage,
  } = useFetch({
    url: "/users/deans", // URL for Deans
    initialPage: 1,
    initialItemsPerPage: 5,
    searchTerm: triggerSearch ? searchTerm : "", // Only pass search term when search is triggered
    setData: setDeans,
    setLoading: setLoading,
  });

  /**
   * Use Request
   */
  const { errors, postData, putData, deleteData } = useRequest({
    setData: setDeans,
    setLoading,
    setIsOpen: setIsOpen,
  });

  // Add new Dean
  const addNewDean = () => {
    // Load Payload
    console.log(deanInfo);

    postData({
      url: "/users/deans",
      payload: deanInfo,
      resetForm: resetForm,
    });
  };

  // Grab grabDean
  const grabDean = (dean) => {
    // console.log(dean);

    setFormValues({
      id: dean.id,
      first_name: dean.first_name,
      middle_name: dean.middle_name,
      last_name: dean.last_name,
      email: dean.email,
      gender: dean.gender,
      phone_number: dean.phone_number,
      street: dean.street,
      barangay: dean.barangay,
      city_municipality: dean.city_municipality,
      province: dean.province,
      postal_code: dean.postal_code,
      college_id: dean.college_id,
    });

    setSelectedDean(dean);
    setEditIsOpen(true);
  };

  // Update Dean
  const updateDean = () => {
    console.log(deanInfo);

    putData({
      url: `/users/deans/${selectedDean.id}`,
      payload: deanInfo,
      selectedData: selectedDean,
      setIsOpen: setEditIsOpen,
    });
  };

  // Archive
  const handleArchive = async (data) => {
    console.log(data);
  };

  return (
    <Section>
      <Loader loading={loading} />

      <ManageHeader
        addPlaceholder="Add New Dean"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        showExportButton={false}
        showImportButton={false}
      />

      {/* Table */}
      {error ? (
        <EmptyState title="Error" message={errors} />
      ) : deans && deans.length > 0 ? (
        <>
          <DataTable
            data={deans} // Pass the fetched data to the table
            handleEdit={grabDean}
            // handleArchive={grabProgramById}
            // includeCheckboxes={false}
            /** Pagination */
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
            ITEMS_PER_PAGE_LISTS={[{ value: 5 }, { value: 25 }, { value: 50 }]}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handleItemsPerPageChange={handleItemsPerPageChange}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            /** Search */
            searchPlaceholder={"Search Deans..."}
            searchTerm={searchTerm}
            handleKeyDown={handleKeyDown}
            handleSearchChange={handleSearchChange}
          />
        </>
      ) : (
        <EmptyState
          title="No deans available at the moment"
          message="Once activities are recorded, deans will appear here."
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <Modal
            modalTitle="Create Dean"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalType="form"
            handleSubmit={addNewDean}
          >
            <DeanModalFormFields
              colleges={colleges}
              deanInfo={deanInfo}
              handleDeanInfoChange={handleDeanInfoChange}
              requiredFields={{
                id: true,
                password: true,
                first_name: true,
                email: true,
              }}
            />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editIsOpen && (
          <Modal
            modalTitle="Edit Dean"
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
            modalType="form"
            handleSubmit={updateDean}
          >
            <DeanModalFormFields
              method={"put"}
              colleges={colleges}
              deanInfo={deanInfo}
              handleDeanInfoChange={handleDeanInfoChange}
              requiredFields={{
                first_name: true,
                email: true,
                college_id: true,
              }}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default AdminManageDeansPage;
