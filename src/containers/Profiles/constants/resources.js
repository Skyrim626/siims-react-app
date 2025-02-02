

/**
 * 
 * 
 * GET
 * 
 * 
 */
export const GET_PROFILE_URL = '/api/v1/profiles';

/**
 * 
 * 
 * 
 * THIRD PARTY GET
 * 
 * 
 * 
 */
export const GET_CERTIFICATE_VALIDATION_URL = (studentNumber) => {
  return `https://mlicayan.pythonanywhere.com/api/v1/events/on-job-training-orientation-2024-2025/${studentNumber}/`
}