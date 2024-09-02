import React, { useState } from "react";
import Page from "../../components/common/Page";
import { Outlet } from "react-router-dom";

// Users Page for Admin
export default function AdminUsers() {
  return (
    <>
      <Page>
        <Outlet />
      </Page>
    </>
  );
}
