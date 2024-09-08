// apiHelpers.js
import axiosClient from "./axiosClient";

// For Get Request
export const getRequest = async ({ url, params = {} }) => {
  try {
    const res = await axiosClient.get(url, { params });
    return res.data;
  } catch (err) {
    return err;
  }
};

// For Post Request
export const postRequest = async ({ url, data = {}, params = {} }) => {
  try {
    // Fetch the CSRF cookie
    await axiosClient.get("/sanctum/csrf-cookie", {
      withCredentials: true,
    });

    // Send request
    const res = await  axiosClient.post(url, data, {params});
    // Return response
    return res;
    
  } catch (error) {
    console.error(error);
    return error.response ? error.response.data : error.message; // Return error response or message
  }
};

// For Post FormDat request
export const postFormDataRequest = async ({ url, data = {}, params = {} }) => {
  try {
    const res = await axios.post(url, data, {
      params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const patchRequest = async ({ url, data = {}, params = {} }) => {
  try {
    const res = await axios.patch(url, data, { params });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const patchFormDataRequest = async ({ url, data = {}, params = {} }) => {
  try {
    const res = await axios.patch(url, data, {
      params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const putRequest = async ({ url, data = {}, params = {} }) => {
  try {
    const res = await axios.put(url, data, { params });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteRequest = async ({ url, params = {} }) => {
  try {
    const res = await axios.delete(url, { params });
    return res.data;
  } catch (err) {
    return err;
  }
};
