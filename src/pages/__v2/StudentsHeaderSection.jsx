import React, { useState } from "react";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import StatusListModal from "../../components/modals/StatusListModal";

const StudentsHeaderSection = () => {
  return (
    <>
      <Section>
        <div>
          <Heading level={3} text="Manage Students" />
          <Text className="text-md text-blue-950">
            This is where you manage the students.
          </Text>
        </div>

        <hr className="my-3" />
      </Section>
    </>
  );
};

export default StudentsHeaderSection;
