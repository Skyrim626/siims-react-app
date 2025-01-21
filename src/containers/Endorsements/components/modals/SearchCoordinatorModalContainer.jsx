import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../_redux/endorsementLetterSlice";
import { searchCoordinator } from "../../api";
import SearchCoordinatorModalPresenter from "./SearchCoordinatorModalPresenter";

const SearchCoordinatorModalContainer = ({ setIsModalOpen }) => {
  /**
   *
   * Loading State
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   * Search State
   *
   *
   */
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /**
   *
   *
   * Select State
   *
   */
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);

  /**
   *
   * Redux (formData)
   *
   */
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(false);
  };

  /**
   *
   *
   * Handler Functions
   *
   *
   */
  const handleSelectCoordinator = (coordinator) => {
    dispatch(
      updateField({
        key: "ojt_coordinator_full_name",
        value: coordinator.fullName,
      })
    );

    dispatch(
      updateField({
        key: "ojt_coordinator_email",
        value: coordinator.email,
      })
    );

    toggleModal();
  };

  const handleSearch = async (e) => {
    await searchCoordinator({
      event: e,
      params: {
        query: searchTerm,
      },
      setLoading: setLoading,
      setSearchResults: setSearchResults,
    });
  };

  return (
    <SearchCoordinatorModalPresenter
      loading={loading}
      toggleModal={toggleModal}
      handleSearch={handleSearch}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchResults={searchResults}
      handleSelectCoordinator={handleSelectCoordinator}
    />
  );
};

export default SearchCoordinatorModalContainer;
