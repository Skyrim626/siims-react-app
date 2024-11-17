import { Briefcase, LayoutDashboard } from "lucide-react";
import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";
import SidebarLayout from "./SidebarLayout";
import Breadcrumb from "../common/Breadcrumb";
import { supervisorSidebarItemsConfig } from "../sidebars/sidebarConfig";

const SupervisorLayout = () => {
  const location = useLocation();
  const params = useParams(); // Extract dynamic route parameters, like company_id
  const breadcrumbPaths = findBreadcrumbPath(
    location.pathname,
    supervisorSidebarItemsConfig,
    params
  ); // Use the helper
  return (
    <SidebarLayout sidebarItemsConfig={supervisorSidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </main>
    </SidebarLayout>
  );
};

export default SupervisorLayout;
