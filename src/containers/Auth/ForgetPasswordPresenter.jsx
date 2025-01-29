import React from "react";
import Loader from "../../components/common/Loader";
import AuthPrompt from "./components/AuthPrompt";
import Text from "../../components/common/Text";
import { Button, Field, Input, Label } from "@headlessui/react";
import { NavLink } from "react-router-dom";

const ForgetPasswordPresenter = ({
  email,
  setEmail,
  message,
  error,
  loading,
  submitEmail,
}) => {
  return (
    <>
      <Loader loading={loading} />

      <AuthPrompt
        heading={"Forgot Password"}
        description={"Please enter your email to verify."}
      />
      {message && <Text className="text-green-500">{message}</Text>}
      {error && <Text className="text-red-600">{error}</Text>}

      <form method="post" className="mt-3 space-y-5" onSubmit={submitEmail}>
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

export default ForgetPasswordPresenter;
