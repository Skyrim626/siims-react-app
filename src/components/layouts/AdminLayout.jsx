// Libraries
import React from "react";
import { Outlet } from "react-router-dom";

// Import Layout
import SidebarLayout from "./SidebarLayout";

// Import Lucide Icons
import {
  BookCopy,
  Building,
  ClipboardList,
  LayoutDashboard,
  Logs,
  MessageCircle,
  User,
} from "lucide-react";

// Configuration for sidebar items for Admin
const sidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/admin",
  },
  {
    icon: <User size={20} />,
    text: "Users",
    alert: true,
    ariaLabel: "Users",
    exact: false, // No exact match needed for partial path
    path: "/auth/admin/users",
  },
  {
    icon: <ClipboardList />,
    text: "Roles",
    alert: true,
    ariaLabel: "Roles",
    exact: true,
    path: "/auth/admin/roles",
  },

  {
    icon: <Building size={20} />,
    text: "Colleges",
    alert: true,
    ariaLabel: "Colleges",
    exact: false,
    path: "/auth/admin/colleges",
  },
  {
    icon: <Building size={20} />,
    text: "Offices",
    alert: true,
    ariaLabel: "Offices",
    exact: false,
    path: "/auth/admin/offices",
  },
  {
    icon: <MessageCircle size={20} />,
    text: "Messages",
    alert: true,
    ariaLabel: "Messages",
    exact: false,
    path: "/auth/admin/messages",
  },
  {
    icon: <BookCopy size={20} />,
    text: "Internship Postings",
    alert: true,
    ariaLabel: "Internship Postings",
    exact: false,
    path: "/auth/admin/internship-postings",
  },
  { isDivider: true, role: "all" },
  {
    icon: <Logs size={20} />,
    text: "Logs",
    alert: true,
    ariaLabel: "Logs",
    exact: false,
    path: "/auth/admin/logs",
  },
];

// Layout for Admin
export default function AdminLayout() {
  return (
    <SidebarLayout sidebarItemsConfig={sidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </SidebarLayout>
  );
}
