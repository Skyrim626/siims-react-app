import React, { useState } from "react";

// Image Imports
import logo from "../assets/images/logo.svg";

// Molecule Components Import
import TextFormField from "../components/molecules/TextFormField";
import Form from "../components/organisms/Form";

// React Router Dom Libraries Import
import { NavLink } from "react-router-dom";
import Button from "../components/atoms/Button";
import Heading from "../components/atoms/Heading";

// Forgot Password Page Component
export default function ForgotPassword() {
  // Use States
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Logo and Welcome */}
      <div className="flex flex-col">
        <img src={logo} alt="SIIMS Logo" className="w-2/5 mx-auto md:mx-0" />
        <Heading
          level={3}
          text={"Forgot Password"}
          textColor="text-white"
          className="mb-1"
        />
        <p>Please enter your email to verify</p>
      </div>

      {/* Forgot Password Form */}
      {/* form action TODO */}
      <Form method={"POST"} className="mt-3 space-y-5">
        <TextFormField
          label={"Email"}
          type="email"
          name={"email"}
          placeholder={"johnDoe@email.com"}
          value={email}
          className="text-black px-2 py-3 rounded-md outline-none ring-offset-2 focus:ring-2 ring-blue-400/50"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          isRequired
        />

        {/* Back to login */}
        <div className="text-right">
          <NavLink
            to="/login"
            className="text-sm underline transition hover:text-gray-300"
          >
            Back to login {/* TBD */}
          </NavLink>
        </div>

        {/* Button Submit */}
        <Button
          type="submit"
          className="w-full py-3 transition bg-blue-600 hover:bg-blue-700 rounded-sm"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}
