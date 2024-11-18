// Libraries
import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

// Import Layout
import SidebarLayout from "./SidebarLayout";

import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";
import Breadcrumb from "../common/Breadcrumb";
import { adminSidebarItemsConfig } from "../sidebars/sidebarConfig";

// Layout for Admin
export default function AdminLayout() {
  const location = useLocation();
  const params = useParams(); // Extract dynamic route parameters, like company_id

  /*  console.log(location.pathname); */

  const breadcrumbPaths = findBreadcrumbPath(
    location.pathname,
    adminSidebarItemsConfig,
    params || {} // Ensure params is an empty object if it's undefined
  ); // Use the helper
  return (
    <SidebarLayout sidebarItemsConfig={adminSidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </main>
    </SidebarLayout>
  );
}
