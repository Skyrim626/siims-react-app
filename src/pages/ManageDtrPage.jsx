import React, { useEffect, useMemo, useState } from "react";
import { getRequest, postFormDataRequest } from "../api/apiHelpers";
import { replace, useNavigate, useParams } from "react-router-dom";
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
import {
  getTimeRecordActionColumns,
  getTimeRecordStaticColumns,
} from "../utils/columns/timeRecordColumns";
import UploadFile from "../components/common/UploadFile.";

const ManageDtrPage = ({ authorizeRole }) => {
  // Params
  const { application_id } = useParams();
  // console.log(application_id);

  // Resources
  const timeRecordResource = `/reports/${application_id}/daily-time-records?requestedBy=${authorizeRole}`;
  const applicationResource = `/api/v1/applications/${application_id}`;

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
  // Container State
  const [application, setApplication] = useState({});

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    date: "",
    timeIn: "",
    timeOut: "",
    hoursReceived: "",
  });

  // File Name
  const [fileName, setFileName] = useState("daily-time-record.pdf");
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Select State
  const [selectedFile, setSelectedFile] = useState(null);

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

  // Fetch application
  const fetchApplication = async () => {
    // Set Loading
    setLoading(true);

    try {
      const response = await getRequest({
        url: applicationResource,
      });

      if (response) {
        // console.log(response);
        setApplication(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  /**
   * Function that calls the Time Record Letter
   */
  const callDailyTimeRecordReport = () => {
    return <GenerateDailyTimeRecord dailyTimeRecords={rows} />;
  };

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

  // Handle Open Modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null); // Clear selected file when closing modal
    setIsModalOpen(false);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleSubmitFile = async () => {
    if (!selectedFile) {
      showFailedAlert("Please select a file to upload.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("daily_time_record", selectedFile);

      // Example API endpoint
      const response = await postFormDataRequest({
        url: `/api/v1/reports/${application_id}/daily-time-record/submit`,
        data: formData,
      });

      if (response) {
        // alert("File uploaded successfully!"); // Replace with your preferred notification
        closeModal();
      }
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
      navigate(-1, {
        replace: true,
      });
    }
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

  // Static Columns
  const staticColumns = useMemo(() => getTimeRecordStaticColumns(), []);

  // Action Column
  const actionColumn = useMemo(
    () =>
      getTimeRecordActionColumns({
        handleEditModal,
        handleDeleteModal,
      }),
    []
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
                    className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Download DTR as PDF
                  </Button>
                )
              }
            </PDFDownloadLink>

            {application.application_status_id === 6 && (
              <Button
                type="button"
                onClick={handleOpenModal}
                className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Submit DTR
              </Button>
            )}
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
          // url={"/daily-time-records/latest"}
          url={timeRecordResource}
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

      {/* Modal for File Upload */}
      <FormModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        modalTitle="Upload Daily Time Record Report"
        onSubmit={handleSubmitFile}
      >
        <UploadFile
          title="Upload Daily Time Record Report"
          file={selectedFile}
          set={setSelectedFile}
          handleFileChange={handleFileChange}
        />
      </FormModal>
    </div>
  );
};

export default ManageDtrPage;
