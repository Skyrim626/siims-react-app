import React from "react";

// Import Contexts
import { userStateContext } from "../contexts/ContextProvider";

// Import React Router Dom
import { Navigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";
import Loader from "../components/atoms/Loader";

/**
 * LoginSuccess Component
 *
 * Handles user redirection based on authentication status and roles.
 *
 * - If the user does not have a valid authentication token, they will be redirected to the login page.
 * - If the user has exactly one role, they will be redirected to the corresponding role-specific page.
 * - If the user has multiple roles, they will be redirected to a role selection page to choose their role.
 *
 * This component ensures that users are directed to the appropriate page based on their authentication status and role.
 *
 * @returns {JSX.Element} - The component renders a <Navigate> element for redirection based on user state.
 */
export default function LoginSuccess() {
  const { user, token } = userStateContext();
  const { loading } = useAuth();

  // Check if the token exists to determine authentication status
  if (!token) {
    return <Navigate to="/login" />;
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

  console.log(userRoles); // Debugging to check role names

  return userRoles.length === 1 ? (
    <Navigate to={`/${userRoles[0]}`} replace />
  ) : (
    <Navigate to={"select-role"} replace />
  );

  /**
   * ! Role Testing
   *
   * ! This section is used to determine the user's role and decide the redirection path.
   *
   * * ROLES: An array of all possible roles.
   * * roles: An array of the user's roles (currently hardcoded for testing purposes).
   */
  /* const ROLES = [
    "admin",
    "company",
    "supervisor",
    "department chairperson",
    "dean",
    "student",
  ]; */
  /* const ROLES = useFetch("/roles");
  const roles = ["student"]; // TODO: This should be dynamically populated based on actual user data

  // console.log(roles[0]);

  // Redirect based on the number of roles
  return roles.length === 1 ? (
    <Navigate to={`/${roles[0]}`} replace />
  ) : (
    <Navigate to={"select-role"} replace />
  ); */
}
