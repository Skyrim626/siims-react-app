import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EndorsementLetterRequestsPresenter from "./EndorsementLetterRequestsPresenter";
import {
  getEndorsementRequestsActionColumns,
  getEndorsementRequestsStaticColumns,
} from "./utilities/endorsementLetterRequestsColumns";
import {
  GET_ALL_ARCHIVE_URL,
  GET_ALL_URL,
  GET_ALL_WALK_IN_URL,
} from "./constants/resources";
import { useDispatch, useSelector } from "react-redux";
import { setFormValues } from "./_redux/endorsementLetterDetailSlice";
import { deleteByID, fetchData, restoreByID } from "./api";
import useDebouncedSearch from "../../hooks/useDebouncedSearch";

// Items for Drop down
const items = [
  {
    value: "all",
    label: "All",
    url: GET_ALL_URL,
  },
  {
    value: "walk-in",
    label: "Walk-In",
    url: GET_ALL_WALK_IN_URL,
  },
  {
    value: "archived",
    label: "Archives",
    url: GET_ALL_ARCHIVE_URL,
  },
];

const EndorsementLetterRequestsContainer = ({ authorizeRole }) => {
  /**
   *
   *
   * Location and Navigate
   *
   *
   */
  const location = useLocation();
  const navigate = useNavigate();

  /**
   *
   *
   * Loading State
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * Row States and Redux
   *
   *
   */
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.endorsementLetterDetailSlice);

  /**
   *
   *
   * Select State
   *
   *
   */
  const [selectedStatus, setSelectedStatus] = useState(items[0].value);
  const [selectedURL, setSelectedURL] = useState(items[0].url);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Initialize with today's date
  );
  const [selectedID, setSelectedID] = useState(null);

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
   * FETCH STATE
   *
   *
   *
   */
  useEffect(() => {
    fetchData({
      requestedBy: authorizeRole,
      selectedDate: selectedDate,
      setLoading: setDataGridLoading,
      url: selectedURL,
      paginationModel: paginationModel,
      setRows: setRows,
      setTotalCount: setTotalCount,
      searchTerm: searchTerm,
    });
  }, [paginationModel, searchTerm, selectedURL, selectedDate]);

  /**
   *
   *
   * MODAL STATE
   *
   *
   */
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);

  /**
   *
   *
   * MODAL FUNCTIONS
   *
   *
   */
  const openDeleteModal = (id) => {
    // console.log(id);

    setSelectedID(id);
    setIsDeleteOpen(true);
  };

  const openRestoreModal = (id) => {
    // console.log(id);
    setSelectedID(id);
    setIsRestoreOpen(true);
  };

  // Handles delete endorsement letter request record
  const handleDelete = async () => {
    // console.log(selectedID);
    await deleteByID({
      setStates: {
        setLoading,
        setIsDeleteOpen,
        setRows,
      },
      id: selectedID,
    });
  };

  // Handles restore deleted endorsement letter request record
  const handleRestore = async () => {
    // console.log(selectedID);

    await restoreByID({
      setStates: {
        setLoading,
        setIsRestoreOpen,
        setRows,
      },
      id: selectedID,
    });
  };

  /**
   *
   *
   * Other Functions
   *
   *
   */
  const viewEndorsementPage = (id, type, row) => {
    dispatch(setFormValues(row));

    navigate(`${location.pathname}/${id}`, {
      state: { type, data: row },
    });
  };

  /**
   *
   *
   * Column Renderer
   *
   *
   */

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getEndorsementRequestsStaticColumns({
        pathname: location.pathname,
        viewEndorsementPage: viewEndorsementPage,
        selectedStatus: selectedStatus,
      }),
    [selectedStatus, authorizeRole]
  );

  // Action Columns
  const actionColumns = useMemo(
    () =>
      getEndorsementRequestsActionColumns({
        pathname: location.pathname,
        selectedStatus: selectedStatus,
        openDeleteModal: openDeleteModal,
        openRestoreModal: openRestoreModal,
      }),
    [authorizeRole, selectedStatus]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumns],
    [staticColumns, actionColumns]
  );

  return (
    <>
      <EndorsementLetterRequestsPresenter
        loading={loading}
        items={items}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedURL={selectedURL}
        setSelectedURL={setSelectedURL}
        authorizeRole={authorizeRole}
        rows={rows}
        setRows={setRows}
        columns={columns}
        /** Date Select */
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        /* Modal Props */
        openDelete={isDeleteOpen}
        setOpenDelete={setIsDeleteOpen}
        handleDelete={handleDelete}
        openRestore={isRestoreOpen}
        setOpenRestore={setIsRestoreOpen}
        handleRestore={handleRestore}
        /* Data Grid Props */
        paginationModel={paginationModel}
        totalCount={totalCount}
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
        handleSearchKeyDown={handleSearchKeyDown}
        dataGridLoading={dataGridLoading}
        handlePaginationModelChange={handlePaginationModelChange}
      />
    </>
  );
};

export default EndorsementLetterRequestsContainer;
