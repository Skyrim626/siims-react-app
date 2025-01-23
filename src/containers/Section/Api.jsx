import { getRequest } from "../../api/apiHelpers";

export const get = async ({ authorizeRole }) => {
  try {
    const response = getRequest({
      url: GET_ALL_SECTIONS,
    });

    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
