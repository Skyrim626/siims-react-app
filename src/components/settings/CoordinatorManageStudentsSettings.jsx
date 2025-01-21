import { Button } from "@headlessui/react";
import React, { useState } from "react";
import FormModal from "../modals/FormModal";
import { File } from "lucide-react";
import ImportAssignStudentForm from "../../pages/admin/forms/ImportAssignStudentForm";
import { postFormDataRequest } from "../../api/apiHelpers";
import Loader from "../common/Loader";

// API Route Path
const API_ROUTE_PATH = {
  import_students_assign: "/api/v1/users/students/import-students-assign",
};

const CoordinatorManageStudentsSettings = () => {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);

  // File State
  const [file, setFile] = useState(null);

  // Submit File
  const submitFile = async (event) => {
    event.preventDefault();

    // Set Loading
    setLoading(true);

    if (!file) {
      setStatus("error");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("classlist", file);

    try {
      const response = await postFormDataRequest({
        url: API_ROUTE_PATH.import_students_assign,
        data: formData,
      });

      // console.log(response);

      // Check if it has response
      if (response) {
        // Close Modal
        setIsOpen(false);
        setStatus("success");

        // window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * A function that handles the File Change
   */
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setStatus(""); // Reset status on file selection
  };

  return (
    <div>
      <Loader loading={loading} />

      <div className="flex items-center justify-end">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 rounded-full px-3 py-2 text-white text-sm"
        >
          <File size={18} />
          Import Student
        </Button>
      </div>

      {/* Import Form Modal */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Import Students"
        onSubmit={submitFile}
      >
        <ImportAssignStudentForm
          file={file}
          handleFileChange={handleFileChange}
          status={status}
        />
      </FormModal>
    </div>
  );
};

export default CoordinatorManageStudentsSettings;
