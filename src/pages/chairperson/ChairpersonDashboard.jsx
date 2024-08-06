import React from "react";

// Import Components
import Section from "../../components/atoms/Section";
import Heading from "../../components/atoms/Heading";
import { Building, PersonStanding, UserPen } from "lucide-react";
import Page from "../../components/atoms/Page";
import Grid from "../../components/organisms/Grid";
import TextBox from "../../components/molecules/TextBox";

// Customize Text for Text Box Components
const textBoxContents = [
  {
    icon: <UserPen size={30} />,
    borderColor: "border-blue-500",
    label: "Total Interns",
    total: "193",
  },
  {
    icon: <Building size={30} />,
    borderColor: "border-yellow-400",
    label: "Total Companies",
    total: "8",
  },
  {
    icon: <PersonStanding size={30} />,
    borderColor: "border-green-500",
    label: "Total Coordinators",
    total: "28",
  },
  {
    icon: <UserPen size={30} />,
    borderColor: "border-red-500",
    label: "Total Interns",
    total: "124",
  },
];

export default function ChairpersonDashboard() {
  return (
    <>
      <Page>
        <Section>
          <Heading level={2} text={"Dashboard"} />
          <p className="text-blue-950">Overview of the system data.</p>
          <hr className="my-3" />
        </Section>

        <div className="bg-blue-600 w-100 rounded-md px-2 py-7">
          <Heading
            level={2}
            text={"Welcome Dr.Danny! 👋"}
            textColor="text-white"
          ></Heading>
        </div>

        <Section>
          <Heading level={4} text={"Overview"} fontStyle="font-semibold" />
          <Grid className="grid-cols-2 gap-4 mt-3">
            {textBoxContents.map((content, index) => {
              return (
                <TextBox key={index} borderColor={content.borderColor}>
                  {content.icon}
                  <p className="font-bold text-lg">{content.label}</p>
                  <p className="font-bold text-3xl">{content.total}</p>
                </TextBox>
              );
            })}
          </Grid>
        </Section>
      </Page>
    </>
  );
}
