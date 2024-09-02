// Libraries
import React, { createContext, useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";

// Custom Hooks
import useLocalStorage from "./useLocalStorage";

// Services
import axiosClient from "../api/axiosClient";

// Create Auth Context
const AuthContext = createContext({
  user: null,
  token: null,
  roles: null,
  setUser: () => {},
  setToken: () => {},
  setRoles: () => {},
  login: () => {},
  logout: () => {},
});

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  // User State
  const [user, setUser] = useLocalStorage("user", null);
  const [roles, setRoles] = useLocalStorage("roles", null);
  const [token, setToken] = useLocalStorage("ACCESS_TOKEN", null);

  // Function to authenticate the user
  const login = async (payload = {}) => {
    // Get Cookies
    await axiosClient
      .get("/sanctum/csrf-cookie", {
        withCredentials: true,
      })
      .then(async (response) => {
        // Attempt Login (After getting cookies)
        await axiosClient
          .post("/api/v1/auth/login", payload)
          .then((response) => {
            // Remove loginError in the localStorage
            localStorage.removeItem("loginError");

            // Set User State
            setUser(response.data.user); // User
            setToken(response.data.token); // Token
            setRoles(response.data.roles); // Roles

            // Add to localStorage
            localStorage.setItem("USER", response.data.user);
            localStorage.setItem("ROLES", response.data.roles);

            // Navigate the authenticated user to the /auth
            return <Navigate to={"/auth"} />;
          })
          .catch((err) => {
            // console.log(err.response.data.error);
            // console.log(err);
            throw err;
          });
      });
  };

  // Function to log out the authenticated user
  const logout = async () => {
    await axiosClient
      .post("/api/v1/auth/logout")
      .then((response) => {
        console.log("Successful Log Out");
        return <Navigate to={"/"} replace={true} />; // Navigate back to login page
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  // Use Memo
  const value = useMemo(
    () => ({
      user,
      token,
      roles,
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Exporting useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};
