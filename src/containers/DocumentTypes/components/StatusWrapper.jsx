import React from "react";

const StatusWrapper = ({ status, requiredStatus, children }) => {
  if (status !== requiredStatus) return null;

  return <>{children}</>;
};

export default StatusWrapper;
