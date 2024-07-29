import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider";

export default function ProtectedRoute({ children }) {
  const { user, token } = userStateContext();

  // Check if the token exist
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
