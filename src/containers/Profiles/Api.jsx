import { getRequest } from "../../api/apiHelpers";
import { GET_PROFILE_URL } from "./constants/resources";

/**
 *
 *
 * GET
 *
 *
 */
export const getProfile = async ({ authorizeRole, status }) => {
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
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
