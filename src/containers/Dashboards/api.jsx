import React from "react";
import { getRequest } from "../../api/apiHelpers";

// GET
export const get = async ({ setLoading, params }) => {
  // Set Loading State
  setLoading(true);

  try {
    const response = await getRequest({
      url: "/api/v1/dashboards",
      params: params,
    });

    // Return
    return response;
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
