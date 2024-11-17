import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom"; // Import useParams for dynamic IDs
import SidebarLayout from "./SidebarLayout";
import Breadcrumb from "../common/Breadcrumb";
import Page from "../common/Page";
import { Building, LayoutDashboard, User } from "lucide-react";
import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";

// Configuration for sidebar items for chairperson
const sidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true,
    active: true,
    path: "/auth/chairperson",
  },
  {
    icon: <User size={20} />,
    text: "Students",
    alert: true,
    ariaLabel: "Students",
    exact: false,
    active: true,
    path: "/auth/chairperson/students",
  },
  {
    icon: <Building size={20} />,
    text: "Companies",
    alert: true,
    ariaLabel: "Companies",
    exact: false,
    active: true,
    path: "/auth/chairperson/companies",
    sublinks: [
      {
        text: "Company_ID",
        path: "/auth/chairperson/companies/:company_id", // Dynamic path
      },
    ],
  },
];

// Layout for Chairperson
export default function ChairpersonLayout() {
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
}
