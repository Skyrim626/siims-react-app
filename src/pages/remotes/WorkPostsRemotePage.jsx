import React from "react";
import AddWorkPostPage from "../offices/AddWorkPostPage";
import NotFoundPage from "../NotFoundPage";

const WorkPostsRemotePage = ({ authorizeRole, method }) => {
  if (method === "add") {
    return <AddWorkPostPage authorizeRole={authorizeRole} />;
  } else if (method === "edit") {
  }

  return <NotFoundPage />;
};

export default WorkPostsRemotePage;
