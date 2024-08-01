import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Request Interceptors
axiosClient.interceptors.request.use((config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      "Access-Control-Allow-Origin": "*",
    };
    return config;
  }
);

// Response Interceptors
axiosClient.interceptors.response.use(
  (response) => {
    /* console.log(response); */
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status == 401) {
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.reload();
    }
    throw error;
  }
);

export default axiosClient;
