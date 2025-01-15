import React, { useState } from "react";

const useSubmit = ({ setData }) => {
  // Loading State
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const request_path = "/api/v1";

  /**
   * FOR HANDLING PUT REQUEST
   * - Method: (update)
   *    - update: Updates the data
   *    - restore: Restore the soft deleted data
   */
  const putRequest = async ({
    url,
    payload,
    resetForm,
    id,
    setModalState,
    method = "update",
  }) => {
    // Set Loading state
    setLoading(true);

    try {
      // MAKE THE PUT REQUEST
      const response = await putRequest({
        url: `${request_path}${url}`,
        payload,
      });

      if (response) {
        // Check if the method meets in these requirements
        if (method === "update" || method === "restore") {
          if (method === "update") {
            setData((prevData) => {
              // Check if `prevData` is an array
              if (Array.isArray(prevData)) {
                // Map through the array and update the matching object
                return prevData.map((data) =>
                  data.id === id ? { ...data, ...response.data } : data
                );
              } else if (typeof prevData === "object" && prevData !== null) {
                // If it's a single object, merge the updated data
                return { ...prevData, ...response.data };
              } else {
                // If `prevData` is undefined or another type, replace it directly
                return response.data;
              }
            });
          } else {
            setData((prevData) => prevData.filter((data) => data.id !== id)); // Filter the selected data (for restore)
          }

          // Close modal if applicable
          if (setModalState) {
            setModalState(false);
          }

          setErrors({});

          if (resetForm) {
            resetForm();
          }
        } else {
          alert("Unknown method for request");
        }
      }
    } catch (error) {
      setErrors(error.response?.data?.errors || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // FOR HANDLING DELETE REQUEST
  const deleteRequest = async ({ url, id, setModalState }) => {
    try {
      // Make Delete Method
      const response = await deleteRequest({
        url: `${request_path}${url}`,
      });

      // Close Modal
      if (setModalState) {
        setModalState(false);
      }

      if (response) {
        setData((prevData) => prevData.filter((data) => data.id !== id));
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data?.errors || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // FOR HANDLING POST REQUEST
  const postRequest = async ({ url, payload, resetForm }) => {
    console.log(url);

    // Set Loading State
    setLoading(true);

    try {
      // Make the POST request
      const response = await postRequest({
        data: payload,
        url: `${request_path}${url}`,
      });

      if (response) {
        // Determine if current state is an array or object
        setData((prevData) => {
          if (Array.isArray(prevData)) {
            // If it's an array, append the new object
            return [...prevData, response.data];
          } else if (typeof prevData === "object" && prevData !== null) {
            // If it's a single object, merge properties
            return { ...prevData, ...response.data };
          } else {
            // If prevData is undefined or another type, replace with response data
            return response.data;
          }
        });

        setIsOpen(false);
        setErrors({});
      }

      // Resets the Form
      if (resetForm) {
        resetForm();
      }
    } catch (error) {
      setErrors(error.response?.data?.errors || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    // HTTP METHODS
    postRequest,
    putRequest,
    deleteRequest,

    errors,
    loading,
  };
};

export default useSubmit;
