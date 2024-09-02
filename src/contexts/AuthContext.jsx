import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

// Create auth context
const AuthContext = createContext({
  user: {},
  token: "",
  login: () => {},
  logout: () => {},
});

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("ACCESS_TOKEN") || ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate checking for existing user
  useEffect(() => {
    // Simulate async action
    setTimeout(async () => {
      // Assume user is already logged in
      if (token) {
        const savedUser = await axiosClient.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(savedUser);
      }
    }, 1000);
  }, []);

  // Mock authentication function
  // Log in function
  const login = async (id, password) => {
    // Simulate authenticatoin logic
    try {
      const { data } = await axiosClient.post("/login", { id, password });
      localStorage.setItem("ACCESS_TOKEN", data.token);
      setToken(localStorage.getItem("ACCESS_TOKEN"));
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Log out function
  const logout = async () => {
    // Simulate Logging Out logic
    try {
      await axiosClient.post("/logout");
      localStorage.removeItem("ACCESS_TOKEN");
      console.log("Log out");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
