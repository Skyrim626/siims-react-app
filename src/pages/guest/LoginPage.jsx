// Libraries
import React from "react";

// Assets
import logo from "../../assets/images/logo.svg";

/**
 * Components
 */
import Heading from "../../components/common/Heading";

// Forms
import LoginForm from "../../components/forms/LoginForm";

// Login Page Component
export default function LoginPage() {
  return (
    <>
      {/* Logo and Welcome */}
      <div className="flex flex-col">
        <img src={logo} alt="SIIMS Logo" className="w-2/5 mx-auto md:mx-0" />
        <Heading text={"Welcome back"} className="mb-1" />
        <p>Please enter log in details below</p>
      </div>

      {/* Login Form */}
      <LoginForm />
    </>
  );
}
