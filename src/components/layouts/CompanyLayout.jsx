import React from "react";
import SidebarLayout from "./SidebarLayout";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { Building, LayoutDashboard, User, Users } from "lucide-react";
import Breadcrumb from "../common/Breadcrumb";
import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";
import Page from "../common/Page";
import { companySidebarItemsConfig } from "../sidebars/sidebarConfig";

const CompanyLayout = () => {
  const location = useLocation();
  const params = useParams(); // Extract dynamic route parameters, like company_id
  const breadcrumbPaths = findBreadcrumbPath(
    location.pathname,
    companySidebarItemsConfig,
    params
  ); // Use the helper
  return (
    <SidebarLayout sidebarItemsConfig={companySidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </main>
    </SidebarLayout>
  );
};

export default CompanyLayout;
