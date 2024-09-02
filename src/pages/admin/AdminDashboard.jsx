// Libraries
import React from "react";

// Components (Common)
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Page from "../../components/common/Page";

// Import Lucide Icones
import { BookCopy, Building, Building2Icon, Users } from "lucide-react";
import TextBox from "../../components/molecules/TextBox";
import { useLoaderData } from "react-router-dom";

// Admin Layout
export default function AdminDashboard() {
  // Load Data
  const data = useLoaderData();

  return (
    <Page>
      <Section>
        <Heading level={2} text={"Dashboard"} />
        <p className="text-blue-950">Overview of the system data.</p>
        <hr className="my-3" />
      </Section>

      <Section className="mt-4">
        <div className="grid grid-cols-2 gap-4 mt-3">
          <TextBox borderColor="border-yellow-400">
            <Building2Icon size={20} />
            <p className="font-bold text-lg">{data[0].label}</p>
            <p className="font-bold text-3xl">{data[0].total}</p>
          </TextBox>
          <TextBox borderColor="border-green-400">
            <BookCopy size={20} />
            <p className="font-bold text-lg">{data[1].label}</p>
            <p className="font-bold text-3xl">{data[1].total}</p>
          </TextBox>
          <TextBox borderColor="border-blue-500">
            <Users size={20} />
            <p className="font-bold text-lg">{data[2].label}</p>
            <p className="font-bold text-3xl">{data[2].total}</p>
          </TextBox>
          <TextBox borderColor="border-red-500">
            <Building size={20} />
            <p className="font-bold text-lg">{data[3].label}</p>
            <p className="font-bold text-3xl">{data[3].total}</p>
          </TextBox>
        </div>
      </Section>
    </Page>
  );
}
