import React from "react";
import Page from "../../../../components/common/Page";
import { Outlet } from "react-router-dom";

const AdminManageStudent = () => {
  console.log("AdminManageStudent rendered");

  return (
    <Page>
      {/* <Outlet /> */}
      Manage Students
    </Page>
  );
};

export default AdminManageStudent;
