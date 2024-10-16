import React from "react";

export default function Page({ className = "px-4", children }) {
  return <div className={`${className}`}>{children}</div>;
}
