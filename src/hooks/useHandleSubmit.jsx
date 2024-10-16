import { useState } from "react";
import axios from "axios";
import { postRequest, putRequest } from "../api/apiHelpers";

const useHandleSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async ({
    url,
    method = "post", // Default method is POST
    data,
    resetField,
    setState,
    closeModal,
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Declare variable for handling axios
      let response = "";

      // Send Request based on method
      // Dynamic method (post, get, put, delete, etc.)
      switch (method) {
        case "post":
          response = await postRequest({
            url: url,
            data: data,
          });
          break;
        case "put":
          response = await putRequest({
            url: url,
            data: data,
          });
          break;
      }

      // Reset Input Field
      if (resetField) resetField();
      // Update State
      if (setState) setState(response.data);
      // Close Modal if applicable
      if (closeModal) closeModal();
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, error };
};

export default useHandleSubmit;
