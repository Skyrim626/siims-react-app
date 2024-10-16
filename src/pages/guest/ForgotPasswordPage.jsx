// Libraries
import React from "react";

/**
 * Components
 */
// Common
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";

// Forms
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import AuthPrompt from "../../components/auth/AuthPrompt";

// Forgot Password Page Component
export default function ForgotPasswordPage() {
  return (
    <>
      {/* Logo and Welcome */}
      <AuthPrompt
        heading={"Forgot Password"}
        description={"Please enter your email to verify."}
      />
      {/* Forgot Password Form */}
      <ForgotPasswordForm />
    </>
  );
}
