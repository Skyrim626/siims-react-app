import React, { useState } from "react";
import { deleteRequest, postRequest, putRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Heading from "../../components/common/Heading";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import FormModal from "../../components/modals/FormModal";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/tables/Table";
import ProgramForm from "../../components/forms/ProgramForm";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import useSearch from "../../hooks/test/useSearch";
import useRequest from "../../hooks/useRequest";
import DataTable from "../../components/tables/DataTable";
import useFetch from "../../hooks/useFetch";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";

const AdminManageProgramsPage = () => {
  // Retrieve the programs, list_of_chairperson, and list_of_colleges data from the loader
  const { list_of_chairpersons, list_of_colleges } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(list_of_colleges);

  // Container Data
  const [programs, setPrograms] = useState([]);
  /**
   * Modal State
   */
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  /**
   * Loading State
   */
  const [loading, setLoading] = useState(false);
  /**
   * Select State
   */
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedProgramID, setSelectedProgramID] = useState(null);
  /**
   * Input State
   */
  const [programName, setProgramName] = useState("");
  const [chairpersonId, setChairpersonId] = useState(null);
  const [collegeId, setCollegeId] = useState(0);

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
    url: "/programs", // URL for Programs
    initialPage: 1,
    initialItemsPerPage: 5,
    searchTerm: triggerSearch ? searchTerm : "", // Only pass search term when search is triggered
    setData: setPrograms,
    setLoading: setLoading,
  });

  /**
   * Use Request
   */
  const { errors, postData, putData, deleteData } = useRequest({
    setData: setPrograms,
    setLoading,
    setIsOpen: setIsOpen,
  });

  /**
   * Delete Functions
   */

  // Delete a program
  const grabProgramById = (id) => {
    // Set Selected ID
    setSelectedProgramID(id);
    setIsDeleteOpen(!isDeleteOpen);
  };
  const deleteProgram = () => {
    deleteData({
      url: `/programs/${selectedProgramID}`,
      id: selectedProgramID,
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  // Submit new Program data
  const addNewProgram = () => {
    // Ready Paylod
    const payload = {
      college_id: collegeId,
      name: programName,
    };

    postData({
      url: "/programs",
      payload: payload,
    });
  };

  // Handle Edit Submit
  const updateProgram = () => {
    // Ready Payload
    const payload = {
      chairperson_id: chairpersonId,
      name: programName,
    };

    putData({
      url: `/programs/${selectedProgram["id"]}`,
      payload: payload,
      selectedData: selectedProgram,
      setIsOpen: setEditIsOpen,
    });
  };

  // Grab Program  Select Program
  const grabProgram = (program) => {
    // console.log(program);

    // Set Program State
    // console.log(program);
    setSelectedProgram(program);

    // Pre-fill the college_id, chairperson_id, name with in each fields
    setCollegeId(program["college_id"]);
    setChairpersonId(program["chairperson_id"]);
    setProgramName(program["name"]);

    // Open Modal
    setEditIsOpen(true);
  };

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text={"Programs"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the programs.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Program"
        showExportButton={false}
        showImportButton={false}
      />

      {/* Table */}
      {error ? (
        <EmptyState title="Error" message={errors} />
      ) : programs && programs.length > 0 ? (
        <>
          <DataTable
            data={programs} // Pass the fetched data to the table
            handleEdit={grabProgram}
            handleArchive={grabProgramById}
            includeCheckboxes={false}
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
            searchPlaceholder={"Search Programs..."}
            searchTerm={searchTerm}
            handleKeyDown={handleKeyDown}
            handleSearchChange={handleSearchChange}
          />
        </>
      ) : (
        <EmptyState
          title="No programs available at the moment"
          message="Once activities are recorded, programs will appear here."
        />
      )}

      {/* Modals */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Program"
        onSubmit={addNewProgram}
      >
        <ProgramForm
          colleges={list_of_colleges}
          collegeId={collegeId}
          programName={programName}
          setCollegeId={setCollegeId}
          setProgramName={setProgramName}
          errors={errors}
        />
      </FormModal>

      {selectedProgram && (
        <FormModal
          isOpen={editIsOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit Program"
          onSubmit={updateProgram}
        >
          <ProgramForm
            method="put"
            collegeId={collegeId}
            chairpersonId={chairpersonId}
            programName={programName}
            setCollegeId={setCollegeId}
            setProgramName={setProgramName}
            setChairpersonId={setChairpersonId}
            chairpersons={list_of_chairpersons} // Pass chairperson list to the form
            colleges={list_of_colleges}
            errors={errors}
          />
        </FormModal>
      )}

      {/* Delete Form Modal */}
      <DeleteConfirmModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        title="Delete Program"
        message="Are you sure you want to delete this Program?"
        handleDelete={deleteProgram}
      />
    </Page>
  );
};

export default AdminManageProgramsPage;
