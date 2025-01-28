/**
 * 
 * 
 * GET (THIRD-PARTY)
 * 
 * 
 * 
 */
export const GET_VALIDATE_ORIENTATION = (id) => {
  return `https://mlicayan.pythonanywhere.com/api/v1/events/on-job-training-orientation-2024-2025/${id}/`
}

/**
 *
 *
 * GET (SEARCH)
 *
 */
export const SEARCH_STUDENT_URL = "/api/v1/users/students/search";
export const SEARCH_COMPANY_URL = "/api/v1/users/v2/companies/search";
export const SEARCH_COORDINATOR_URL = "/api/v1/users/v2/coordinators/search";

/**
 *
 *
 * GET (DATA GRID)
 *
 *
 */
export const GET_ALL_URL = "/endorsement-letter-requests?status=all";
export const GET_ALL_WALK_IN_URL =
  "/endorsement-letter-requests?status=walk-in";
export const GET_ALL_ARCHIVE_URL =
  "/endorsement-letter-requests?status=archived";

/**
 *
 *
 * POST
 *
 */
export const ADD_MANUAL_REQUEST_URL =
  "/api/v1/endorsement-letter-requests/manual";

/**
 *
 *
 * DELETE
 *
 *
 */
export const DELETE_BY_ID_URL = (id) => {
  return `/api/v1/endorsement-letter-requests/${id}`;
};


/**
 * 
 * 
 * PUT
 * 
 */
export const RESTORE_BY_ID_URL = (id) => {
  return `/api/v1/endorsement-letter-requests/${id}/restore`;
}