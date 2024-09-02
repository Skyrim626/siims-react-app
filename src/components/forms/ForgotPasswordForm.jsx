// Libraries
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Components
import FormField from "../common/FormField";
import Button from "../common/Button";

// Forgot Password Form Component
const ForgotPasswordForm = () => {
  // Use States
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Forgot Password Form */}
      {/* form action TODO */}
      <form action="" method="post" className="mt-3 space-y-5">
        <FormField
          label={"Email"}
          labelClassName="text-white text-md"
          name={"email"}
        >
          <input
            className="outline-none rounded-md text-black text-md p-3"
            name="email"
            placeholder="johnDoe@email.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
            type="text"
            value={email}
          />
        </FormField>

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
      </form>
    </>
  );
};

export default ForgotPasswordForm;
