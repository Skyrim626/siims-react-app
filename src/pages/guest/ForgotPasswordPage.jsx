// Libraries
import React from "react";

// Assets
import logo from "../../assets/images/logo.svg";

/**
 * Components
 */
// Common
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";

// Forms
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";

// Forgot Password Page Component
export default function ForgotPasswordPage() {
  return (
    <>
      {/* Logo and Welcome */}
      <div className="flex flex-col">
        <img src={logo} alt="SIIMS Logo" className="w-2/5 mx-auto md:mx-0" />
        <Heading
          level={3}
          text={"Forgot Password"}
          className="mb-1 text-white"
        />
        <Text className="text-sm">Please enter your email to verify.</Text>
      </div>

      {/* Forgot Password Form */}
      <ForgotPasswordForm />
    </>
  );
}
