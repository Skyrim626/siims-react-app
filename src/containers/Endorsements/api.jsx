import { getRequest, postRequest } from "../../api/apiHelpers";
import {
  ADD_MANUAL_REQUEST_URL,
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
