import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider";
import useAuth from "../hooks/useAuth";
import Loader from "../components/atoms/Loader";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, token } = userStateContext();
  const { loading } = useAuth();

  // Check if the token exist
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  // Display a loader while fetching user data and role data
  if (loading || !user) {
    return <Loader />;
  }

  // Ensure user.roles is an array and extract role names
  const userRoles =
    user.roles && Array.isArray(user.roles)
      ? user.roles.map((role) => role.name)
      : [];

  // Check if the user's roles include any of the allowed roles
  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));
  // console.log(hasAccess);

  // Redirect to role page if the user doesn't have access to the allowed role page
  return hasAccess ? children : <Navigate to={`/${userRoles[0]}`} />;
}
