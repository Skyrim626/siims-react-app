import React from "react";

export default function Page({ className, children }) {
  return <div className={`px-4 ${className}`}>{children}</div>;
}
