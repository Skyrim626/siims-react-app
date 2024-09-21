import Axios from "axios";
import { showSuccessAlert } from "../utils/toastify";

// Axios Client Service
const axiosClient = Axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  timeout: 60000,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: 'application/json'
  }
});


// Request Interceptors
axiosClient.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('ACCESS_TOKEN'))}`,
    };
    
    console.log(config);
    return config;
  }
);

// Response Interceptors
axiosClient.interceptors.response.use(
  (response) => {

    // Successful Responses
    // Status 200
    
    // Status 201
    if(response && response.status === 201) {
      showSuccessAlert(response.data.message);
    }

    // Return response
    return response;
  },
  (error) => {
    const { response } = error; 

    /**
     * Conditional HTTP Statuses
     */

    // Status 401
    if (response && response.status === 401) {

      // ! DO NOT REMOVE
      // Pass the error message to the response
      const errorMessage = response.data.message || 'Unauthorized access. Please log in again.';
      localStorage.setItem('loginError', errorMessage);
      // Clear any tokens or user data
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Redirect to login page
      window.location.href = '/login'; 
    }

    return Promise.reject(error);
  }
);

// Export axiosClient service
export default axiosClient;
