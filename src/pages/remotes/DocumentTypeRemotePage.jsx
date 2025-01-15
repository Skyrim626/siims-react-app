import React from "react";

import NotFoundPage from "../NotFoundPage";
import ManageDocumentTypePage from "../containers/ManageDocumentTypePage";
import AdminDocumentTypePage from "../document-types/AdminDocumentTypePage";

const DocumentTypeRemotePage = ({ authorizeRole }) => {
  // FOR ADMIN and OSA
  if (authorizeRole === "admin") {
    return (
      <ManageDocumentTypePage authorizeRole={authorizeRole}>
        <AdminDocumentTypePage />
      </ManageDocumentTypePage>
    );
  }

  return <NotFoundPage />;
};

export default DocumentTypeRemotePage;
