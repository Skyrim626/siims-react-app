import React, { useEffect, useState } from "react";
import { appStateContext } from "../contexts/AppContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../axios";
import Loader from "../components/atoms/Loader";

export default function Authentication() {
  // Use Context
  const { token } = appStateContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // set loading to true

    const fetchUserRoles = async () => {
      // check token if exist
      if (token) {
        try {
          const response = await axiosClient.get("/user/roles", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setRoles(response.data);
        } catch (err) {
          console.log("catching");
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserRoles();
  }, [token, setRoles]);

  // check if token exist
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  // loads if true
  if (loading) {
    return <Loader />;
  }

  const roleNames = roles.map((role) => role.name); // Extract role names from roles array

  if (
    roleNames.length === 1 &&
    roleNames.includes("student", "company", "chairperson")
  ) {
    return <Navigate to={"/student"} />;
  }

  return <div>The User is Authenticated. TODO: Authorize the user</div>;
}
