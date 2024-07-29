import React from "react";
import Section from "../components/atoms/Section";
import Heading from "../components/atoms/Heading";

export default function Dashboard() {
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
