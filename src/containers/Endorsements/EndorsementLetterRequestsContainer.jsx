import React, { useMemo, useState } from "react";
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
import { deleteByID, restoreByID } from "./api";

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

  /**
   *
   * CSV Generator
   *
   */
  /* const generateCSV = () => {
    if (!rows || rows.length === 0) {
      alert("No data available for download.");
      return;
    }

    const headers = [
      "Company Name",
      "Student Name",
      "Student ID",
      "Student Email",
      "Status",
      "Letter Status",
    ];

    // Group rows by company_name
    const groupedByCompany = rows.reduce((acc, row) => {
      const companyName = row.company_name || "Unknown Company";
      if (!acc[companyName]) {
        acc[companyName] = [];
      }
      acc[companyName].push(row);
      return acc;
    }, {});

    // Generate CSV rows
    const csvRows = [];
    for (const [companyName, companyRows] of Object.entries(groupedByCompany)) {
      csvRows.push([`"${companyName}"`, "", "", "", "", ""]); // Company header row

      companyRows.forEach((row) => {
        const {
          name = "N/A", // Requester name
          student_id = "N/A",
          status = "N/A",
          letter_status_name = "N/A",
          students = [],
        } = row;

        if (students.length > 0) {
          // Add a row for each student
          students.forEach((student) => {
            const studentID = student.student?.user_id || "";
            const studentEmail = student.student?.user?.email || "";
            const studentName = `${student.student?.user?.first_name} ${student.student?.user?.middle_name} ${student.student?.user?.last_name}`;

            csvRows.push([
              "", // Empty for company grouping
              studentName,
              studentID,
              studentEmail,
              status,
              letter_status_name,
            ]);
          });
        } else {
          // If no students are linked, add the requester info
          csvRows.push([
            "", // Empty for company grouping
            name,
            student_id,
            "N/A", // No email
            status,
            letter_status_name,
          ]);
        }
      });
    }

    // Convert rows to CSV content
    const csvContent = [
      headers.join(","), // Add headers
      ...csvRows.map((row) => row.join(",")), // Add rows
    ].join("\n");

    // Trigger CSV download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "endorsement_requests_by_company.csv";
    link.click();
  }; */

  return (
    <>
      {/* <button onClick={generateCSV} style={{ marginTop: "20px" }}>
        Download CSV
      </button> */}
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
      />
    </>
  );
};

export default EndorsementLetterRequestsContainer;
