import React from "react";
import { Outlet, useLocation } from "react-router-dom";

// Import Layout
import SidebarLayout from "./templates/SidebarLayout";

// Import Components
import Sidebar from "../organisms/Sidebar";
import Main from "../atoms/Main";
import SidebarItem from "../atoms/SidebarItem";

// Import Lucide Icons
import { BookCopy, LayoutDashboard, User } from "lucide-react";
import Breadcrumbs from "../atoms/Breadcrumbs";
import useFetch from "../../hooks/useFetch";
import Loader from "../atoms/Loader";

// Configuration for sidebar items for Admin
const sidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/admin",
  },
  {
    icon: <User size={20} />,
    text: "Users",
    alert: true,
    ariaLabel: "Users",
    exact: false, // No exact match needed for partial path
    path: "/admin/users",
  },
  {
    icon: <BookCopy size={20} />,
    text: "Programs",
    alert: true,
    ariaLabel: "Programs",
    exact: false, // No exact match needed for partial path
    path: "/admin/programs",
  },
  { isDivider: true, role: "all" },
];

// Layout for Admin
export default function AdminLayout() {
  // Load data
  const { data, loading, error } = useFetch("/admin/sidebar");

  return loading ? (
    <Loader />
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : (
    <SidebarLayout
      sidebarItemsConfig={sidebarItemsConfig}
      name={data["full_name"]}
      email={data["email"]}
    >
      <Main className="flex-1 overflow-auto">
        <Outlet />
      </Main>
    </SidebarLayout>
  );
}
