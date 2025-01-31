import React, { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "../../components/common/Loader";
import SectionPresenter from "./SectionPresenter";
import {
  addSection,
  assignStudentToSection,
  fetchData,
  getSection,
} from "./Api";
import {
  getStudentActionColumns,
  getStudentStaticColumns,
} from "./utilities/studentColumns";
import useDebouncedSearch from "../../hooks/useDebouncedSearch";
import useForm from "../../hooks/useForm";

const SectionContainer = ({ authorizeRole }) => {
  /**
   *
   *
   * LOADING STATE
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * USE HOOK
   *
   */
  const {
    formData: sectionFormData,
    handleInputChange: sectionHandleInputChange,
  } = useForm({
    name: "",
    limit: 0,
    class_list: null,
    coordinator_id: 0,
  });

  /**
   *
   * ROW STATE
   *
   *
   */
  const [rows, setRows] = useState([]);

  /**
   *
   *
   * MODAL STATE
   *
   *
   */
  const [isOpenSection, setIsOpenSection] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isSectionAssignOpen, setIsSectionAssignOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  /**
   *
   *
   * SELECT STATE
   *
   *
   */
  const [selectedSection, setSelectedSection] = useState({ id: null });
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedSectionID, setSelectedSectionID] = useState("");
  const [selectedStudent, setSelectedStudent] = useState({});

  /**
   *
   *
   * SELECTION FUNCTIONS
   *
   *
   */
  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  /**
   *
   *
   * LIST STATE
   *
   *
   */
  const [sections, setSections] = useState([]);

  /**
   *
   *
   * SEARCH STATE
   *
   *
   */
  const [searchSection, setSearchSection] = useState("");

  /**
   *
   *
   * DATAGRID STATE
   *
   *
   *
   */
  const [totalCount, setTotalCount] = useState(0);
  const [dataGridLoading, setDataGridLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // Current page
    pageSize: 5, // Items per page
  });

  // Use debounced search term to avoid sending request on every keystroke
  const debouncedSearchTerm = useDebouncedSearch(searchInput, 500); // 500ms debounce delay

  /**
   *
   *
   * DATAGRID FUNCTION STATE
   *
   *
   */
  // Handle pagination model change
  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel); // Update pagination model (page and pageSize)
  };

  // Handle input field change
  const handleSearchInputChange = useCallback((event) => {
    const value = event.target.value;
    setSearchInput(value);

    if (value === "") {
      // Reload data if input is cleared
      setSearchTerm("");
      setPaginationModel({ ...paginationModel, page: 0 });
    }
  });

  // Trigger search only on Enter key press
  const handleSearchKeyDown = (event) => {
    // console.log(event.key);

    if (event.key === "Enter") {
      setSearchTerm(debouncedSearchTerm); // Use the input value for fetching data
      setPaginationModel({ ...paginationModel, page: 0 }); // Reset to first page
    }
  };

  /**
   *
   *
   * MODAL FUNCTIONS
   *
   *
   */
  const openSectionAssignModal = () => {
    setIsSectionAssignOpen(true);
  };
  const openStudentInfoModal = (data) => {
    // console.log(data);

    setSelectedStudent(data);
    setIsStudentModalOpen(true);
  };

  /**
   *
   *
   * FETCHING
   *
   *
   */

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [paginationModel, searchTerm, selectedSection]);

  /**
   *
   *
   * API FUNCTIONS
   *
   *
   */

  const assignSection = async (e) => {
    // const selected
    e.preventDefault();

    const selectedData = rows.filter((row) => selectedRows.includes(row.id));

    // console.log(selectedData);

    // Format
    const payload = {
      student_ids: selectedData.map((data) => ({
        student_id: data.id, // Change `id` to `student_id`
      })),
      section_id: selectedSectionID,
    };

    // console.log(selectedSectionID);

    await assignStudentToSection({
      sectionID: selectedSectionID,
      setLoading: setLoading,
      payload: payload,
      setRows: setRows,
      setIsSectionAssignOpen: setIsSectionAssignOpen,
    });
  };

  const addNewSection = async (e) => {
    e.preventDefault();

    // console.log(sectionFormData);
    await addSection({
      setLoading: setLoading,
      setSections: setSections,
      authorizeRole: authorizeRole,
      payload: sectionFormData,
      setIsOpenSection: setIsOpenSection,
    });
  };

  const fetchStudents = async () => {
    await fetchData({
      requestedBy: authorizeRole,
      setLoading: setDataGridLoading,
      paginationModel: paginationModel,
      setRows: setRows,
      setTotalCount: setTotalCount,
      searchTerm: searchTerm,
      sectionID: selectedSection["id"],
    });
  };

  const fetchSections = async () => {
    await getSection({
      authorizeRole: authorizeRole,
      searchTerm: searchSection,
      setLoading: setLoading,
      setSelectedSection: setSelectedSection,
      setSections: setSections,
    });
  };

  /**
   *
   * COLUMNS
   *
   */

  const staticColumns = useMemo(
    () =>
      getStudentStaticColumns({
        authorizeRole: authorizeRole,
        selectedSection: selectedSection,
        openStudentInfoModal: openStudentInfoModal,
      }),
    [authorizeRole, selectedSection]
  );

  const actionColumn = useMemo(
    () =>
      getStudentActionColumns({
        authorizeRole,
      }),
    [authorizeRole]
  );

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <div>
      <Loader loading={loading} />
      <SectionPresenter
        authorizeRole={authorizeRole}
        sections={sections}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        isSectionOpen={isSectionOpen}
        setIsSectionOpen={setIsSectionOpen}
        searchSection={searchSection}
        setSearchSection={setSearchSection}
        fetchSections={fetchSections}
        isOpenSection={isOpenSection}
        setIsOpenSection={setIsOpenSection}
        rows={rows}
        setRows={setRows}
        columns={columns}
        /* Data Grid Props */
        paginationModel={paginationModel}
        totalCount={totalCount}
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
        handleSearchKeyDown={handleSearchKeyDown}
        dataGridLoading={dataGridLoading}
        handlePaginationModelChange={handlePaginationModelChange}
        onRowSelectionModelChange={handleSelectionChange}
        /* Section Form Data */
        sectionFormData={sectionFormData}
        sectionHandleInputChange={sectionHandleInputChange}
        addNewSection={addNewSection}
        /** Assign Section Props */
        isSectionAssignOpen={isSectionAssignOpen}
        openSectionAssignModal={openSectionAssignModal}
        setIsSectionAssignOpen={setIsSectionAssignOpen}
        selectedRows={selectedRows}
        selectedSectionID={selectedSectionID}
        setSelectedSectionID={setSelectedSectionID}
        assignSection={assignSection}
        /** Student Info Modal */
        isStudentModalOpen={isStudentModalOpen}
        setIsStudentModalOpen={setIsStudentModalOpen}
        selectedStudent={selectedStudent}
        /** Testing Props */
        // printSelectedRows={printSelectedRows}
      />
    </div>
  );
};

export default SectionContainer;
