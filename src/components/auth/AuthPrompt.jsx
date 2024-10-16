import React from "react";
import Heading from "../common/Heading";
import Text from "../common/Text";
// Assets
import logo from "../../assets/images/logo.svg";

const AuthPrompt = ({ heading, description }) => {
  return (
    <div className="flex flex-col">
      <img src={logo} alt="SIIMS Logo" className="w-2/5 mx-auto md:mx-0" />
      <Heading text={heading} className="mb-1" />
      <Text className="text-sm">{description}</Text>
    </div>
  );
};

export default AuthPrompt;
