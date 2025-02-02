// Libraries
import React from "react";
import { useLocation } from "react-router-dom";

// Components (Navigation)
import Sidebar from "../sidebars/Sidebar";
import SidebarItem from "../sidebars/SidebarItem";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";

// Sidebar Layouts
export default function SidebarLayout({
  withLogo = true,
  children,
  className = "flex bg-gray-100 h-screen",
  sidebarItemsConfig = [],
}) {
  // Get user
  const { user, roles } = useAuth();
  // Open use location
  const location = useLocation();

  // Combine into full name
  const name = `${user["first_name"] ?? ""} ${user["middle_name"] ?? ""} ${
    user["last_name"] ?? ""
  }`;
  const email = user["email"];

  return (
    <div className={className}>
      <Sidebar name={name} email={email} withLogo={withLogo}>
        {sidebarItemsConfig.map((sidebarItem, index) => {
          // Render divider if specified
          if (sidebarItem.isDivider) {
            return <hr key={index} className="my-3" />;
          }

          // Check if the current path exactly matches or starts with the sidebar item path
          const isActive = sidebarItem.exact
            ? location.pathname === sidebarItem.path
            : location.pathname.startsWith(sidebarItem.path);

          return (
            <SidebarItem
              key={index}
              icon={sidebarItem.icon}
              text={sidebarItem.text}
              alert={sidebarItem.alert}
              active={isActive} // Set active state based on current path
              aria-label={sidebarItem.ariaLabel}
              to={sidebarItem.path}
            />
          );
        })}
      </Sidebar>
      {/* Render the child Main component */}
      {children}
    </div>
  );
}
