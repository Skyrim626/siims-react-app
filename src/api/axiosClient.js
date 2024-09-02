import Axios from "axios";

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
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    };
    return config;
  }
);

// Response Interceptors
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    /**
     * Conditional HTTP Statuses
     */
    if (response && response.status == 401) {

      // ! DO NOT REMOVE
      // Pass the error message to the response
      const errorMessage = response.data.error || 'Unauthorized access. Please log in again.';
      
      // Optionally store the error message in localStorage or global state
      localStorage.setItem('loginError', errorMessage);

      // Remove Token
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.href = '/login';
    }
    // throw error;
    return Promise.reject(error);
  }
);

// Export axiosClient service
export default axiosClient;
