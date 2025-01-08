import React from "react";
import NotFoundPage from "./NotFoundPage";
import CompanyHomePageTesting from "./company/CompanyHomePageTesting";

const HomePage = ({ authorizeRole }) => {
  // Home Remote Controller
  if (authorizeRole === "company") {
    return <CompanyHomePageTesting />;
  }

  // Return 404 not found
  return <NotFoundPage />;
};

export default HomePage;
