import React from "react";
import SidebarLayout from "./SidebarLayout";
import { Outlet } from "react-router-dom";
import { Building, LayoutDashboard, User } from "lucide-react";

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
    exact: true,
    path: "/auth/dean/companies",
  },
];

const DeanLayout = () => {
  return (
    <SidebarLayout sidebarItemsConfig={sidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </SidebarLayout>
  );
};

export default DeanLayout;
