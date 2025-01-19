import React from "react";

const RoleBasedView = ({ roles, children, authorizeRole }) => {
  return roles.includes(authorizeRole) ? children : null;
};

export default RoleBasedView;
