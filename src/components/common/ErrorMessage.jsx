import React from "react";
import Text from "./Text";

const ErrorMessage = ({ errors, fieldName }) => {
  // Check if there is an error for the specific field
  if (errors && errors[fieldName]) {
    return <Text>{errors[fieldName][0]}</Text>;
  }

  return null;
};

export default ErrorMessage;
