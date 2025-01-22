import React from "react";
import Loader from "../../../components/common/Loader";
import { Button, Select } from "@headlessui/react";
import { File, Plus } from "lucide-react";
import Modal from "../../../components/modals/Modal";
import AddNewStudentForm from "../forms/AddNewStudentForm";
import ImportAssignCoordinators from "../forms/ImportAssignCoordinators";

const SettingsPresenter = ({
  authorizeRole,

  loading,
  handleModalOpen,
  isOpen,
  status,
  file,
  handleFileChange,
  handleModalClose,
  handleSubmit,

  coordinators = [],
  programs = [],

  /**
   *
   * SELECT PROPS
   *
   */
  selectedCoordinatorID,
  setSelectedCoordinatorID,
  selectedProgramID,
  setSelectedProgramID,

  /**
   *
   *
   * MODAL PROPS
   *
   */
  setIsOpen,
}) => {
  // console.log(programs);

  // Modal Title
  const modalTitle =
    status === "ImportAllStudents"
      ? "Import All Students"
      : status === "ImportAssignCoordinators"
      ? "Import & Assign Coordinators"
      : "Add New Student";

  return (
    <div>
      <Loader loading={loading} />

      <div className="flex items-center justify-end gap-2">
        {/* Import all students */}
        {/* <Button
          onClick={() => handleModalOpen("ImportAllStudents")}
          className="flex font-semibold items-center gap-1 bg-green-600 hover:bg-green-700 rounded-full px-3 py-2 text-white text-sm"
        >
          <File size={18} />
          Import All Students Import & Assign Coordinators
        </Button> */}

        {/* Import or Assign Coordinator */}
        <Button
          onClick={() => handleModalOpen("ImportAssignCoordinators")}
          className="flex font-semibold items-center gap-1 bg-green-600 hover:bg-green-700 rounded-full px-3 py-2 text-white text-sm"
        >
          <File size={18} />
          Import & Assign Coordinators
        </Button>

        {/* Add individual student */}
        <Button
          onClick={() => handleModalOpen("AddNewStudent")}
          className="flex font-semibold items-center gap-1 bg-blue-600 hover:bg-blue-700 rounded-full px-3 py-2 text-white text-sm"
        >
          <Plus size={18} />
          Add New Student
        </Button>
      </div>

      {/* Modals */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} modalTitle={modalTitle}>
        {status === "AddNewStudent" && (
          <AddNewStudentForm programs={programs} coordinators={coordinators} />
        )}

        {status === "ImportAssignCoordinators" && (
          <ImportAssignCoordinators
            selectedCoordinatorID={selectedCoordinatorID}
            setSelectedCoordinatorID={setSelectedCoordinatorID}
            coordinators={coordinators}
            selectedProgramID={selectedProgramID}
            setSelectedProgramID={setSelectedProgramID}
            programs={programs}
            handleFileChange={handleFileChange}
            file={file}
            handleModalClose={handleModalClose}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>
    </div>
  );
};

export default SettingsPresenter;
