import React, { useEffect, useMemo, useState } from "react";
import { getRequest } from "../api/apiHelpers";
import { replace, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Button } from "@headlessui/react";
import Text from "../components/common/Text";
import { Plus } from "lucide-react";
import FormModal from "../components/modals/FormModal";
import DailyTimeRecordForm from "../components/forms/DailyTimeRecordForm";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import { getTimeRecordStatusColor } from "../utils/statusColor";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import GenerateDailyTimeRecord from "../components/letters/GenerateDailyTimeRecord";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";

const ManageDtrPage = ({ authorizeRole }) => {
  // Navigation
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Row State
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Select State
  const [selectedDailyTimeRecord, setSelectedDailyTimeRecord] = useState({});

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    date: "",
    timeIn: "",
    timeOut: "",
    hoursReceived: "",
  });

  // File Name
  const [fileName, setFileName] = useState("daily-time-record.pdf");

  /**
   * Use Request
   */
  const {
    errors: validationErrors,
    postData,
    putData,
    deleteData,
  } = useRequest({
    setData: setRows,
    setIsOpen: setIsOpen,
    setLoading: setLoading,
  });

  /**
   * Function that calls the Time Record Letter
   */
  const callDailyTimeRecordReport = () => {
    return <GenerateDailyTimeRecord dailyTimeRecords={rows} />;
  };

  /**
   * Function that generates Daily Time Record PDF
   */
  const generateDailyTimeRecordPDF = () => {};

  /**
   * Function that views Daily Time Record PDF
   */
  const viewDailyTimeRecordPDF = async () => {
    try {
      const document = callDailyTimeRecordReport();
      const blob = await pdf(document).toBlob();

      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  /**
   * Function that adds a new Daily Time Record
   */
  const addDailyTimeRecord = () => {
    console.log(formData);
    // POST METHOD
    postData({
      url: "/daily-time-records",
      payload: {
        date: new Date(formData.date).toISOString().split("T")[0],
        time_in: formData.timeIn,
        time_out: formData.timeOut,
        hours_received: Number(formData.hoursReceived),
      },
      resetForm: resetForm,
    });
  };

  /**
   * Function that updates a daily time record
   */
  const updateDailyTimeRecord = () => {
    // PUT METHOD
    putData({
      url: `/daily-time-records/${selectedDailyTimeRecord["id"]}`,
      payload: {
        date: new Date(formData.date).toISOString().split("T")[0],
        time_in: formData.timeIn,
        time_out: formData.timeOut,
        hours_received: Number(formData.hoursReceived),
      },
      selectedData: selectedDailyTimeRecord,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedDailyTimeRecord(row);

    // Set Form Values
    setFormValues({
      date: row.date,
      timeIn: row.time_in,
      timeOut: row.time_out,
      hoursReceived: row.hours_received,
    });

    // Open Edit Modal
    setEditIsOpen(true);
  };

  /**
   * Function that deletes a daily time record
   */
  const deleteDailyTimeRecord = () => {
    // DELETE METHOD
    deleteData({
      url: `/daily-time-records/${selectedDailyTimeRecord["id"]}`,
      id: selectedDailyTimeRecord["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedDailyTimeRecord(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  /**
   * Use Effect
   */
  useEffect(() => {
    // ! Call this method to check Student Status ID (Allowed: Student)
    const fetchStudentStatusId = async () => {
      // Set Loading State
      setLoading(true);

      try {
        const studentStatusIdResponse = await getRequest({
          url: "/api/v1/users/students/get-student-status-id",
        });

        /**
         * * Check if the student status ID is applicable to access this page
         * * Returns the student back to the home page if the student status id did not meet the condition.
         */
        if (![4, 12].includes(studentStatusIdResponse)) {
          navigate("/auth/my", {
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // ! Call fetchStudentStatusId (Allowed: Student)
    fetchStudentStatusId();
  }, []);

  // Static Columns
  const staticColumns = useMemo(() => {
    const columns = [
      {
        field: "id",
        headerName: "ID",
        width: 90,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "date",
        headerName: "Date",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "time_in",
        headerName: "Time In",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "time_out",
        headerName: "Time Out",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "hours_received",
        headerName: "Hours Received",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "status_name",
        headerName: "Status",
        width: 150,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
          const { textColor, backgroundColor } = getTimeRecordStatusColor(
            params.value
          );

          return (
            <div
              className={`${textColor} ${backgroundColor} flex items-center justify-center rounded-full`}
            >
              {params.value}
            </div>
          );
        },
      },
    ];

    // Add the "Deleted At" column only if the role is "admin"
    if (authorizeRole === "admin") {
      columns.push({
        field: "deleted_at",
        headerName: "Deleted At",
        width: 300,
        headerClassName: "super-app-theme--header",
      });
    }

    return columns;
  }, [authorizeRole]);

  // Action Column
  const actionColumn = useMemo(
    () => ({
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex space-x-2 items-center justify-center">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            onClick={() => handleEditModal(params.row)}
          >
            Edit
          </Button>

          <Button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
            onClick={() => handleDeleteModal(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
      sortable: false, // Prevent sorting for the actions column
      filterable: false, // Prevent filtering for the actions column
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

      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Daily Time Record
        </h2>

        <div className="flex items-center justify-between my-3">
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              onClick={viewDailyTimeRecordPDF}
              className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              View DTR as PDF
            </Button>

            <PDFDownloadLink
              document={callDailyTimeRecordReport()}
              fileName={fileName}
            >
              {({ loading }) =>
                loading ? (
                  <Button className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-gray-500 cursor-not-allowed text-white rounded">
                    Loading DTR...
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={generateDailyTimeRecordPDF}
                    className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Download DTR as PDF
                  </Button>
                )
              }
            </PDFDownloadLink>
          </div>

          <Button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            <Plus size={20} />
            <Text>Add New Record</Text>
          </Button>
        </div>

        <DynamicDataGrid
          allowSearch={false}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={"/daily-time-records/latest"}
        />

        {/* Modals */}
        {/* Add Form Modal */}
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add Daily Time Record"
          onSubmit={addDailyTimeRecord}
          minWidth={"min-w-[650px]"}
        >
          <DailyTimeRecordForm
            dailyTimeRecordInfo={formData}
            handleDailyTimeRecordInfoChange={handleInputChange}
            errors={validationErrors}
          />
        </FormModal>

        {/* Edit Form Modal */}
        <FormModal
          isOpen={isEditOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit Daily Time Record"
          onSubmit={updateDailyTimeRecord}
          minWidth={"min-w-[650px]"}
        >
          <DailyTimeRecordForm
            dailyTimeRecordInfo={formData}
            handleDailyTimeRecordInfoChange={handleInputChange}
            errors={validationErrors}
          />
        </FormModal>

        {/* Delete Form Modal */}
        <DeleteConfirmModal
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          title="Delete Time Record"
          message="Are you sure you want to delete this record?"
          handleDelete={deleteDailyTimeRecord}
        />
      </div>
    </div>
  );
};

export default ManageDtrPage;
