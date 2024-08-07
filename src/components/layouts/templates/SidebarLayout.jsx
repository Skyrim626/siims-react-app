import React from "react";
import SidebarItem from "../../atoms/SidebarItem";
import { useLocation } from "react-router-dom";
import Sidebar from "../../organisms/Sidebar";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../atoms/Loader";

// Sidebar Layouts
export default function SidebarLayout({
  children,
  className = "flex bg-gray-100 h-screen",
  sidebarItemsConfig = [],
  api,
}) {
  // Load data
  // Fetch data => name & email
  const { data, loading, error } = useFetch(api);
  const location = useLocation(); // Open use location

  return loading ? (
    <Loader />
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : (
    <div className={className}>
      <Sidebar name={data["full_name"]} email={data["email"]}>
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
