import axiosClient from "../../api/axiosClient";
import { showSuccessAlert } from "../../utils/toastify";
import {
  ADD_DTR_API,
  ADD_WAR_API,
  DELETE_DTR_API,
  DELETE_WAR_API,
  GET_DTR_API,
  GET_WAR_API,
  PUT_DTR_API,
  PUT_WAR_API,
} from "./constants/resources";

// DELETE
export const deleteDtrByID = async ({ id, setRows, setLoading }) => {
  // Set Loading
  setLoading(true);

  try {
    // console.log(payload);

    const response = await axiosClient.delete(DELETE_DTR_API(id));

    // console.log(response);

    // Check response status
    if (response && response.status === 200) {
      showSuccessAlert(response.data.message); // Display Toastify

      // Set rows
      setRows((prevState) => prevState.filter((row) => row.id !== id));
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// Get all DTR
export const getAllDtr = async ({ setLoading, setRows }) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await axiosClient.get(GET_DTR_API);

    if (response && response.data) {
      setRows(response.data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// UPDATE
export const updateDtrByID = async ({
  setRows,
  setLoading,
  setOpen,
  setErrors,
  payload = {},
  authorizeRole,
}) => {
  // Set Loading
  setLoading(true);

  // Set Errors
  setErrors({});

  try {
    // console.log(payload);

    const response = await axiosClient.put(PUT_DTR_API(payload.id), payload, {
      params: {
        requestedBy: authorizeRole,
      },
    });

    if (response && response.status === 200) {
      // console.log(response.data);
      showSuccessAlert(response.data.message); // Display Toastify

      // console.log(response.data.data);

      setRows((prevData) =>
        prevData.map((data) =>
          data.id === payload["id"] ? { ...data, ...response.data.data } : data
        )
      );
      setOpen(false);
    }
  } catch (error) {
    console.error(error);

    if (error.status === 422) {
      console.error(error.status);

      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    }
  } finally {
    setLoading(false);
  }
};

// Add New Daily Time Record
export const addDtr = async ({
  authorizeRole,
  setLoading,
  setErrors,
  setOpen,
  payload = {},
  setRows,
}) => {
  // Set Loading
  setLoading(true);

  // Set Errors
  setErrors({});

  try {
    // console.log(payload);

    const response = await axiosClient.post(ADD_DTR_API, payload, {
      params: {
        requestedBy: authorizeRole,
      },
    });

    if (response) {
      // console.log(response.data);

      setRows((prevState) => [...prevState, response.data.data]);

      setOpen(false);
    }
  } catch (error) {
    console.error(error);

    if (error.status === 422) {
      console.error(error.status);

      // console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    }
  } finally {
    setLoading(false);
  }
};

/** UPDATE */
export const updateWar = async ({
  authorizeRole,
  setLoading,
  setRows,
  setErrors,
  setOpen,
  payload,
}) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await axiosClient.put(
      PUT_WAR_API(payload["id"]),
      payload,
      {
        params: {
          requestedBy: authorizeRole,
        },
      }
    );

    // Check Response
    if (response && response.status === 200) {
      setOpen(false);

      showSuccessAlert(response.data.message); // Display Toastify

      setRows((prevData) =>
        prevData.map((data) =>
          data.id === payload["id"] ? { ...data, ...response.data.data } : data
        )
      );
    }
  } catch (error) {
    // console.log(error);

    if (error.status === 422) {
      console.error(error.status);

      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    }
  } finally {
    setLoading(false);
  }
};

/** ADD */
export const addWar = async ({
  authorizeRole,
  setLoading,
  payload,
  setErrors,
  setIsOpen,
  setRows,
}) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await axiosClient.post(ADD_WAR_API, payload, {
      params: {
        requestedBy: authorizeRole,
      },
    });

    if (response && response.status === 201) {
      setIsOpen(false);

      setRows((prevState) => [...prevState, response.data.data]);

      // console.log(response.data.data);
    }
  } catch (error) {
    console.log(error);

    if (error.status === 422) {
      console.error(error.status);

      // console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    }
  } finally {
    setLoading(false);
  }
};

// Get all WAR
export const getAllWar = async ({ setLoading, setRows, authorizeRole }) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await axiosClient.get(GET_WAR_API, {
      params: {
        requestedBy: authorizeRole,
      },
    });

    if (response && response.status === 200) {
      // console.log(response.data);
      setRows(response.data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// DELETE WAR
export const deleteWarByID = async ({ setLoading, id, setRows }) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await axiosClient.delete(DELETE_WAR_API(id));

    // Check response
    if (response && response.status === 200) {
      showSuccessAlert(response.data.message); // Display Toastify

      // Set Rows
      setRows((prevState) => prevState.filter((row) => row.id !== id));
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
