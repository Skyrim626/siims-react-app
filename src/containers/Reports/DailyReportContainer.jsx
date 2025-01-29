import React, { useEffect, useState } from "react";
import DailyReportPresenter from "./DailyReportPresenter";
import useForm from "./hooks/useForm";
import { addDtr, deleteDtrByID, getAllDtr, updateDtrByID } from "./Api";
import DailyTimeRecordTemplate from "./report-templates/DailyTimeRecordTemplate";
import { pdf } from "@react-pdf/renderer";

const DailyReportContainer = ({ authorizeRole }) => {
  /**
   *
   *
   * LOADING STATE
   *
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
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
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   *
   *
   * SELECT STATE
   *
   *
   *
   */
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDailyTimeRecord, setSelectedDailyTimeRecord] = useState({});

  /**
   *
   *
   * USE FORM HOOK
   *
   *
   */
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    id: "",
    date: "",
    time_in: "",
    time_out: "",
    hours_received: "",
  });

  /**
   *
   *
   *
   * ERROR HANDLER
   *
   *
   */
  const [errors, setErrors] = useState({});

  /**
   *
   *
   *
   * OTHER USE STATE
   *
   *
   *
   */
  const [fileName, setFileName] = useState("daily-time-record.pdf");

  /**
   *
   *
   * MODAL FUNCTIONS
   *
   *
   */
  const openEditModal = (row) => {
    // console.log(row);

    // Set Form Values
    setFormValues({
      ...row,
    });

    // Open Edit
    setEditIsOpen(true);
  };

  /**
   *
   *
   *
   * OTHER FUNCTIONS
   *
   *
   *
   */
  const callDailyTimeRecordReport = () => {
    return <DailyTimeRecordTemplate records={rows} />;
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
   *
   *
   * API FORM
   *
   *
   */

  const updateDailyTimeRecord = async (e, id) => {
    e.preventDefault();

    await updateDtrByID({
      setRows: setRows,
      setLoading: setLoading,
      setOpen: setEditIsOpen,
      setErrors: setErrors,
      payload: formData,
      authorizeRole: authorizeRole,
    });
  };

  const deleteDailyTimeRecord = async (id) => {
    await deleteDtrByID({
      id: id,
      setRows: setRows,
      setLoading: setLoading,
    });
  };

  const addDailyTimeRecord = async (e) => {
    e.preventDefault();

    await addDtr({
      authorizeRole: authorizeRole,
      setLoading: setLoading,
      setErrors: setErrors,
      setOpen: setIsAddOpen,
      payload: formData,
      setRows: setRows,
    });
  };

  const getDailyTimeRecords = async () => {
    await getAllDtr({
      setRows: setRows,
      setLoading: setLoading,
    });
  };

  /**
   *
   *
   * USE EFFECTS
   *
   *
   *
   */
  useEffect(() => {
    getDailyTimeRecords();
  }, []);

  return (
    <DailyReportPresenter
      loading={loading}
      rows={rows}
      viewDailyTimeRecordPDF={viewDailyTimeRecordPDF}
      fileName={fileName}
      /** Modal Props */
      isAddOpen={isAddOpen}
      isEditOpen={isEditOpen}
      setEditIsOpen={setEditIsOpen}
      setIsAddOpen={setIsAddOpen}
      openEditModal={openEditModal}
      /** Form Props */
      formData={formData}
      handleInputChange={handleInputChange}
      validationErrors={errors}
      /** Function Props */
      addDailyTimeRecord={addDailyTimeRecord}
      deleteDailyTimeRecord={deleteDailyTimeRecord}
      updateDailyTimeRecord={updateDailyTimeRecord}
    />
  );
};

export default DailyReportContainer;
