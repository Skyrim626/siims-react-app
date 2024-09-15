// Libraries
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";

/**
 * ProtectedRoute Handler Component
 *
 * Purpose:
 * - Checks if the user has token or not. If the user has not token it will redirect back to login.
 * - Checks the user's role if it is possible to authorized this pages.
 */
const ProtectedRoute = ({ roleAllowed = [], children }) => {
  // Get User Token, Role, and Roles List
  const { user, token, roles } = useAuth();

  // Open Navigation
  const navigate = useNavigate();

  // Check if the user exists and has a token
  /* if (!user || !token) {
    return <Navigate to={"/login"} />;
  } */

  // Check if user role is allowed
  if (!roles.includes(roleAllowed)) {
    return <Navigate to={"unauthorized"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
