

/**
 * 
 * 
 * GET
 * 
 * 
 */
export const GET_ALL_SECTIONS = "/api/v1/sections";
// export const GET_ALL_STUDENTS_BY_SECTION = "/api/v1/sections/students";
export const GET_ALL_STUDENTS_BY_SECTION = "/api/v1/users/v3/students";

export const GET_ALL_WEEKLY_ENTRIES_BY_STUDENT = (studentID) => {
  return `/api/v1/weekly-entries/student/${studentID}`;
}

/**
 * 
 * 
 * POST
 * 
 * 
 */
export const ADD_SECTION_URL = "/api/v1/sections";

/**
 * 
 * 
 * 
 * PUT
 * 
 * 
 */
export const ASSIGN_STUDENT_BY_SECTION_URL = (id) => {
  return `/api/v1/sections/${id}/assign`
}