// Libraries
import React from "react";
import { Navigate, Outlet, useLoaderData, useNavigate } from "react-router-dom";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";
import RoleSelectionPage from "./RoleSelectionPage";

/**
 * Auth Handler Component
 *
 * Purpose: Checks if the user has token or not. If the user has not token it will redirect back to login.
 */
const Auth = () => {
  // Fetch Data
  const userRoles = useLoaderData();

  // Open useAuth
  const { user, token } = useAuth();

  // Check if and token exist
  if (!token) {
    // Return to login if token does not exist
    return <Navigate to={"/login"} replace={true} />;
  }

  if (userRoles.length > 1) {
    return <RoleSelectionPage roles={userRoles} />; // Show selection for multiple roles
  }

  const role = userRoles[0]; // Single role

  // console.log(userRoles);

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
    case "osa":
      return <Navigate to={"osa"} />;
    case "supervisor":
      return <Navigate to={"supervisor"} />;
    default:
      return <Navigate to={"unauthorized"} />;
  }
};

export default Auth;
