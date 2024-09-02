// Libraries
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";

/**
 * Auth Handler Component
 *
 * Purpose: Checks if the user has token or not. If the user has not token it will redirect back to login.
 */
const Auth = () => {
  // Open useAuth
  const { user, token, roles } = useAuth();

  // Check if and token exist
  if (!token) {
    // Return to login if token does not exist
    return <Navigate to={"/login"} replace={true} />;
  }

  // Check Roles
  if (roles.includes("admin")) {
    console.log("admin");
    return <Navigate to={"/admin"} />;
  }

  // Render children if authenticated
  // TODO: FINISH THIS
  return "Empty Page";
};

export default Auth;
