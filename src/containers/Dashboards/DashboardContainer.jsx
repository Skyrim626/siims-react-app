import React, { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { get } from "./api";
import DashboardPresenter from "./DashboardPresenter";

const DashboardContainer = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State
  const [details, setDetails] = useState({});
  const [barChartData, setBarChartData] = useState([
    {
      name: "",
      value: 0,
    },
  ]);

  // Fetch Request
  const fetchDetails = async () => {
    // Fetch Response
    const response = await get({
      setLoading: setLoading,
      params: {
        requestedBy: authorizeRole,
      },
    });

    // Check response
    if (response) {
      setDetails(response);
      setBarChartData(response.bar_chart);
    }
  };

  // Use Effect
  useEffect(() => {
    fetchDetails();
  }, []);

  // Check Loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  // Return
  return (
    <DashboardPresenter
      authorizeRole={authorizeRole}
      details={details}
      barChartData={barChartData}
    />
  );
};

export default DashboardContainer;
