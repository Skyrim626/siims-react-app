import { useState } from "react";
import { deleteRequest, postRequest, putRequest } from "../api/apiHelpers";

const useRequest = ({ setIsOpen, setData, setLoading }) => {
  // const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const request_path = "/api/v1";

  /**
   * POST METHOD
   */
  const postData = async ({ url, payload, resetForm, params = {} }) => {
    // Set loading state to true
    setLoading(true);

    // console.log(url);

    try {
      // Make the POST request
      const response = await postRequest({
        data: payload,
        url: `${request_path}${url}`,
        params: params,
      });

      if (response) {
        setData((prevData) => [...prevData, response.data]); // Save the response data
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

  /**
   * PUT (RESTORE) METHOD
   */
  const restoreData = async ({ url, selectedData }) => {
    // Set loading state to true
    setLoading(true);

    try {
      // Make the PUT Method
      const response = await putRequest({
        url: `${request_path}${url}`,
      });

      if (response) {
        setData((prevData) =>
          prevData.map((data) =>
            data.id === selectedData["id"]
              ? { ...data, ...response.data }
              : data
          )
        );

        setErrors({});
      }
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data?.errors || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  /**
   * PUT METHOD
   */
  const putData = async ({
    url,
    payload,
    selectedData,
    setIsOpen,
    resetForm,
    id,
    params = {},
  }) => {
    // Set loading state to true
    setLoading(true);

    // console.log(url);
    // console.log(payload);

    try {
      // Make the PUT Method
      const response = await putRequest({
        url: `${request_path}${url}`,
        data: payload,
        params: params,
      });

      // console.log(response.data);
      // console.log("selectedData: ", selectedData);

      if (response["type"] && response["type"] === "restore") {
        setData((prevData) => prevData.filter((data) => data.id !== id));
      } else {
        setData((prevData) =>
          prevData.map((data) =>
            data.id === selectedData["id"]
              ? { ...data, ...response.data }
              : data
          )
        );

        // Check if setIsOpen
        if (setIsOpen) {
          setIsOpen(false);
        }

        setErrors({});
      }

      // Resets the Form
      if (resetForm) {
        resetForm();
      }
    } catch (error) {
      // console.log(error);
      setErrors(error.response?.data?.errors || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE METHOD
   */
  const deleteData = async ({ url, id, setIsDeleteOpen }) => {
    // Set Loading State
    setLoading(true);

    try {
      // Make Delete Method
      const response = await deleteRequest({
        url: `${request_path}${url}`,
      });

      // Close Modal
      if (setIsDeleteOpen) {
        setIsDeleteOpen(false);
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

  return { postData, putData, deleteData, restoreData, errors };
};

export default useRequest;
