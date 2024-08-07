import React from "react";

export default function Grid({ children, className, column }) {
  return (
    <div className={`grid grid-cols-${column} ${className}`}>{children}</div>
  );
}
