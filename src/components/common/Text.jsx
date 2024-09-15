import React from "react";

// Custom Text Field
const Text = ({ children, className = "text-sm" }) => {
  return <span className={className}>{children}</span>;
};

export default Text;
