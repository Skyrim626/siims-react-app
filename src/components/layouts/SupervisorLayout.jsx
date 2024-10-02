import { Briefcase, LayoutDashboard } from "lucide-react";
import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";
import SidebarLayout from "./SidebarLayout";
import Breadcrumb from "../common/Breadcrumb";

// Configuration for sidebar items for Admin
const sidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/supervisor",
  },
  {
    icon: <Briefcase size={20} />,
    text: "Manage Jobs",
    alert: true,
    ariaLabel: "Manage Jobs",
    exact: false, // Add an `exact` property for exact path matching
    path: "/auth/supervisor/work-posts",
    sublinks: [
      {
        text: "Add Job",
        path: "/auth/supervisor/work-posts/add", // Dynamic path
      },
    ],
  },
];

const SupervisorLayout = () => {
  const location = useLocation();
  const params = useParams(); // Extract dynamic route parameters, like company_id
  const breadcrumbPaths = findBreadcrumbPath(
    location.pathname,
    sidebarItemsConfig,
    params
  ); // Use the helper
  return (
    <SidebarLayout sidebarItemsConfig={sidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </main>
    </SidebarLayout>
  );
};

export default SupervisorLayout;
