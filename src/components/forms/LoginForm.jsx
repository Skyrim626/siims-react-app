import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Field, Input, Label, Button } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";

/**
 * LoginForm Component
 * This component renders a login form with input fields for User ID and Password.
 * It supports password visibility toggle and includes a "Forgot Password" link.
 *
 * Props:
 * @param {Object} loginInfo - The current state of the login form inputs.
 * @param {function} handleLoginInfoChange - Function to handle changes in form inputs.
 * @param {function} handleSubmit - Function to handle form submission.
 *
 * @returns {JSX.Element} The login form UI.
 */
const LoginForm = ({
  loginInfo = {
    id: "",
    password: "",
  },
  handleLoginInfoChange,
  handleSubmit,
}) => {
  // State to manage the visibility toggle for the password field
  const [toggleVisible, setToggleVisible] = useState(false);

  return (
    <>
      {/* Login Form */}
      <form method="post" onSubmit={handleSubmit} className="mt-3 space-y-4">
        {/* User ID Input Field */}
        <Field className={"text-sm flex flex-col gap-2"}>
          <Label htmlFor="id" className={"text-white font-bold"}>
            User ID
          </Label>
          <Input
            type="text"
            value={loginInfo.id} // Controlled input tied to loginInfo.id
            className={"outline-none rounded-md text-black p-3"}
            name="id"
            placeholder="Enter your ID"
            onChange={handleLoginInfoChange} // Updates form state on input change
            autoComplete="off"
          />
        </Field>

        {/* Password Input Field */}
        <Field className={"text-sm flex flex-col gap-2"}>
          <Label htmlFor="password" className={"text-white font-bold"}>
            Password
          </Label>
          <div className="flex items-center bg-white rounded-md text-black">
            <Input
              type={toggleVisible ? "text" : "password"} // Toggles between 'text' and 'password'
              value={loginInfo.password} // Controlled input tied to loginInfo.password
              className={"w-full outline-none p-3 bg-transparent"}
              name="password"
              placeholder="Enter your password"
              onChange={handleLoginInfoChange} // Updates form state on input change
              autoComplete="off"
            />
            <Button
              className="mr-3 text-gray-600"
              onClick={() => {
                setToggleVisible(!toggleVisible); // Toggles password visibility
              }}
            >
              {toggleVisible ? <Eye size={20} /> : <EyeOff size={20} />}{" "}
              {/* Eye icon for visibility */}
            </Button>
          </div>
        </Field>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm underline transition hover:text-gray-300"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
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
