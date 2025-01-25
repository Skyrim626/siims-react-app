import { getRequest } from "../../api/apiHelpers";
import { GET_ALL_SECTIONS } from "./constants/resources";

export const getSection = async ({ authorizeRole, searchTerm }) => {
  // console.log(authorizeRole);

  try {
    const response = await getRequest({
      url: GET_ALL_SECTIONS,
      params: {
        requestedBy: authorizeRole,
        searchTerm: searchTerm,
      },
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
