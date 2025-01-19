import React from "react";
import CoordinatorViewApplicationPage from "../application/CoordinatorViewApplicationPage";

const ApplicationRemotePage = ({ authorizeRole }) => {
  if (authorizeRole === "coordinator") {
    return <CoordinatorViewApplicationPage />;
  }

  return <div></div>;
};

export default ApplicationRemotePage;
