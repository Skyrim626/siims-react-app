import React, { useEffect } from "react";
import LoginForm from "../../components/forms/LoginForm";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { showFailedAlert } from "../../utils/toastify";
import AuthPrompt from "../../components/auth/AuthPrompt";

/**
 * LoginPage Component
 * This component renders the login page of the application, which includes a logo,
 * a heading, a brief welcome text, and the login form for user authentication.
 *
 * Features:
 * - Uses a custom useForm hook to manage the login form state.
 * - Uses the useAuth hook to perform login authentication.
 * - Displays an error alert if a login error is stored in localStorage.
 *
 * @returns {JSX.Element} The login page with a form to authenticate users.
 */
export default function LoginPage() {
  // Initialize form state for login credentials (id and password)
  const [loginInfo, handleLoginInfoChange, resetLoginInfo] = useForm({
    id: "",
    password: "",
  });

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
    const payload = loginInfo;

    // Attempt to log in the user with the provided credentials
    login(payload);
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
        loginInfo={loginInfo}
        handleLoginInfoChange={handleLoginInfoChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
