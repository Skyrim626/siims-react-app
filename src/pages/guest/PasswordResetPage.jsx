// Libraries
import React, { useState, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";

// Components
// import AuthPrompt from "../../components/auth/AuthPrompt";
import Text from "../../components/common/Text";
import { postRequest } from "../../api/apiHelpers";

// Password Reset Page Component
export default function PasswordResetPage() {
  const { token } = useParams(); // Get the token from the URL
  const location = useLocation(); // Get the location (to access the query params)

  // Input States
  const [email, setEmail] = useState(""); // State to hold the email
  const [password, setPassword] = useState(""); // New password state
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); // Confirm password state
  const [message, setMessage] = useState(null); // Message state
  const [error, setError] = useState(null); // Error state
  const [redirectToLogin, setRedirectToLogin] = useState(false); // State to handle redirection

  // Extract email from the URL query parameters
  useEffect(() => {
    const emailParam = new URLSearchParams(location.search).get("email");
    setEmail(emailParam); // Set the email state with the extracted email
  }, [location]);

  // Submit the password reset
  const submitReset = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      setMessage(null);
      return;
    }

    // Prepare the payload
    const payload = {
      token, // Reset token from the URL params
      email, // Extracted email from the URL
      password, // New password
      password_confirmation: passwordConfirmation, // Confirm password
    };

    try {
      // Send the password reset request
      const response = await postRequest({
        url: "/api/v1/auth/password-reset",
        data: payload,
      });

      // console.log(response);

      // Set success message
      setMessage(response.message);
      setError(null);

      // Redirect to the login page after a successful password reset

      setRedirectToLogin(true);
    } catch (err) {
      // Set error message
      setError(err.response?.data?.message || "Something went wrong.");
      setMessage(null);
    }
  };

  // Redirect if password reset is successful
  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {/* Logo and Welcome */}
      <AuthPrompt
        heading={"Reset Your Password"}
        description={"Enter your new password below."}
      />

      {/* Display success or error messages */}
      {message && <Text className="text-green-500">{message}</Text>}
      {error && <Text className="text-red-600">{error}</Text>}

      {/* Password Reset Form */}
      <form className="mt-6 space-y-6" onSubmit={submitReset}>
        <div className="space-y-4">
          {/* New Password */}
          <div>
            <label className="text-sm font-bold text-white" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="mt-2 p-3 w-full rounded-md text-black"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="text-sm font-bold text-white"
              htmlFor="passwordConfirmation"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirm your new password"
              className="mt-2 p-3 w-full rounded-md text-black"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-6 text-white text-sm font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Reset Password
        </button>
      </form>
    </>
  );
}
