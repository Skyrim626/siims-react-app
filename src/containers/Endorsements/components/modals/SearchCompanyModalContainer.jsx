import React, { useState } from "react";
import { getRequest } from "../../../../api/apiHelpers";
import { searchCompany } from "../../api";
import SearchCompanyModalPresenter from "./SearchCompanyModalPresenter";
import Loader from "../../../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../_redux/endorsementLetterSlice";

const SearchCompanyModalContainer = ({ setIsModalOpen }) => {
  /**
   *
   * Loading
   *
   *
   */

  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * Use States (String, Array)
   *
   *
   */

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /**
   *
   * Redux (formData)
   *
   */

  const dispatch = useDispatch();

  /**
   *
   * Handlers
   *
   */

  const toggleModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectCompany = (company) => {
    // Update form data via Redux dispatch
    dispatch(updateField({ key: "company_name", value: company.name }));

    if (company.fullName) {
      dispatch(updateField({ key: "recipient_name", value: company.fullName }));
      dispatch(
        updateField({
          key: "greeting_message",
          value: `Dear ${company.fullName}`,
        })
      );
    }

    dispatch(
      updateField({ key: "company_address", value: company.fullAddress })
    );

    toggleModal();
  };

  const handleSearch = async (e) => {
    await searchCompany({
      event: e,
      params: {
        query: searchTerm,
      },
      setLoading: setLoading,
      setData: setSearchResults,
    });
  };

  return (
    <>
      <SearchCompanyModalPresenter
        loading={loading}
        toggleModal={toggleModal}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSelectCompany={handleSelectCompany}
        searchResults={searchResults}
      />
    </>
  );
};
export default SearchCompanyModalContainer;
