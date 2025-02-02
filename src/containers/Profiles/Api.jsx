import axios from "axios";
import { getRequest } from "../../api/apiHelpers";
import {
  GET_CERTIFICATE_VALIDATION_URL,
  GET_PROFILE_URL,
} from "./constants/resources";

/**
 *
 *
 * GET
 *
 *
 */
export const getProfile = async ({ setLoading, authorizeRole, status }) => {
  setLoading(true);

  try {
    const response = await getRequest({
      url: GET_PROFILE_URL,
      params: {
        requestedBy: authorizeRole,
        status: status,
      },
    });

    // Check response
    if (response) {
      // console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

/**
 *
 *
 * THIRD PARTY API GET
 *
 *
 *
 */
export const fetchOrientationValidation = async ({
  setLoading,
  studentNumber,
  setCertificateOfOrientation,
}) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await axios.get(
      GET_CERTIFICATE_VALIDATION_URL(studentNumber)
    );

    // Check response
    if (response && response.status === 200) {
      // console.log(response.data);

      setCertificateOfOrientation(response.data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
