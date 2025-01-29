import { Button, Field, Input, Label } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ formData, handleChange, handleSubmit, errors }) => {
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
            value={formData.id} // Controlled input tied to loginInfo.id
            className={"outline-none rounded-md text-black p-3"}
            name="id"
            placeholder="Enter your ID"
            onChange={handleChange} // Updates form state on input change
            autoComplete="off"
            required
          />
          {errors.id && <Text className="text-red-500">{errors.id[0]}</Text>}{" "}
          {/* Display ID errors */}
        </Field>

        {/* Password Input Field */}
        <Field className={"text-sm flex flex-col gap-2"}>
          <Label htmlFor="password" className={"text-white font-bold"}>
            Password
          </Label>
          <div className="flex items-center bg-white rounded-md text-black">
            <Input
              type={toggleVisible ? "text" : "password"} // Toggles between 'text' and 'password'
              value={formData.password} // Controlled input tied to loginInfo.password
              className={"w-full outline-none p-3 bg-transparent"}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange} // Updates form state on input change
              autoComplete="off"
              required
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
          {errors.password && (
            <Text className="text-red-500">{errors.password[0]}</Text>
          )}
          {/* Display Password errors */}
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
