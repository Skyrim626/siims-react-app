import React, { useState } from "react";
import ManualCreateEndorsementLetterPresenter from "./ManualCreateEndorsementLetterPresenter";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  addStudent,
  clearStudents,
  removeStudent,
  resetForm,
} from "./_redux/endorsementLetterSlice";
import { pdf } from "@react-pdf/renderer";
import { postManualRequest } from "./api";

const ManualCreateEndorsementLetterContainer = ({
  type = "manual",
  callEndorsementLetter,
  viewPdf,
  authorizeRole,
}) => {
  /**
   *
   * Other Initializers
   *
   */
  const date = new Date();

  /**
   *
   * Loading
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   * Modal State
   *
   */
  const [isOpenSignatureModal, setIsOpenSignatureModal] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isSearchCoordinatorModalOpen, setIsSearchCoordinatorModalOpen] =
    useState(false);
  const [isSearchCompanyModalOpen, setIsSearchCompanyModalOpen] =
    useState(false);

  /**
   *
   * Hooks
   *
   */

  // Use Form
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.endorsementLetter);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ key: name, value }));
  };

  /**
   *
   * Use States (Array)
   *
   */
  const [students, setStudents] = useState([]);

  /**
   *
   * Use States (String)
   *
   */
  const [fileName, setFileName] = useState("endorsement-letter.pdf");

  /**
   *
   * Use States (Object)
   *
   */
  const [newStudent, setNewStudent] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  /**
   *
   * Use States (Unknown)
   *
   */
  const [signatureImage, setSignatureImage] = useState(null);
  const [startingMonth, setStartingMonth] = useState(null);
  const [endingMonth, setEndingMonth] = useState(null);
  const [targetYear, setTargetYear] = useState(null);

  /**
   *
   *
   * Handlers
   *
   */
  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Remove student by ID
  const handleRemoveStudent = (id) => {
    dispatch(removeStudent(id));
  };

  const handleAddStudent = () => {
    if (newStudent.id && newStudent.fullName && newStudent.email) {
      // Dispatch the action to append the new student
      dispatch(addStudent(newStudent));

      setNewStudent({ id: "", fullName: "", email: "", phoneNumber: "" }); // Clear input fields
    }

    if (formData.requested_by_id === "") {
      dispatch(
        updateField({
          key: "requested_by_id",
          value: newStudent.id,
        })
      );
    }
  };

  /**
   * Handle Print and Send
   */
  const handlePrintAndSend = async () => {
    // Set Loading
    setLoading(true);

    // Step 1: Generate PDF
    const document = callEndorsementLetter(formData);
    const blob = await pdf(document).toBlob();

    // Step 2: Open PDF in a new tab for printing
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");

    // Step 3: Add payload
    const student_ids = formData.students.map((student) => ({
      student_id: student.id,
    }));

    // Ready Payload
    const payload = {
      ...formData,
      student_ids: student_ids,
      remarks: "",
    };

    // console.log(payload);

    const response = await postManualRequest({
      setLoading: setLoading,
      payload: payload,
    });

    if (response) {
      dispatch(resetForm());
    }
  };

  /**
   *
   *
   * Other Functions
   *
   */

  return (
    <ManualCreateEndorsementLetterPresenter
      authorizeRole={authorizeRole}
      loading={loading}
      formData={formData}
      handleInputChange={handleInputChange}
      isSearchCompanyModalOpen={isSearchCompanyModalOpen}
      setIsSearchCompanyModalOpen={setIsSearchCompanyModalOpen}
      isSearchCoordinatorModalOpen={isSearchCoordinatorModalOpen}
      setIsSearchCoordinatorModalOpen={setIsSearchCoordinatorModalOpen}
      handleAddStudent={handleAddStudent}
      handleRemoveStudent={handleRemoveStudent}
      newStudent={newStudent}
      setNewStudent={setNewStudent}
      handleStudentInputChange={handleStudentInputChange}
      isStudentModalOpen={isStudentModalOpen}
      setIsStudentModalOpen={setIsStudentModalOpen}
      callEndorsementLetter={callEndorsementLetter}
      viewPdf={viewPdf}
      handlePrintAndSend={handlePrintAndSend}
    />
  );
};

export default ManualCreateEndorsementLetterContainer;
