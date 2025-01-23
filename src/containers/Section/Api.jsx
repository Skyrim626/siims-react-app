import { getRequest } from "../../api/apiHelpers";
import { GET_ALL_SECTIONS } from "./constants/resources";

export const getSection = async ({ authorizeRole, searchTerm }) => {
  try {
    const response = getRequest({
      url: GET_ALL_SECTIONS,
      requestedBy: authorizeRole,
      searchTerm: searchTerm,
    });

    // console.log(sectionID);

    if (response) {
      // console.log(response);

      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
