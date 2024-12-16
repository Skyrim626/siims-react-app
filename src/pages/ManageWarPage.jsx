import React, { useEffect, useMemo, useState } from "react";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import { useParams } from "react-router-dom";
import { Button } from "@headlessui/react";
import Loader from "../components/common/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Plus } from "lucide-react";
import Text from "../components/common/Text";
import FormModal from "../components/modals/FormModal";
import WeeklyEntryForm from "../components/forms/WeeklyEntryForm";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

const ManageWarPage = ({ authorizeRole }) => {
  // Open Params
  const { applicationId } = useParams();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Row State
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Select State
  const [
    selectedWeeklyAccomplishmentReport,
    setSelectedWeeklyAccomplishmentReport,
  ] = useState({});

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    weekNumber: "",
    startDate: "",
    endDate: "",
    tasks: "",
    learnings: "",
    noOfHours: "",
  });

  // File Name
  const [fileName, setFileName] = useState("weekly-accomplishment-report.pdf");

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

  // Function that adds a new weekly entry
  const addWeeklyEntry = () => {
    // console.log(formData);

    // POST METHOD
    postData({
      url: `/${applicationId}/weekly-accomplishment-reports`,
      payload: {
        week_number: formData.weekNumber,
        start_date: formData.startDate,
        end_date: formData.endDate,
        tasks: formData.tasks,
        learnings: formData.learnings,
        no_of_hours: formData.noOfHours,
      },
      resetForm: resetForm,
    });
  };

  // Function that updates a weekly entry
  const updateWeeklyEntry = () => {
    // PUT METHOD
    putData({
      url: `/${applicationId}/weekly-accomplishment-reports/${selectedWeeklyAccomplishmentReport["id"]}`,
      payload: {
        week_number: formData.weekNumber,
        start_date: formData.startDate,
        end_date: formData.endDate,
        tasks: formData.tasks,
        learnings: formData.learnings,
        no_of_hours: formData.noOfHours,
      },
      selectedData: selectedWeeklyAccomplishmentReport,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedWeeklyAccomplishmentReport(row);

    // Set Form Values
    setFormValues({
      weekNumber: row.week_number,
      startDate: row.start_date,
      endDate: row.end_date,
      tasks: row.tasks,
      learnings: row.learnings,
      noOfHours: row.no_of_hours,
    });

    // Open Edit Modal
    setEditIsOpen(true);
  };

  /**
   * Function that deletes a weekly entry record.
   */
  const deleteUpdateWeeklyEntry = () => {
    // DELETE METHOD
    deleteData({
      url: `/${applicationId}/weekly-accomplishment-reports/${selectedWeeklyAccomplishmentReport["id"]}`,
      id: selectedWeeklyAccomplishmentReport["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedWeeklyAccomplishmentReport(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

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
        field: "week_number",
        headerName: "Week Number",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "start_date",
        headerName: "Start Date",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "end_date",
        headerName: "End Date",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "tasks",
        headerName: "Tasks",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "learnings",
        headerName: "Learnings",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "no_of_hours",
        headerName: "Number of hours",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
    ];

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
          Weekly Accomplishment Reports
        </h2>

        <div className="flex items-center justify-between my-3">
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              onClick={() => console.log("View DTR")}
              className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              View Weekly Reports as PDF
            </Button>

            <PDFDownloadLink
            // document={callDailyTimeRecordReport()}
            // fileName={fileName}
            >
              {({ loading }) =>
                loading ? (
                  <Button className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-gray-500 cursor-not-allowed text-white rounded">
                    Loading Weekly Report...
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={generateDailyTimeRecordPDF}
                    className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Download Weekly Report as PDF
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
            <Text>Add New Weekly Report</Text>
          </Button>
        </div>

        <DynamicDataGrid
          allowSearch={false}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={`/${applicationId}/weekly-accomplishment-reports`}
        />

        {/* Modals */}
        {/* Add Form Modal */}
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add Weekly Entry"
          onSubmit={addWeeklyEntry}
          minWidth={"min-w-[650px]"}
        >
          <WeeklyEntryForm
            weeklyEntryInfo={formData}
            handleWeeklyEntryInfoChange={handleInputChange}
            errors={validationErrors}
          />
        </FormModal>

        {/* Edit Form Modal */}
        <FormModal
          isOpen={isEditOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit Weekly Entry"
          onSubmit={updateWeeklyEntry}
          minWidth={"min-w-[650px]"}
        >
          <WeeklyEntryForm
            weeklyEntryInfo={formData}
            handleWeeklyEntryInfoChange={handleInputChange}
            errors={validationErrors}
          />
        </FormModal>

        {/* Delete Form Modal */}
        <DeleteConfirmModal
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          title="Delete Weekly Entry"
          message="Are you sure you want to delete this record?"
          handleDelete={deleteUpdateWeeklyEntry}
        />
      </div>
    </div>
  );
};

export default ManageWarPage;
