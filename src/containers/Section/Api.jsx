import { getRequest } from "../../api/apiHelpers";
import axiosClient from "../../api/axiosClient";
import { showSuccessAlert } from "../../utils/toastify";
import {
  ADD_SECTION_URL,
  ASSIGN_STUDENT_BY_SECTION_URL,
  GET_ALL_SECTIONS,
  GET_ALL_STUDENTS_BY_SECTION,
  GET_ALL_WEEKLY_ENTRIES_BY_STUDENT,
} from "./constants/resources";

/**
 *
 * GET
 *
 */
export const getSection = async ({
  authorizeRole,
  searchTerm,
  setLoading,
  setSelectedSection,
  setSections,
}) => {
  // Set Loading
  setLoading(true);

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
      setSelectedSection(response[0] || { id: null, name: "All" });
      setSections(response);
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
 * GET
 *
 *
 */
export const fetchData = async ({
  requestedBy,
  setLoading,
  paginationModel,
  setRows,
  setTotalCount,
  searchTerm,
  sectionID,
}) => {
  // Set Loading
  setLoading(true);

  /* console.log({
    page: paginationModel.page + 1,
    perPage: paginationModel.pageSize,
    search: searchTerm,
    requestedBy: requestedBy,
    section: sectionID,
  }); */

  try {
    const response = await getRequest({
      url: GET_ALL_STUDENTS_BY_SECTION,
      params: {
        page: paginationModel.page + 1,
        perPage: paginationModel.pageSize,
        search: searchTerm,
        requestedBy: requestedBy,
        sectionID: sectionID,
      },
    });

    console.log(response);

    if (response) {
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
 *
 * GET (WEEKLY)
 *
 *
 *
 */
export const fetchWeeklyByStudent = async ({
  setLoading,
  setRows,
  studentID,
}) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await axiosClient.get(
      GET_ALL_WEEKLY_ENTRIES_BY_STUDENT(studentID)
    );

    // Check response
    if (response && response.status === 200) {
      setRows(response.data);
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
 * POST
 *
 *
 */
export const addSection = async ({
  setLoading,
  setSections,
  authorizeRole,
  payload,
  setIsOpenSection,
}) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await axiosClient.post(ADD_SECTION_URL, payload, {
      params: {
        requestedBy: authorizeRole,
      },
    });

    // Check response
    if (response && response.status === 201) {
      setIsOpenSection(false);
      setSections((prevState) => [...prevState, response.data.data]);
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
 *
 * PUT
 *
 *
 */
export const assignStudentToSection = async ({
  sectionID,
  setLoading,
  payload,
  setRows,
  setIsSectionAssignOpen,
}) => {
  // Set Loading
  setLoading(true);

  try {
    const response = await axiosClient.put(
      ASSIGN_STUDENT_BY_SECTION_URL(sectionID),
      payload
    );

    if (response && response.status === 200) {
      showSuccessAlert(response.data.message);
      setIsSectionAssignOpen(false);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
