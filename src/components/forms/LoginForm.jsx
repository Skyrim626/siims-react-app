import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Field, Input, Label, Button } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({
  loginInfo = {
    id: "",
    password: "",
  },
  handleLoginInfoChange,
  handleSubmit,
}) => {
  //  Toggle States
  const [toggleVisible, setToggleVisible] = useState(false);

  return (
    <>
      <form method="post" onSubmit={handleSubmit} className="mt-3 space-y-4">
        {/* ID Input */}
        <Field className={"text-sm flex flex-col gap-2"}>
          <Label htmlFor="id" className={"text-white font-bold"}>
            User ID
          </Label>
          <Input
            type="text"
            value={loginInfo.id}
            className={"outline-none rounded-md text-black p-3"}
            name="id"
            placeholder="Enter your ID"
            onChange={handleLoginInfoChange}
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
              value={loginInfo.password}
              className={"w-full outline-none p-3 bg-transparent"}
              name="password"
              placeholder="Enter your password"
              onChange={handleLoginInfoChange}
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
          <Link
            to="/forgot-password"
            className="text-sm underline transition hover:text-gray-300"
          >
            Forgot Password?
          </Link>
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
