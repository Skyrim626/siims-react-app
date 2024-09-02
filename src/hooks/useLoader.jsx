import axiosClient from "../api/axiosClient";

// Custom Loader
export function useLoader(api) {
  return async function loader() {
    try {
      const response = await axiosClient.get(api);
      return response.data;
    } catch (error) {
      throw new Response("Failed to fetch", {
        status: error.response?.status || 500,
      });
    }
  };
}
