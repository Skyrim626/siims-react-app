// Libraries
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";

// Common
import FormField from "../common/FormField";
import Button from "../common/Button";
import { toast } from "react-toastify";

// Login Form
const LoginForm = () => {
  // Input States
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // Auth Login
  const { login } = useAuth();

  // Error Catcher
  const [error, setError] = useState("");

  useEffect(() => {
    const loginError = localStorage.getItem("loginError");

    if (loginError) {
      setError(loginError);

      console.log(loginError);

      localStorage.removeItem("loginError");

      toast.error("The provided credentials do not match our records", {
        theme: "colored",
      });
    }
  }, []);

  useEffect(() => {
    setError("");
  }, [id, password]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Payload
    const payload = {
      id: id,
      password: password,
    };

    // Attempt to login user
    login(payload);
  };

  return (
    <>
      <form method="post" onSubmit={handleLogin} className="mt-3 space-y-4">
        {/* ID Input */}
        <FormField
          label={"User ID"}
          labelClassName="text-md text-white"
          name={"id"}
        >
          <input
            className="outline-none rounded-md text-black text-md p-3"
            name="id"
            placeholder="Enter your ID"
            onChange={(event) => {
              setId(event.target.value);
            }}
            autoComplete="off"
            /* required */
            type="text"
            value={id}
          />
        </FormField>

        {/* Password */}
        <FormField
          label={"Password"}
          name={"password"}
          labelClassName="text-md text-white"
        >
          <input
            className="outline-none rounded-md text-black text-md p-3"
            name="password"
            placeholder="Enter your password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            /* required */
            type="password"
            value={password}
          />
        </FormField>
        {error && <span className="text-red-500">{error}</span>}

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
          className="w-full py-3 transition rounded-sm text-white bg-blue-600 hover:bg-blue-700"
          type="submit"
        >
          Log In
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
