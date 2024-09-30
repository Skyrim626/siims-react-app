import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom"; // Import useParams for dynamic IDs
import SidebarLayout from "./SidebarLayout";
import Breadcrumb from "../common/Breadcrumb";
import Page from "../common/Page";
import { Building, LayoutDashboard } from "lucide-react";

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
    icon: <Building size={20} />,
    text: "Companies",
    alert: true,
    ariaLabel: "Companies",
    exact: true,
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

// Function to find breadcrumb path and handle dynamic segments
const findBreadcrumbPath = (locationPath, sidebarConfig, params) => {
  const breadcrumbPaths = [];

  sidebarConfig.forEach((item) => {
    const itemPath = item.path.replace(":company_id", params.company_id); // Replace dynamic segment with actual ID
    const regex = new RegExp(`^${itemPath}`);

    if (regex.test(locationPath)) {
      breadcrumbPaths.push({
        ...item,
        path: item.path.replace(":company_id", params.company_id), // Replace for display
      });

      if (item.sublinks) {
        item.sublinks.forEach((sublink) => {
          const sublinkPath = sublink.path.replace(
            ":company_id",
            params.company_id
          );
          const sublinkRegex = new RegExp(`^${sublinkPath}`);
          if (sublinkRegex.test(locationPath)) {
            breadcrumbPaths.push({
              ...sublink,
              text: params.company_id, // Show actual company ID in breadcrumb
              path: sublink.path.replace(":company_id", params.company_id),
            });
          }
        });
      }
    }
  });

  return breadcrumbPaths;
};

// Layout for Chairperson
export default function ChairpersonLayout() {
  const location = useLocation();
  const params = useParams(); // Extract dynamic route parameters, like company_id
  const breadcrumbPaths = findBreadcrumbPath(
    location.pathname,
    sidebarItemsConfig,
    params
  );

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
