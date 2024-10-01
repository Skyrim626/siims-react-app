// Libraries
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";
import RoleSelectionPage from "./RoleSelectionPage";

/**
 * Auth Handler Component
 *
 * Purpose: Checks if the user has token or not. If the user has not token it will redirect back to login.
 */
const Auth = () => {
  // Open useAuth
  const { user, token, roles } = useAuth();

  // Open Navigation
  const navigate = useNavigate();

  // Check if and token exist
  if (!token) {
    // Return to login if token does not exist
    return <Navigate to={"/login"} replace={true} />;
  }

  if (roles.length > 1) {
    return <RoleSelectionPage roles={roles} />; // Show selection for multiple roles
  }

  const role = roles[0]; // Single role

  // Check Roles
  switch (role) {
    case "admin":
      return <Navigate to={"admin"} />;
    case "student":
      return <Navigate to={"my"} />;
    case "dean":
      return <Navigate to={"dean"} />;
    case "chairperson":
      return <Navigate to={"chairperson"} />;
    case "company":
      return <Navigate to={"company"} />;
    default:
      return <Navigate to={"unauthorized"} />;
  }
};

export default Auth;
