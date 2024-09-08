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
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('ACCESS_TOKEN'))}`,
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

    // Status 401
    if (response && response.status === 401) {

      // ! DO NOT REMOVE
      // Pass the error message to the response
      const errorMessage = response.data.errors.credentials || 'Unauthorized access. Please log in again.';
      
      // Optionally store the error message in localStorage or global state
      localStorage.setItem('loginError', errorMessage);

      // Remove Token
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // window.location.href = '/login';
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

// Export axiosClient service
export default axiosClient;
