import React, { useEffect, useState } from "react";
import NotFoundPage from "../NotFoundPage";
import CompanyHomePageTesting from "../company/CompanyHomePageTesting";
import Loader from "../../components/common/Loader";
import { getRequest } from "../../api/apiHelpers";
import CoordinatorDashboardPage from "../dashboards/CoordinatorDashboardPage";

const HomeRemotePage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State
  const [details, setDetails] = useState({});

  // Fetch Request
  const fetchDetails = async () => {
    // Set Loading State
    setLoading(true);

    try {
      const response = await getRequest({
        url: "/api/v1/dashboards/v2",
        params: {
          requestedBy: authorizeRole,
        },
      });

      if (response) {
        // console.log(response);
        setDetails(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch Details
    fetchDetails();
  }, []);

  // Set Loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  /**
   * Remote for User Dashboards/Homepage
   */
  if (authorizeRole === "company") {
    return <CompanyHomePageTesting details={details} />;
  } else if (authorizeRole === "coordinator") {
    return <CoordinatorDashboardPage />;
  }

  // Return 404 not found
  return <NotFoundPage />;
};

export default HomeRemotePage;
