import React from "react";
import SidebarLayout from "./SidebarLayout";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";
import Breadcrumb from "../common/Breadcrumb";

import { deanSidebarItemsConfig } from "../sidebars/sidebarConfig";

const DeanLayout = () => {
  const location = useLocation();
  const params = useParams(); // Extract dynamic route parameters, like company_id
  const breadcrumbPaths = findBreadcrumbPath(
    location.pathname,
    deanSidebarItemsConfig,
    params
  ); // Use the helper
  return (
    <SidebarLayout sidebarItemsConfig={deanSidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </main>
    </SidebarLayout>
  );
};

export default DeanLayout;
