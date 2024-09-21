// Libraries
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";

// Headless UI Components
import { Field, Input, Label, Button } from "@headlessui/react";

// import Button from "../common/Button";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { showFailedAlert } from "../../utils/toastify";

// Login Form
const LoginForm = () => {
  //  Use States
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [toggleVisible, setToggleVisible] = useState(false);

  // Auth Login
  const { login } = useAuth();

  // Error Catcher
  const [error, setError] = useState("");

  // BUT THIS TOAST IS NOT WORKING EVEN IT IS TRUE
  useEffect(() => {
    const loginError = localStorage.getItem("loginError");
    console.log("Current login error in localStorage:", loginError);

    if (loginError) {
      // Show toast
      showFailedAlert(loginError);

      // Clear the login error from localStorage
      // Delay the removal of loginError from localStorage
      setTimeout(() => {
        localStorage.removeItem("loginError");
      }, 100); // Adjust the timing as needed
    }
  }, []);

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
        <Field className={"text-sm flex flex-col gap-2"}>
          <Label htmlFor="id" className={"text-white font-bold"}>
            User ID
          </Label>
          <Input
            type="text"
            value={id}
            className={"outline-none rounded-md text-black p-3"}
            name="id"
            placeholder="Enter your ID"
            onChange={(event) => {
              setId(event.target.value);
            }}
            autoComplete="off"
          />
        </Field>

        {/* Password */}
        <Field className={"text-sm flex flex-col gap-2"}>
          <Label htmlFor="password" className={"text-white font-bold"}>
            Password
          </Label>
          <div className="flex items-center bg-white rounded-md text-black">
            <Input
              type={toggleVisible ? "text" : "password"}
              value={password}
              className={"w-full outline-none p-3 bg-transparent"}
              name="password"
              placeholder="Enter your password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              autoComplete="off"
            />
            <Button
              className="mr-3 text-gray-600"
              onClick={() => {
                setToggleVisible(!toggleVisible);
              }}
            >
              {toggleVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </Button>
          </div>
        </Field>

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
          className={
            "w-full py-3 text-sm rounded-sm bg-blue-600 transition hover:bg-blue-700"
          }
        >
          Log In
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
