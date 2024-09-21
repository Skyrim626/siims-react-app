import React, { useState } from "react";
import { postRequest } from "../api/apiHelpers";

const useSubmitForm = ({ setState, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async ({ payload = {}, url }) => {
    setErrors(null);

    try {
      // Submit Form
      const response = await postRequest({
        url: url,
        data: payload,
      });

      console.log(response);
      // Set State
      setState((prevState) => [...prevState, response.data]);

      // Close
      setIsOpen(false);
    } catch (error) {
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  return {
    errors,
    handleSubmit,
    loading,
  };
};

export default useSubmitForm;
