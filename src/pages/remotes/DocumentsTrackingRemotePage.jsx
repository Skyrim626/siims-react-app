import React from "react";
import StudentDocumentTrackingPage from "../documents/StudentDocumentTrackingPage";
import NotFoundPage from "../NotFoundPage";

const DocumentsTrackingRemotePage = ({ authorizeRole }) => {
  if (authorizeRole === "student") {
    return <StudentDocumentTrackingPage />;
  }

  return <NotFoundPage />;
};

export default DocumentsTrackingRemotePage;
