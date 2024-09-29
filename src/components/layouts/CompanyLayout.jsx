import React from "react";
import SidebarLayout from "./SidebarLayout";
import { Outlet } from "react-router-dom";
import { Building, LayoutDashboard, User, Users } from "lucide-react";

// Configuration for sidebar items for Admin
const sidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/company",
  },

  {
    icon: <User size={20} />,
    text: "Profile",
    alert: true,
    ariaLabel: "Profile",
    exact: true,
    path: "/auth/company/profile",
  },
  {
    icon: <Building size={20} />,
    text: "Offices",
    alert: true,
    ariaLabel: "Offices",
    exact: false,
    path: "/auth/company/offices",
  },
  {
    icon: <Users size={20} />,
    text: "Supervisors",
    alert: true,
    ariaLabel: "Supervisors",
    exact: true,
    path: "/auth/company/supervisors",
  },
];

const CompanyLayout = () => {
  return (
    <SidebarLayout sidebarItemsConfig={sidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </SidebarLayout>
  );
};

export default CompanyLayout;
