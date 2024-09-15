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
import Text from "../../components/common/Text";

// Login Page Component
export default function LoginPage() {
  return (
    <>
      {/* Logo and Welcome */}
      <div className="flex flex-col">
        <img src={logo} alt="SIIMS Logo" className="w-2/5 mx-auto md:mx-0" />
        <Heading text={"Welcome back"} className="mb-1" />
        <Text className="text-sm">Please enter log in details below.</Text>
      </div>

      {/* Login Form */}
      <LoginForm />
    </>
  );
}
