import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom"; // Import useParams for dynamic IDs
import SidebarLayout from "./SidebarLayout";
import Breadcrumb from "../common/Breadcrumb";
import Page from "../common/Page";
import { Building, LayoutDashboard, User } from "lucide-react";
import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";
import { coordinatorSidebarItemsConfig } from "../sidebars/sidebarConfig";

// Layout for Coordinator
export default function CoordinatorLayout() {
  const location = useLocation();
  const params = useParams(); // Extract dynamic route parameters, like company_id
  const breadcrumbPaths = findBreadcrumbPath(
    location.pathname,
    coordinatorSidebarItemsConfig,
    params
  ); // Use the helper

  return (
    <SidebarLayout sidebarItemsConfig={coordinatorSidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Breadcrumb paths={breadcrumbPaths} />

        <Outlet />
      </main>
    </SidebarLayout>
  );
}
