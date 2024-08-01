import { useEffect, useState } from "react";
import { appStateContext } from "../contexts/AppContextProvider";
import axiosClient from "../axios";
import { Navigate, useNavigate } from "react-router-dom";

const useAuth = () => {
  const { user, token, setUser, setToken } = appStateContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // side effect during usage of useAuth
  /* useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        setLoading(true); // set loading
        try {
          const response = await axiosClient.get("/user", {
            headers: { Authorization: `Bearer: ${token}` },
          });
          setUser(response);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false); // set loading to false
        }
      } else {
        setLoading(false); // Ensure loading is set to false
        return navigate("/login");
      }
    };

    // set user
    fetchUser();
  }, [setUser, token, navigate]); */

  // Login Function
  const login = async (id, password) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosClient.post("/login", {
        id,
        password,
      });
      setUser(data.user);
      setToken(data.token);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await axiosClient.post("/logout");
    } catch (err) {
      setError(err);
    }
  };

  // Return values
  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
  };
};

// Export useAuth
export default useAuth;

/* import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { userStateContext } from "../contexts/ContextProvider";

const useAuth = () => {
  const { user, setUser, token, setToken } = userStateContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await axiosClient.get("/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log("Response: ", data);
          setUser(data);
        } catch (err) {
          console.error("Error fetcing user data: ", err);
          setError(err);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, setUser]);

  // Function Login
  const login = async (id, password) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosClient.post("/login", { id, password });
      setUser(data.user);
      setToken(data.token);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Function Log Out
  const logout = async () => {
    try {
      await axiosClient.post("/logout");
    } catch (err) {
      setError(err);
    }
  };

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
  };
};

export default useAuth;
 */
