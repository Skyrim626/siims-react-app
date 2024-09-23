import React from "react";

// Import Lucide React Icons
import {
  Building,
  FileStack,
  LayoutDashboard,
  MessageCircle,
  Settings,
  UserCircle,
  Users2,
} from "lucide-react";

// Import Components
// Import React Router Dom
import { Outlet, useLocation } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";

// Configuration for sidebar items for chairperson
const sidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    active: true,
    path: "/auth/chairperson",
  },
  {
    icon: <Building size={20} />,
    text: "Companies",
    alert: true,
    ariaLabel: "Companies",
    exact: true, // Add an `exact` property for exact path matching
    active: true,
    path: "/auth/chairperson/companies",
  },
];

// Layout for Chairperson
export default function ChairpersonLayout() {
  return (
    <>
      <SidebarLayout sidebarItemsConfig={sidebarItemsConfig}>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </SidebarLayout>
    </>
  );
}
