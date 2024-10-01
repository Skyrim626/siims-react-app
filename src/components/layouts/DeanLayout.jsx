import React from "react";
import SidebarLayout from "./SidebarLayout";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { Building, LayoutDashboard, User } from "lucide-react";
import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";
import Breadcrumb from "../common/Breadcrumb";
import Page from "../common/Page";

// Configuration for sidebar items for Admin
const sidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/dean",
  },
  {
    icon: <User size={20} />,
    text: "Profile",
    alert: true,
    ariaLabel: "Profile",
    exact: true,
    path: "/auth/dean/profile",
  },
  {
    icon: <Building size={20} />,
    text: "Companies",
    alert: true,
    ariaLabel: "Companies",
    exact: false,
    path: "/auth/dean/companies",
    sublinks: [
      {
        text: "Company_ID",
        path: "/auth/dean/companies/:company_id", // Dynamic path
      },
    ],
  },
];

const DeanLayout = () => {
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
        <Page>
          <Outlet />
        </Page>
      </main>
    </SidebarLayout>
  );
};

export default DeanLayout;
