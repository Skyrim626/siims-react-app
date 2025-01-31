import React, { useEffect, useState } from "react";
import WeeklyReportPresenter from "./WeeklyReportPresenter";
import useForm from "./hooks/useForm";
import { addWar, deleteWarByID, getAllWar, updateWar } from "./Api";

const WeeklyReportContainer = ({ authorizeRole }) => {
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
   * MODAL STATE
   *
   *
   */
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [isLearningViewOpen, setIsLearningViewOpen] = useState(false);

  /**
   *
   *
   * SELECT STATE
   *
   *
   */
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedLearning, setSelectedLearning] = useState("");

  /**
   *
   *
   * USE FORM HOOK
   *
   *
   */
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    week_number: "",
    start_date: "",
    end_date: "",
    tasks: "",
    learnings: "",
    no_of_hours: "",
  });

  /**
   *
   *
   * ERROR STATE
   *
   */
  const [errors, setErrors] = useState({});

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
   * USE EFFECTS
   *
   *
   */
  useEffect(() => {
    getWeeklyRecords();
  }, []);

  /**
   *
   *
   * API FUNCTIONS
   *
   *
   */

  const getWeeklyRecords = async () => {
    await getAllWar({
      setLoading: setLoading,
      setRows: setRows,
      authorizeRole: authorizeRole,
    });
  };

  const addWeeklyTimeRecord = async (e) => {
    e.preventDefault();

    // console.log(formData);
    await addWar({
      authorizeRole: authorizeRole,
      setLoading: setLoading,
      payload: formData,
      setErrors: setErrors,
      setIsOpen: setIsAddOpen,
      setRows: setRows,
    });
  };

  const updateWeeklyTimeRecord = async (e) => {
    e.preventDefault();

    await updateWar({
      authorizeRole: authorizeRole,
      setLoading: setLoading,
      setRows: setRows,
      setErrors: setErrors,
      setOpen: setIsEditOpen,
      payload: formData,
    });
  };

  const deleteWeeklyTimeRecord = async (id) => {
    await deleteWarByID({
      setLoading: setLoading,
      id: id,
      setRows: setRows,
    });
  };

  /**
   *
   *
   * Other Functions
   *
   *
   */
  const openTaskViewModal = (tasks) => {
    // console.log(tasks);

    setSelectedTask(tasks);
    setIsTaskViewOpen(true);
  };

  const openLearningViewModal = (learning) => {
    setSelectedLearning(learning);
    setIsLearningViewOpen(true);
  };

  const openEditModal = (row) => {
    // console.log(row);

    setFormValues({
      ...row,
    });

    setIsEditOpen(true);
  };

  return (
    <WeeklyReportPresenter
      loading={loading}
      rows={rows}
      /** Form Props */
      formData={formData}
      handleInputChange={handleInputChange}
      /** Add Props */
      isAddOpen={isAddOpen}
      setIsAddOpen={setIsAddOpen}
      addWeeklyTimeRecord={addWeeklyTimeRecord}
      /** Task View Props */
      selectedTask={selectedTask}
      openTaskViewModal={openTaskViewModal}
      isTaskViewOpen={isTaskViewOpen}
      setIsTaskViewOpen={setIsTaskViewOpen}
      /** Learning View Props */
      selectedLearning={selectedLearning}
      openLearningViewModal={openLearningViewModal}
      isLearningViewOpen={isLearningViewOpen}
      setIsLearningViewOpen={setIsLearningViewOpen}
      /** Update props */
      openEditModal={openEditModal}
      isEditOpen={isEditOpen}
      setIsEditOpen={setIsEditOpen}
      updateWeeklyTimeRecord={updateWeeklyTimeRecord}
      /** Delete props */
      deleteWeeklyTimeRecord={deleteWeeklyTimeRecord}
      /** Validation Error Props */
      validationErrors={errors}
    />
  );
};

export default WeeklyReportContainer;
