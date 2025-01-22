import React, { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import { Button } from "@headlessui/react";
import { File, Plus } from "lucide-react";
import SettingsPresenter from "./SettingsPresenter";
import {
  getAllListOfCoordinators,
  getAllListOfPrograms,
  importAllStudents,
} from "../api";

const SettingsContainer = ({ authorizeRole }) => {
  /**
   *
   * Modal State
   *
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   *
   *
   * Lists State
   *
   *
   */
  const [coordinators, setCoordinators] = useState([]);
  const [programs, setPrograms] = useState([]);

  /**
   *
   *
   * Select State
   *
   *
   */
  const [selectedCoordinatorID, setSelectedCoordinatorID] = useState("");
  const [selectedProgramID, setSelectedProgramID] = useState("");

  /**
   *
   * Status State
   *
   */
  const [status, setStatus] = useState("");

  /**
   *
   * Loading State
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * Fetch State
   *
   *
   */

  const fetchListOfPrograms = async () => {
    // Set Loading
    setLoading(true);

    try {
      const response = await getAllListOfPrograms();

      // console.log(response);
      setPrograms(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchListOfCoordinators = async () => {
    // Set Loading
    setLoading(true);

    try {
      const response = await getAllListOfCoordinators();

      // console.log(response);
      setCoordinators(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListOfCoordinators();
    fetchListOfPrograms();
  }, []);

  // File State
  const [file, setFile] = useState(null);

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle modal open based on the button clicked
  const handleModalOpen = (action) => {
    setStatus(action);
    setIsOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsOpen(false);
    setStatus("");
    setFile(null);
  };

  // Submit action based on button clicked
  const handleSubmit = async () => {
    // Check Loading
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("status", status);
      formData.append("coordinator_id", selectedCoordinatorID);
      formData.append("program_id", selectedProgramID);

      // console.log(selectedProgramID);

      // Import All Students
      if (status === "ImportAssignCoordinators") {
        console.log("Importing all students with file:", file);

        await importAllStudents({
          formData: formData,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    // Simulate submission for different actions
    setTimeout(() => {
      if (status === "ImportAllStudents") {
        console.log("Importing all students with file:", file);
        // Add logic to handle the import of all students
      } else if (status === "ImportAssignCoordinators") {
        console.log(
          "Importing students and assigning coordinators with file:",
          file
        );
        // Add logic to handle importing and assigning coordinators
      } else if (status === "AddNewStudent") {
        console.log("Adding new student");
        // Add logic to handle adding a new student
      }

      setLoading(false);
      handleModalClose();
    }, 2000);
  };

  return (
    <SettingsPresenter
      authorizeRole={authorizeRole}
      loading={loading}
      handleModalOpen={handleModalOpen}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      status={status}
      file={file}
      handleFileChange={handleFileChange}
      handleModalClose={handleModalClose}
      handleSubmit={handleSubmit}
      coordinators={coordinators}
      selectedCoordinatorID={selectedCoordinatorID}
      setSelectedCoordinatorID={setSelectedCoordinatorID}
      selectedProgramID={selectedProgramID}
      setSelectedProgramID={setSelectedProgramID}
      programs={programs}
    />
  );
};

export default SettingsContainer;
