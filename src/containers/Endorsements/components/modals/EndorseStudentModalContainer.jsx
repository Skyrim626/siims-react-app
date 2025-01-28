import React, { useState } from "react";
import axiosClient from "../../../../api/axiosClient";
import { getRequest } from "../../../../api/apiHelpers";
import Loader from "../../../../components/common/Loader";
import EndorseStudentModalPresenter from "./EndorseStudentModalPresenter";
import { searchStudent } from "../../api";

const EndorseStudentModalContainer = ({
  setNewStudent,
  setIsStudentModalOpen,
}) => {
  // Loading State
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const toggleModal = () => {
    setIsStudentModalOpen(false);
  };

  /**
   *
   *
   * Handler Functions
   *
   *
   */
  const handleSearch = async (e) => {
    await searchStudent({
      event: e,
      params: {
        query: searchTerm,
      },
      setLoading: setLoading,
      setSearchResults: setSearchResults,
    });
  };

  const handleSelectStudent = (student) => {
    setNewStudent({
      id: student.id,
      fullName: student.fullName,
      phoneNumber: student.phoneNumber,
      email: student.email,
      hasOrientation: student.hasOrientation,
    });

    setSelectedStudent(student);

    toggleModal();
  };

  return (
    <EndorseStudentModalPresenter
      loading={loading}
      toggleModal={toggleModal}
      handleSearch={handleSearch}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchResults={searchResults}
      handleSelectStudent={handleSelectStudent}
    />
  );
};

export default EndorseStudentModalContainer;
