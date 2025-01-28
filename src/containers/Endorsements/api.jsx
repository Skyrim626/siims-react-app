import axios from "axios";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/apiHelpers";
import {
  ADD_MANUAL_REQUEST_URL,
  DELETE_BY_ID_URL,
  GET_VALIDATE_ORIENTATION,
  RESTORE_BY_ID_URL,
  SEARCH_COMPANY_URL,
  SEARCH_COORDINATOR_URL,
  SEARCH_STUDENT_URL,
} from "./constants/resources";

export const searchStudent = async ({
  event,
  params,
  setLoading,
  setSearchResults,
}) => {
  event.preventDefault();

  // Set Loading
  setLoading(true);

  try {
    const response = await getRequest({
      url: SEARCH_STUDENT_URL,
      params: params,
    });

    if (response) {
      setSearchResults(response || []);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const searchCoordinator = async ({
  event,
  params,
  setLoading,
  setSearchResults,
}) => {
  event.preventDefault();

  // Set Loading
  setLoading(true);

  try {
    const response = await getRequest({
      url: SEARCH_COORDINATOR_URL,
      params: params,
    });

    // Check if there is a response
    if (response) {
      setSearchResults(response || []);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const searchCompany = async ({ event, params, setLoading, setData }) => {
  event.preventDefault();

  // Set Loading
  setLoading(true);

  try {
    const response = await getRequest({
      url: SEARCH_COMPANY_URL,
      params: params,
    });

    // Check if there is a response
    if (response) {
      // console.log(response);
      setData(response || []);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// POST
export const postManualRequest = async ({ setLoading, payload }) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await postRequest({
      url: ADD_MANUAL_REQUEST_URL,
      data: payload,
    });

    if (response) {
      return response;
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// DELETE
export const deleteByID = async ({ setStates = {}, id }) => {
  // Set loading state
  setStates.setLoading(true);

  try {
    const response = await deleteRequest({
      url: DELETE_BY_ID_URL(id),
    });

    // Check response
    if (response) {
      setStates.setRows((prevData) => prevData.filter((row) => row.id !== id));
      setStates.setIsDeleteOpen(false);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setStates.setLoading(false);
  }
};

// RESTORE
export const restoreByID = async ({ setStates = {}, id }) => {
  // Set loading state
  setStates.setLoading(true);

  try {
    const response = await putRequest({
      url: RESTORE_BY_ID_URL(id),
    });

    // Check response
    if (response) {
      setStates.setRows((prevData) => prevData.filter((row) => row.id !== id));
      setStates.setIsRestoreOpen(false);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setStates.setLoading(false);
  }
};

/**
 *
 *
 * GET
 *
 *
 */
export const fetchData = async ({
  requestedBy,
  selectedDate,
  setLoading,
  url,
  paginationModel,
  setRows,
  setTotalCount,
  searchTerm,
}) => {
  // Set Loading
  setLoading(true);

  // console.log(url);

  try {
    const response = await getRequest({
      url: `/api/v1${url}`,
      params: {
        page: paginationModel.page + 1,
        perPage: paginationModel.pageSize,
        search: searchTerm,
        requestedBy: requestedBy,
        date: selectedDate,
      },
    });

    if (response && response.data) {
      // console.log(response.data);
      setRows(response.data);
      setTotalCount(response.meta.total);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

/**
 *
 *
 * GET (Third Party API)
 *
 *
 */
export const validateOrientation = async ({ validatedStudents = [] }) => {
  const isNotPresent = [];

  // Loop through each student
  for (const student of validatedStudents) {
    // Skip if hasOrientation is false
    if (!student.hasOrientation) continue;

    try {
      // Call the third-party API to validate orientation attendance
      const response = await axios.get(GET_VALIDATE_ORIENTATION(student.id));

      const { student_name, attended } = response.data;

      // Check if attended is false
      if (!attended) {
        isNotPresent.push(student);
      }
    } catch (error) {
      console.error(
        `Failed to fetch data for student ID: ${student.id}`,
        error
      );
      isNotPresent.push(student); // Add student to the list if the API call fails
    }
  }

  return isNotPresent;
};
