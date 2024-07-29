import React from "react";

// Axios Imports
import axiosClient from "../axios";

const useFetch = async (api, options) => {
  const data = await axiosClient
    .post(api, options)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return data;
};

export default useFetch;
