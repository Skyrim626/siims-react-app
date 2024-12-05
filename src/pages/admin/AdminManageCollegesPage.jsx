import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import { postRequest, putRequest } from "../../api/apiHelpers";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Heading from "../../components/common/Heading";
import FormModal from "../../components/modals/FormModal";
import ManageHeader from "../../components/common/ManageHeader";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import Table from "../../components/tables/Table";
import CollegeForm from "../../components/forms/CollegeForm";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import useSearch from "../../hooks/test/useSearch";
import useFetch from "../../hooks/useFetch";
import useRequest from "../../hooks/useRequest";
import DataTable from "../../components/tables/DataTable";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";

const AdminManageCollegesPage = () => {
  /**
   *
   * Loader, navigate, and location state
   */
  const { list_of_deans } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   *  Loading, container, modal state
   */
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /**
   * Input, and Select State
   */
  const [collegeName, setCollegeName] = useState("");
  const [deanId, setDeanId] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState({});
  const [selectedCollegeID, setSelectedCollegeID] = useState(null);

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
    url: "/colleges", // URL for document types
    initialPage: 1,
    initialItemsPerPage: 5,
    searchTerm: triggerSearch ? searchTerm : "", // Only pass search term when search is triggered
    setData: setColleges,
    setLoading: setLoading,
  });

  /**
   * Use Request
   */
  const { errors, postData, putData, deleteData } = useRequest({
    setData: setColleges,
    setLoading,
    setIsOpen: setIsOpen,
  });

  // Add new College
  const addNewCollege = () => {
    // Payload
    const payload = {
      name: collegeName,
    };

    postData({
      url: "/colleges",
      payload: payload,
    });
  };

  // Update College
  const updateCollege = async () => {
    // Ready Payload
    const payload = {
      dean_id: deanId,
      name: collegeName,
    };

    putData({
      url: `/colleges/${selectedCollege["id"]}`,
      payload: payload,
      selectedData: selectedCollege["id"],
      setIsOpen: setEditIsOpen,
    });
  };
  /**
   * Delete Functions
   */
  // Grab College By ID
  const grabCollegeById = async (id) => {
    // Set Selected ID
    setSelectedCollegeID(id);
    setIsDeleteOpen(!isDeleteOpen);
  };

  // Delete College
  const deleteCollege = () => {
    deleteData({
      url: `/colleges/${selectedCollegeID}`,
      id: selectedCollegeID,
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  // Handle Edit Select College
  const grabCollege = (college) => {
    // Set College State
    setSelectedCollege(college);

    // Pre-fill the collegeName and dean_id
    setCollegeName(college.name);
    setDeanId(college.dean_id);

    // Open Modal
    setEditIsOpen(true);
  };

  return (
    <>
      <Page>
        <Loader loading={loading} />

        <Section>
          <Heading level={3} text={"Colleges"} />
          <Text className="text-sm text-blue-950">
            This is where you manage the colleges.
          </Text>
          <hr className="my-3" />
        </Section>

        <ManageHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          addPlaceholder="Add New College"
          showExportButton={false}
          showImportButton={false}
        />

        {/* Table */}
        {error ? (
          <EmptyState title="Error" message={errors} />
        ) : colleges && colleges.length > 0 ? (
          <>
            <DataTable
              data={colleges} // Pass the fetched data to the table
              handleEdit={grabCollege}
              handleArchive={grabCollegeById}
              includeCheckboxes={false}
              /** Pagination */
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
              ITEMS_PER_PAGE_LISTS={[
                { value: 5 },
                { value: 25 },
                { value: 50 },
              ]}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              handleItemsPerPageChange={handleItemsPerPageChange}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              /** Search */
              searchPlaceholder={"Search Colleges..."}
              searchTerm={searchTerm}
              handleKeyDown={handleKeyDown}
              handleSearchChange={handleSearchChange}
            />
          </>
        ) : (
          <EmptyState
            title="No colleges available at the moment"
            message="Once activities are recorded, colleges will appear here."
          />
        )}

        {/* Form Modal */}
        {/* Add Form Modal */}
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add College"
          onSubmit={addNewCollege}
        >
          <CollegeForm
            collegeName={collegeName}
            setCollegeName={setCollegeName}
            errors={errors}
          />
        </FormModal>

        {/* Edit Form Modal */}
        {selectedCollege && (
          <FormModal
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
            modalTitle="Edit College"
            onSubmit={updateCollege}
          >
            <CollegeForm
              method="put"
              collegeName={collegeName}
              deanId={deanId}
              setDeanId={setDeanId}
              setCollegeName={setCollegeName}
              deans={list_of_deans}
              errors={errors}
            />
          </FormModal>
        )}

        {/* Delete Form Modal */}
        <DeleteConfirmModal
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          message="Are you sure you want to delete this College?"
          handleDelete={deleteCollege}
        />
      </Page>
    </>
  );
};

export default AdminManageCollegesPage;
