import { Outlet, useLocation, useParams } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";
import { osaSidebarItemsConfig } from "../sidebars/sidebarConfig";
import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";
import Breadcrumb from "../common/Breadcrumb";

export default function OsaLayout() {
  const location = useLocation();
  const params = useParams(); // Extract dynamic route parameters, like company_id
  const breadcrumbPaths = findBreadcrumbPath(
    location.pathname,
    osaSidebarItemsConfig,
    params
  ); // Use the helper
  return (
    <SidebarLayout sidebarItemsConfig={osaSidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </main>
    </SidebarLayout>
  );
}
