

// POST
export const ADD_DTR_API = "/api/v1/daily-time-records";
export const ADD_WAR_API = "/api/v1/weekly-entries";

// GET
export const GET_DTR_API = "/api/v1/daily-time-records";
export const GET_WAR_API = '/api/v1/weekly-entries';

// DELETE
export const DELETE_DTR_API = (id) => {
  return `/api/v1/daily-time-records/${id}`;
}
export const DELETE_WAR_API = (id) => {
  return `/api/v1/weekly-entries/${id}`;
}

// UPDATE
export const PUT_DTR_API = (id) => {
  return `/api/v1/daily-time-records/${id}`;
};

export const PUT_WAR_API = (id) => {
  return `/api/v1/weekly-entries/${id}`;
};