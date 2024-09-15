// Libraries
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Components
 */
// Headless UI Component
import { Button, Field, Input, Label } from "@headlessui/react";

// Forgot Password Form Component
const ForgotPasswordForm = () => {
  // Use States
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Forgot Password Form */}
      {/* form action TODO */}
      <form action="" method="post" className="mt-3 space-y-5">
        {/* ID Input */}
        <Field className={"text-sm flex flex-col gap-2"}>
          <Label htmlFor="email" className={"text-white font-bold"}>
            Email
          </Label>
          <Input
            type="text"
            value={email}
            className={"outline-none rounded-md text-black p-3"}
            name="email"
            placeholder="Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Field>

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
          className={
            "w-full py-3 text-sm rounded-sm bg-blue-600 transition hover:bg-blue-700"
          }
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
