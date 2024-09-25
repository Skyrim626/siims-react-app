import React, { useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import Heading from "../../components/common/Heading";
import LoginForm from "../../components/forms/LoginForm";
import Text from "../../components/common/Text";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { showFailedAlert } from "../../utils/toastify";

// Login Page Component
export default function LoginPage() {
  // Use Form State
  const [loginInfo, handleLoginInfoChange, resetLoginInfo] = useForm({
    id: "",
    password: "",
  });

  // Auth Login
  const { login } = useAuth();

  // Use Effect: loginError
  useEffect(() => {
    const loginError = localStorage.getItem("loginError");
    // console.log("Current login error in localStorage:", loginError);

    if (loginError) {
      // Show toast
      showFailedAlert(loginError);

      // Clear the login error from localStorage
      // Delay the removal of loginError from localStorage
      setTimeout(() => {
        localStorage.removeItem("loginError");
      }, 100); // Adjust the timing as needed
    }
  }, []);

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload
    const payload = loginInfo;

    // Attempt to login user
    login(payload);
  };

  return (
    <>
      {/* Logo and Welcome */}
      <div className="flex flex-col">
        <img src={logo} alt="SIIMS Logo" className="w-2/5 mx-auto md:mx-0" />
        <Heading text={"Welcome back"} className="mb-1" />
        <Text className="text-sm">Please enter log in details below.</Text>
      </div>

      {/* Login Form */}
      <LoginForm
        loginInfo={loginInfo}
        handleLoginInfoChange={handleLoginInfoChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
