import React from "react";

// Sidebar Layouts
export default function SidebarLayout({
  children,
  className = "flex bg-gray-100 h-screen",
}) {
  return (
    <>
      <div className={className}>{children}</div>
    </>
  );
}
