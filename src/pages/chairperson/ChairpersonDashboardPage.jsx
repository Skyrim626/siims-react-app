import React from "react";

// Import Components

import { Building, PersonStanding, UserPen } from "lucide-react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";

export default function ChairpersonDashboardPage() {
  return (
    <>
      <Page>
        <Section>
          <Heading level={3} text={"Dashboard"} />
          <Text className="text-blue-950 text-sm">
            Overview of the system data.
          </Text>
          <hr className="my-3" />
        </Section>

        <div className="bg-blue-600 w-100 rounded-md px-2 py-7">
          <Heading
            level={3}
            text={"Welcome, Chairperson! 👋"}
            textColor="text-white"
          />
        </div>

        <Section>
          <Heading level={4} text={"Overview"} fontStyle="font-semibold" />
        </Section>
      </Page>
    </>
  );
}
