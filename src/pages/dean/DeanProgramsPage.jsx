import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Heading from "../../components/common/Heading";
import ManageHeader from "../../components/common/ManageHeader";
import DeanProgramsTable from "../../components/users/dean/table/DeanProgramsTable";
import FormModal from "../../components/modals/FormModal";
import DeanProgramFormAdd from "./forms/DeanProgramFormAdd";
import { postRequest, putRequest } from "../../api/apiHelpers";
import DeanProgramFormEdit from "./forms/DeanProgramFormEdit";
import ProgramForm from "../../components/forms/ProgramForm";
import useSearch from "../../hooks/test/useSearch";
import useFetch from "../../hooks/useFetch";
import useRequest from "../../hooks/useRequest";
import DataTable from "../../components/tables/DataTable";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";

const DeanProgramsPage = () => {
  // Location and Navigate State
  const location = useLocation();
  const navigate = useNavigate();

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
          programName={programName}
          setProgramName={setProgramName}
          errors={errors}
          displayFields={{
            collegeId: false,
            programName: true,
          }}
        />
      </FormModal>

      {selectedProgram && (
        <FormModal
          isOpen={editIsOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit Program"
          onSubmit={updateProgram}
        >
          <DeanProgramFormEdit
            programName={programName}
            setProgramName={setProgramName}
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

export default DeanProgramsPage;
