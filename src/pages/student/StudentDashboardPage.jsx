// libraries
import React from "react";

// Components (Common)
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";

export default function StudentDashboardPage() {
  return (
    <>
      <Section>
        <Heading level={2} text={"Dashboard"} />
        <p className="text-blue-950">Overview of the system data.</p>
        <hr className="my-3" />
      </Section>

      <Section>
        <Heading level={4} text={"Content Area"} fontStyle="font-semibold" />

        <p>This is where the main content will go.</p>
      </Section>
    </>
  );
}
