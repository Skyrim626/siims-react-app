import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../organisms/Sidebar";
import SidebarItem from "../atoms/SidebarItem";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Logs,
  MessageCircle,
  Package,
  Receipt,
  Settings,
  UserCircle,
} from "lucide-react";

// Configuration for sidebar items
const sidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    roles: ["admin", "chairperson", "coordinator", "supervisor", "dean"],
    active: true,
    basePath: "/dashboard",
  },
  {
    icon: <UserCircle size={20} />,
    text: "Profile",
    alert: true,
    ariaLabel: "Profile",
    roles: ["admin", "chairperson", "coordinator", "supervisor", "dean"],
    active: true,
    basePath: "/profile",
  },
  {
    icon: <MessageCircle size={20} />,
    text: "Messages",
    alert: true,
    ariaLabel: "Messages",
    roles: ["admin", "chairperson", "coordinator", "supervisor", "dean"],
    active: true,
    basePath: "/messages",
  },
  {
    icon: <LayoutDashboard size={20} />,
    text: "Postings",
    alert: true,
    ariaLabel: "Postings",
    roles: ["posting"],
    active: true,
    basePath: "/postings",
  },
  { isDivider: true, role: "all" },
  {
    icon: <Logs size={20} />,
    text: "Logs",
    alert: true,
    ariaLabel: "Logs",
    roles: ["admin"],
    active: true,
    basePath: "/logs",
  },
  {
    icon: <Settings size={20} />,
    text: "Settings",
    alert: true,
    ariaLabel: "Settings",
    roles: ["admin", "chairperson", "coordinator", "supervisor", "dean"],
    active: true,
    basePath: "/settings",
  },
  {
    icon: <LifeBuoy size={20} />,
    text: "Help",
    alert: true,
    ariaLabel: "Help",
    roles: ["admin", "chairperson", "coordinator", "supervisor", "dean"],
    active: true,
    basePath: "/help",
  },
];

/**
 * SidebarLayout Component
 *
 * A layout component that integrates a sidebar with navigation items and a main content area.
 * The sidebar configuration is dynamically filtered and rendered based on the user's role.
 *
 * - `userRole`: The role of the currently logged-in user, used to filter sidebar items and construct navigation paths.
 *
 * The sidebar displays navigation items according to the user's role and highlights the active item based on the current route.
 * The main content area renders nested routes using the <Outlet> component from React Router.
 *
 * @param {string} userRole - The role of the user which determines the sidebar items displayed.
 * @returns {JSX.Element} - A layout with a sidebar and main content area.
 */
export default function SidebarLayout({ userRole }) {
  const location = useLocation(); // Get the current location from React Router
  const basePath = `/${userRole}`; // Construct base path based on user role

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar>
          {sidebarItemsConfig.map((sidebarItem, index) => {
            // Filter out items not relevant to the current user role
            if (sidebarItem.roles && !sidebarItem.roles.includes(userRole)) {
              return null;
            }

            // Render divider if specified
            if (sidebarItem.isDivider) {
              return <hr key={index} className="my-3" />;
            }

            // Construct the full path for the sidebar item
            const fullPath = `${basePath}${sidebarItem.basePath}`;

            return (
              <SidebarItem
                key={index}
                icon={sidebarItem.icon}
                text={sidebarItem.text}
                alert={sidebarItem.alert}
                active={location.pathname === fullPath} // Set active state based on current path
                aria-label={sidebarItem.ariaLabel}
                to={fullPath} // Pass the full path to SidebarItem
              />
            );
          })}
        </Sidebar>
        {/* Main Content */}
        <main className="flex-1 flex flex-col px-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
