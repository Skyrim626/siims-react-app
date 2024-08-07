import React, { useState } from "react";

// Image Imports
import logo from "../assets/images/logo.svg";

// Molecule Components Import
import TextFormField from "../components/molecules/TextFormField";
import Form from "../components/organisms/Form";

// React Router Dom Libraries Import
import { Navigate, NavLink } from "react-router-dom";
import Button from "../components/atoms/Button";

// Custom Hooks Imports
import Loader from "../components/atoms/Loader";
import { useAuth } from "../contexts/AuthContext";
import Heading from "../components/atoms/Heading";
import FormField from "../components/molecules/FormField";
import Input from "../components/atoms/Input";

// Login Page Component
export default function Login() {
  // Use States for Input
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await login(id, password);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Logo and Welcome */}
          <div className="flex flex-col">
            <img
              src={logo}
              alt="SIIMS Logo"
              className="w-2/5 mx-auto md:mx-0"
            />
            <Heading
              text={"Welcome back"}
              textColor="text-white"
              className="mb-1"
            />
            <p>Please enter log in details below</p>
          </div>

          {/* Login Form */}
          <Form
            onSubmit={handleLogin}
            className="mt-3 space-y-5"
            method={"post"}
          >
            {/* ID Input */}
            <FormField
              label={"User ID"}
              labelSize={"medium"}
              labelColor={"white"}
              name={"id"}
            >
              <Input
                color="black"
                type="text"
                onChange={(event) => {
                  setId(event.target.value);
                }}
                placeholder="Enter your ID"
                rounded
                value={id}
              />
            </FormField>

            {/* Password */}
            <FormField
              label={"Password"}
              labelSize={"medium"}
              labelColor={"white"}
              name={"password"}
            >
              <Input
                color="black"
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                placeholder="Enter your password"
                rounded
                value={password}
              />
            </FormField>

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
              bgColor="blue"
              className="w-full py-3 transition rounded-sm"
              color="white"
              hoverBgColor="dark-blue"
              type="submit"
            >
              Log In
            </Button>
          </Form>
        </>
      )}
    </>
  );
}
