import React from "react";

export default function Grid({ children, className }) {
  return <div className={`grid ${className}`}>{children}</div>;
}
