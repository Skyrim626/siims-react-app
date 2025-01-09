import React from "react";
import NotFoundPage from "../NotFoundPage";
import ViewEndorsementsPage from "../endorsements/ViewEndorsementsPage";

const EndorsementsRemotePage = ({ authorizeRole }) => {
  // FOR STUDENT
  if (authorizeRole === "student") {
    return <ViewEndorsementsPage authorizeRole={authorizeRole} />;
  }

  // Not Found Page
  return <NotFoundPage />;
};

export default EndorsementsRemotePage;
