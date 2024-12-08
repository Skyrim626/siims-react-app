import React from "react";
import Text from "../common/Text";

const ApplicationHeader = ({
  title = " Applicant Overview",
  description = "Manage applicant information and document status with ease.",
}) => {
  return (
    <div className="bg-blue-600 text-white p-8 rounded-xl shadow-xl mb-8 text-center">
      <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
      <Text className="text-lg">{description}</Text>
    </div>
  );
};

export default ApplicationHeader;
