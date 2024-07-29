import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Request Interceptors
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    console.log(config.data);
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// Response Interceptors
axiosClient.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status == 401) {
      // localStorage.removeItem("ACCESS_TOKEN");
      // console.log("go back to login");

      return response;
    }

    throw error;
  }
);

export default axiosClient;
