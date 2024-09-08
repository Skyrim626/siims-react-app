// Libraries
import React from "react";
import { Outlet } from "react-router-dom";

// Import Layout
import SidebarLayout from "./SidebarLayout";

// Import Lucide Icons
import {
  BookCopy,
  Building,
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
    icon: <Building size={20} />,
    text: "Colleges",
    alert: true,
    ariaLabel: "Colleges",
    exact: false,
    path: "/admin/colleges",
  },
  {
    icon: <MessageCircle size={20} />,
    text: "Messages",
    alert: true,
    ariaLabel: "Messages",
    exact: false,
    path: "/admin/messages",
  },
  {
    icon: <BookCopy size={20} />,
    text: "Internship Postings",
    alert: true,
    ariaLabel: "Internship Postings",
    exact: false,
    path: "/admin/internship-postings",
  },
  { isDivider: true, role: "all" },
  {
    icon: <Logs size={20} />,
    text: "Logs",
    alert: true,
    ariaLabel: "Logs",
    exact: false,
    path: "/admin/logs",
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
