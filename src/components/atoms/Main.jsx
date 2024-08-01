import React from "react";

export default function Main({ children, className = "flex-1 flex flex-col" }) {
  return <main className={className}>{children}</main>;
}
