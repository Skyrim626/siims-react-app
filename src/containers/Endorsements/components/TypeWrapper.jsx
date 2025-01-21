import React from "react";

const TypeWrapper = ({ type, requiredType, children }) => {
  if (type !== requiredType) return null;

  return <>{children}</>;
};

export default TypeWrapper;
