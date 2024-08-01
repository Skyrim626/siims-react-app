import React from "react";

// Import Lucide React Icons
import {
  FileStack,
  LayoutDashboard,
  MessageCircle,
  Settings,
  UserCircle,
  Users2,
} from "lucide-react";

// Import Layout
import SidebarLayout from "./templates/SidebarLayout";

// Import Components
import SidebarItem from "../atoms/SidebarItem";
import Main from "../atoms/Main";
import Sidebar from "../organisms/Sidebar";

// Import React Router Dom
import { Outlet, useLocation } from "react-router-dom";

// Configuration for sidebar items for chairperson
const sidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    active: true,
    path: "/chairperson",
  },
  {
    icon: <UserCircle size={20} />,
    text: "Profile",
    alert: true,
    ariaLabel: "Profile",
    active: true,
    path: "/chairperson/profile",
  },
  {
    icon: <Users2 size={20} />,
    text: "Users",
    alert: true,
    ariaLabel: "Users",
    active: true,
    path: "/chairperson/users",
  },
  {
    icon: <MessageCircle size={20} />,
    text: "Messages",
    alert: true,
    ariaLabel: "Messages",
    active: true,
    path: "/chairperson/messages",
  },
  {
    icon: <FileStack size={20} />,
    text: "Endorsement Requests",
    alert: true,
    ariaLabel: "Endorsement Requests",
    active: true,
    path: "/chairperson/endorsement-requests",
  },
  { isDivider: true, role: "all" },
  {
    icon: <Settings size={20} />,
    text: "Settings",
    alert: true,
    ariaLabel: "Settings",
    active: true,
    path: "/chairperson/settings",
  },
];

// Layout for Chairperson
export default function ChairpersonLayout() {
  const location = useLocation(); // Open Use location

  return (
    <>
      <SidebarLayout>
        <Sidebar>
          {sidebarItemsConfig.map((sidebarItem, index) => {
            // Render divider if specified
            if (sidebarItem.isDivider) {
              return <hr key={index} className="my-3" />;
            }

            return (
              <SidebarItem
                key={index}
                icon={sidebarItem.icon}
                text={sidebarItem.text}
                alert={sidebarItem.alert}
                active={location.pathname === sidebarItem.path} // Set active state based on current path
                aria-label={sidebarItem.ariaLabel}
                to={sidebarItem.path}
              />
            );
          })}
        </Sidebar>
        {/* Main Content */}
        <Main className="flex-1 overflow-auto">
          <Outlet />
        </Main>
      </SidebarLayout>
    </>
  );
}
