import React, { useState } from "react";

// Image Imports
import logo from "../assets/images/logo.svg";

// Molecule Components Import
import FormField from "../components/molecules/TextFormField";

// React Router Dom Libraries Import
import { Navigate, NavLink } from "react-router-dom";
import Button from "../components/atoms/Button";

// Custom Hooks Imports
import axiosClient from "../axios";
import useAuth from "../hooks/useAuth";
import Loader from "../components/atoms/Loader";

// Login Page Component
export default function Login() {
  // Use States for Input
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    await login(id, password);
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* Logo and Welcome */}
      <div className="flex flex-col">
        <img src={logo} alt="SIIMS Logo" className="w-2/5 mx-auto md:mx-0" />
        <h1 className="font-bold text-3xl mb-1">Welcome back</h1>
        <p>Please enter log in details below</p>
      </div>

      {/* Login Form */}
      <form method="post" className="mt-3 space-y-5" onSubmit={handleLogin}>
        <FormField
          label={"User ID"}
          name={"id"}
          placeholder={"Enter your ID"}
          value={id}
          className="text-black px-2 py-3 rounded-md outline-none ring-offset-2 ring-1 focus:ring-4 ring-blue-400/50"
          onChange={(event) => {
            setId(event.target.value);
          }}
        />

        <FormField
          label={"Password"}
          name={"password"}
          placeholder={"Enter your Password"}
          type={"password"}
          value={password}
          className="text-black px-2 py-3 rounded-md outline-none ring-offset-2 ring-1 focus:ring-4 ring-blue-400/50"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        {/* Forgot Password */}
        <div className="text-right">
          <NavLink
            to="/forgot-password"
            className="text-sm underline transition hover:text-gray-300"
          >
            Forgot Password?
          </NavLink>
        </div>

        {/* Button Submit */}
        <Button
          type="submit"
          className="w-full py-3 transition bg-blue-600 hover:bg-blue-700 rounded-sm"
        >
          Log In
        </Button>
      </form>
    </>
  );
}
