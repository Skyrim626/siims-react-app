import React from "react";
import SectionCard from "./SectionCard";
import Text from "../common/Text";

const AboutMeSection = ({ title = "About Me", user = {} }) => {
  return (
    <SectionCard title={title}>
      <Text className="text-gray-700">
        Hello, I'm {user.first_name}! I'm a student pursuing {user.program} at{" "}
        {user.college}. My interests include software development, data science,
        and exploring emerging technologies.
      </Text>
    </SectionCard>
  );
};

export default AboutMeSection;
