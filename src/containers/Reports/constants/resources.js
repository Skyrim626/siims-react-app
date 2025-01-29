

// POST
export const ADD_DTR_API = "/api/v1/daily-time-records";

// GET
export const GET_DTR_API = "/api/v1/daily-time-records";

// DELETE
export const DELETE_DTR_API = (id) => {
  return `/api/v1/daily-time-records/${id}`;
}

// UPDATE
export const PUT_DTR_API = (id) => {
  return `/api/v1/daily-time-records/${id}`;
};