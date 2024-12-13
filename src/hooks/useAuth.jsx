// Libraries
import React, { createContext, useContext, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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
  const login = async (payload = {}, setLoading, navigate) => {
    setLoading(true);

    try {
      // Fetch CSRF token
      await axiosClient.get("/sanctum/csrf-cookie", { withCredentials: true });

      // Attempt login
      const response = await axiosClient.post("/api/v1/auth/login", payload);

      // Remove any previous login errors
      localStorage.removeItem("loginError");

      // Set user, token, and roles
      setUser(response.data.user);
      setToken(response.data.token);
      setRoles(response.data.roles);

      // Store data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("roles", JSON.stringify(response.data.roles));

      // Set Loading
      setLoading(false);

      // Redirect user after successful login
      navigate("/auth");
    } catch (error) {
      // Handle validation errors (422)
      if (error.response && error.response.status === 422) {
        return error.response.data.errors; // Return validation errors
      } else if (error.response && error.response.status === 401) {
        setLoading(false);
        localStorage.setItem(
          "loginError",
          error.response.data.message || "An unexpected error occurred."
        );
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to log out the authenticated user
  const logout = async () => {
    await axiosClient
      .post("/api/v1/auth/logout")
      .then((response) => {
        // console.log("Successful Log Out");

        // Remove Local Storages
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("user");
        localStorage.removeItem("roles");

        window.location.href = "/login";
      })
      .catch((error) => {
        throw error;
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
