import React from "react";
import SidebarItem from "../../atoms/SidebarItem";
import { useLocation } from "react-router-dom";
import Sidebar from "../../organisms/Sidebar";

// Sidebar Layouts
export default function SidebarLayout({
  children,
  className = "flex bg-gray-100 h-screen",
  sidebarItemsConfig = [],
  name,
  email,
}) {
  const location = useLocation(); // Open use location

  return (
    <>
      <div className={className}>
        <Sidebar name={name} email={email}>
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
    </>
  );
}
