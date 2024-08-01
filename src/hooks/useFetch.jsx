import React, { useEffect, useState } from "react";

// Axios Imports
import axiosClient from "../axios";

const useFetch = (api) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(api);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [api]);

  return { data, error, isLoading };
};

export default useFetch;
