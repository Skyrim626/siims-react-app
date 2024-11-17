import React, { useEffect, useState } from "react";
import LoginForm from "../../components/forms/LoginForm";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { showFailedAlert } from "../../utils/toastify";
import AuthPrompt from "../../components/auth/AuthPrompt";

export default function LoginPage() {
  // Initialize form state for login credentials (id and password)
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Destructure login function from the useAuth hook for handling login requests
  const { login } = useAuth();

  /**
   * useEffect hook to check for any login error stored in localStorage.
   * If a login error exists, a toast notification is displayed, and the error
   * is cleared from localStorage after a short delay.
   */
  useEffect(() => {
    const loginError = localStorage.getItem("loginError");

    if (loginError) {
      // Show a toast alert for login failure
      showFailedAlert(loginError);

      // Clear the login error from localStorage after a short delay
      setTimeout(() => {
        localStorage.removeItem("loginError");
      }, 100); // Adjust the delay timing as needed
    }
  }, []);

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
    const payload = {
      id,
      password,
    };

    // Attempt login and handle validation errors
    const validationErrors = await login(payload);

    console.log(validationErrors);

    if (validationErrors) {
      setErrors(validationErrors); // Set errors in state
    }
  };

  return (
    <>
      {/* Logo and welcome message */}
      <AuthPrompt
        heading={"Welcome back"}
        description={"Please enter log in details below."}
      />
      {/* Login form component */}
      <LoginForm
        id={id}
        password={password}
        setId={setId}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        errors={errors} // Pass validation errors
      />
    </>
  );
}
