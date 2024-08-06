import React, { useEffect, useState } from "react";
import { appStateContext } from "../contexts/AppContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../axios";
import Loader from "../components/atoms/Loader";
import { useAuth } from "../contexts/AuthContext";

export default function Authentication() {
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

  const roleNames = roles.map((role) => role.name);
  console.log(roleNames);

  if (roleNames.includes("student")) {
    return <Navigate to={"/student"} />;
  }

  if (roleNames.includes("admin")) {
    return <Navigate to={"/admin"} />;
  }

  if (roleNames.includes("chairperson")) {
    return <Navigate to={"/chairperson"} />;
  }

  if (roleNames.includes("coordinator")) {
    return <Navigate to={"/coordinator"} />;
  }

  if (roleNames.includes("supervisor")) {
    return <Navigate to={"/supervisor"} />;
  }

  if (roleNames.includes("dean")) {
    return <Navigate to={"/dean"} />;
  }

  return <div>The User is Authenticated. TODO: Authorize the user</div>;
}
