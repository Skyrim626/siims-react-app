import React from "react";
import Loader from "../../components/common/Loader";
import AuthPrompt from "./components/AuthPrompt";
import LoginForm from "./forms/LoginForm";

const LoginPresenter = ({
  loading,
  formData,
  handleChange,
  handleSubmit,
  errors,
}) => {
  return (
    <>
      <Loader loading={loading} />

      {/* Logo and welcome message */}
      <AuthPrompt
        heading={"Welcome back"}
        description={"Please enter log in details below."}
      />

      <LoginForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default LoginPresenter;
