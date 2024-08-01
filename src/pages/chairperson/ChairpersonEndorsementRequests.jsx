import React from "react";

// Import Components
import Section from "../../components/atoms/Section";
import Heading from "../../components/atoms/Heading";

export default function ChairpersonEndorsementRequests() {
  return (
    <>
      <div className="px-4">
        <Section>
          <Heading level={2} text={"Endorsement Requests"} />
          <p>View coordinators endorsement letter requests for internship.</p>
        </Section>
      </div>
    </>
  );
}
