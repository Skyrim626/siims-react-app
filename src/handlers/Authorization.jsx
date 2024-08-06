import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "../components/atoms/Loader";
import axiosClient from "../axios";

export default function Authorization({ children, allowedRole }) {
  const { user, token } = useAuth();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axiosClient.get("/user/roles", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data);
        setRoles(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserRoles();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Check if token exist
  if (!token) {
    return <Navigate to={"/"} />;
  }

  // Loads if true
  if (loading) {
    return <Loader />;
  }

  // If errors are true
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter role name
  const roleNames = roles.map((role) => role.name);

  return roleNames.includes(allowedRole) ? children : <Navigate to={"/auth"} />;
}
