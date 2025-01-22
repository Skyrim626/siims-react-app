import { getRequest, postRequest } from "../../api/apiHelpers";
import {
  GET_ALL_COORDINATORS_URL,
  GET_ALL_PROGRAMS_URL,
  IMPORT_ALL_STUDENTS_URL,
} from "./constants/resources";

export const getAllListOfCoordinators = async () => {
  try {
    const response = await getRequest({
      url: GET_ALL_COORDINATORS_URL,
    });

    if (response) {
      // console.log(response);
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllListOfPrograms = async () => {
  try {
    const response = await getRequest({
      url: GET_ALL_PROGRAMS_URL,
    });

    if (response) {
      // console.log(response);

      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const importAllStudents = async ({ formData }) => {
  try {
    const response = await postRequest({
      url: IMPORT_ALL_STUDENTS_URL,
      data: formData,
      params: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });

    // Check response
    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.error(error);
  }
};
