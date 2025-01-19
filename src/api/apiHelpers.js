// apiHelpers.js
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axiosClient from "./axiosClient";
import axios from "axios"; // Add this line at the top of the file

// For Login Request
export const loginRequest = async ({url, params = {}}) => {

  const {setUser, setToken, setRoles} = useAuth();
  const navigate = useNavigate();

  await axiosClient.get("/sanctum/csrf-cookie", {
    withCredentials: true,
  }).then(async (response) => {
    // Remove loginError inthe localStorage
    localStorage.removeItem("loginError");

    // Set User State
    setUser(response.data.user); // User
    setToken(response.data.token); // Token
    setRoles(response.data.roles); // Roles

    // Add to local storage
    localStorage.setItem("user", JSON.parse(response.data.user));
    localStorage.setItem("roles", JSON.parse(response.data.roles));

    // Navigate the authenticated user to the /auth
    return navigate('/auth');

  }).catch((error) => {
    // Check if status is 422
    console.log(error);

    if(error.status === 422) {
      console.log(error);
      return error.response.data.errors;
    }
  })

}

// For Get Request
export const getRequest = async ({ url, data, params = {} }) => {
  try {
    const res = await axiosClient.get(url, {params: {...params, ...data}});
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
    const res = await axiosClient.post(url, data, { params });

    // Return response
    return res.data

  } catch (error) {
    throw error; // Throw the error to be caught in the hook
  }
};

export const putRequest = async ({ url, data = {}, params = {} }) => {
  try {
    // Fetch the CSRF cookie
    await axiosClient.get("/sanctum/csrf-cookie", {
      withCredentials: true,
    });

    // Send request
    const res = await axiosClient.put(url, data, { params });

    // Return response
    return res.data

  } catch (error) {
    throw error;
    // return error.response ? error.response.data : error.message; // Return error response or message
  }
};

// Delete Request
export const deleteRequest = async ({ url, data = {}, params = {}, method = 'delete' }) => {

  try {
    // If data exist
    if(method === 'post') {
      const res = await axiosClient.post(url, data, { params });
      // Return response
      return res.data;
    }

    else {

      const res = await axiosClient.delete(url, { params });
      // Return response
      return res.data;
    }


  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message; // Return error response or message
  }
};

// For PUT FormData request
export const putFormDataRequest = async ({url, data, timeout=220000})  => {

  try {
    const response = await axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensures the request is sent as form-data
      },
      timeout: timeout, // Set the timeout for this request (default: 60 seconds)
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      // Timeout error
      console.error("Request timed out:", error);
      throw new Error("Request timed out");
    } else if (error.response) {
      // Response errors (e.g., 400 or 500 status codes)
      console.error("Error response:", error.response);
      throw new Error(error.response?.data?.message || "Error uploading file");
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
      throw new Error("No response from server");
    } else {
      // General errors (e.g., setup errors)
      console.error("Error setting up request:", error.message);
      throw new Error("An error occurred while sending the request");
    }
  }

}

// For POST FormData request
export const postFormDataRequest = async ({ url, data, timeout = 220000  }) => {
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensures the request is sent as form-data
      },
      timeout: timeout, // Set the timeout for this request (default: 60 seconds)
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      // Timeout error
      console.error("Request timed out:", error);
      throw new Error("Request timed out");
    } else if (error.response) {
      // Response errors (e.g., 400 or 500 status codes)
      console.error("Error response:", error.response);
      throw new Error(error.response?.data?.message || "Error uploading file");
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
      throw new Error("No response from server");
    } else {
      // General errors (e.g., setup errors)
      console.error("Error setting up request:", error.message);
      throw new Error("An error occurred while sending the request");
    }
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
