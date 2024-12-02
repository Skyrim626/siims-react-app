import React, { useEffect, useState } from "react";
import LoginForm from "../../components/forms/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import AuthPrompt from "../../components/auth/AuthPrompt";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";
import useFormData from "../../hooks/useFormData";

export default function LoginPage() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Initialize form state for login credentials (id and password)
  const { formData, handleChange } = useFormData({
    id: "",
    password: "",
  });
  // Handle Input Errors
  const [errors, setErrors] = useState({});

  // Loading State
  const [loading, setLoading] = useState(false);

  // Destructure login function from the useAuth hook for handling login requests
  const { login } = useAuth();

  /**
   * Handles form submission for login.
   * Prevents the default form submission behavior, prepares the payload,
   * and invokes the login function to attempt user authentication.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload with the login information from the form
    const payload = formData;

    // Attempt login and handle validation errors
    const validationErrors = login(payload, setLoading, navigate);

    // console.log(validationErrors);
    if (validationErrors) {
      setErrors(validationErrors); // Set errors in state
    }
  };

  return (
    <>
      {/* Loading */}
      <Loader loading={loading} />

      {/* Logo and welcome message */}
      <AuthPrompt
        heading={"Welcome back"}
        description={"Please enter log in details below."}
      />

      {/* Login form component */}
      <LoginForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors} // Pass validation errors
      />
    </>
  );
}
