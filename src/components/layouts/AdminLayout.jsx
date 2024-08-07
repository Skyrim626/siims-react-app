import React from "react";
import { Outlet, useLocation } from "react-router-dom";

// Import Layout
import SidebarLayout from "./templates/SidebarLayout";

// Import Components
import Main from "../atoms/Main";

// Import Lucide Icons
import { BookCopy, LayoutDashboard, User } from "lucide-react";
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

// For fetching data for sidebar name and email (bottom)
const fetchApi = "/admin/sidebar";

// Layout for Admin
export default function AdminLayout() {
  return (
    <SidebarLayout sidebarItemsConfig={sidebarItemsConfig} api={fetchApi}>
      <Main className="flex-1 overflow-auto">
        <Outlet />
      </Main>
    </SidebarLayout>
  );
}
