// Libraries
import React, { useState } from "react";

// Forms
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import AuthPrompt from "../../components/auth/AuthPrompt";
import Text from "../../components/common/Text";
import { postRequest } from "../../api/apiHelpers";
import Loader from "../../components/common/Loader";

// Forgot Password Page Component
export default function ForgotPasswordPage() {
  // Input State
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Send Email
  const submitEmail = async (e) => {
    // Prevent Default
    e.preventDefault();

    // Set Loading
    setLoading(true);

    // Payload
    const payload = { email };

    try {
      const response = await postRequest({
        url: "/api/v1/auth/forgot-password",
        data: payload,
      });

      if (response) {
        setMessage(response.message);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      setMessage(null);
    } finally {
      setLoading(false);
    }

    // console.log(payload);
  };

  return (
    <>
      {/* Loading */}
      <Loader loading={loading} />

      {/* Logo and Welcome */}
      <AuthPrompt
        heading={"Forgot Password"}
        description={"Please enter your email to verify."}
      />
      {message && <Text className="text-green-500">{message}</Text>}
      {error && <Text className="text-red-600">{error}</Text>}
      {/* Forgot Password Form */}
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
        onSubmit={submitEmail}
        message={message}
        error={error}
      />
    </>
  );
}
