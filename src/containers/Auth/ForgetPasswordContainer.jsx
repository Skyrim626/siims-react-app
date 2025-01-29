import React, { useState } from "react";
import ForgetPasswordPresenter from "./ForgetPasswordPresenter";

const ForgetPasswordContainer = () => {
  /**
   *
   *
   * INPUT STATE
   *
   *
   */
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  /**
   *
   *
   * LOADING STATE
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * FUNCTIONS
   *
   *
   */
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
      <ForgetPasswordPresenter
        email={email}
        setEmail={setEmail}
        message={message}
        error={error}
        loading={loading}
        submitEmail={submitEmail}
      />
    </>
  );
};

export default ForgetPasswordContainer;
