import React from "react";
import { userStateContext } from "../contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleDetermination() {
  const { user, token } = userStateContext();

  // Check if the token exist
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  const roles = ["student", "coordinator"];

  return roles.length === 1 && roles[0] === "student" ? (
    <Outlet />
  ) : (
    <Navigate to={"select-role"} replace />
  );
}
