

/**
 * 
 * 
 * RESOURCES
 * 
 * 
 */

/**
 * 
 * GET
 * 
 */
export const GET_DATA = "/document-types";
export const GET_ARCHIVED_DATA = "/document-types?status=archived";


/**
 * 
 * POST
 * 
 */
export const POST_DATA = '/document-types';

/**
 * 
 * PUT
 * 
 */
export const RESTORE_DATA_BY_ID = (id) => {
  return `/document-types/${id}/restore`;
}

export const PUT_DATA_BY_ID = (id) => {
  return `/document-types/${id}`;
}

/**
 * 
 * 
 * DELETE
 * 
 */
export const DELETE_DATA_BY_ID = (id) => {
    return `/document-types/${id}`;
}