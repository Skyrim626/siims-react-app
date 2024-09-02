import React, { useEffect, useState } from "react";

// Axios Imports
import axiosClient from "../api/axiosClient";
import { useAuth } from "../contexts/AuthContext";

const useFetch = (api) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(api);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  return { data, error, loading };
};

export default useFetch;
