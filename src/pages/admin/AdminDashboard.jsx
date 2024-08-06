import React from "react";

// Improt Components
import Section from "../../components/atoms/Section";
import Heading from "../../components/atoms/Heading";
import Page from "../../components/atoms/Page";
import Grid from "../../components/organisms/Grid";

// Import Lucide Icones
import { BookCopy, Building, Building2Icon, Users } from "lucide-react";
import TextBox from "../../components/molecules/TextBox";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/atoms/Loader";

// Customize textbox contents
/* const textBoxContents = [
  {
    icon: <Building2Icon size={20} />,
    borderColor: "border-yellow-400",
    label: "Total Departments",
    total: "56",
  },
  {
    icon: <BookCopy size={20} />,
    borderColor: "border-green-400",
    label: "Total Programs",
    total: "89",
  },
  {
    icon: <Users size={20} />,
    borderColor: "border-blue-500",
    label: "Total Users",
    total: "200",
  },
  {
    icon: <Building size={20} />,
    borderColor: "border-red-500",
    label: "Total Offices",
    total: "100",
  },
]; */

// Admin Layout
export default function AdminDashboard() {
  // Load data
  const { data, loading, error } = useFetch("/admin/dashboard");

  return loading ? (
    <Loader />
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : (
    <Page>
      <Section>
        <Heading level={2} text={"Dashboard"} />
        <p className="text-blue-950">Overview of the system data.</p>
        <hr className="my-3" />
      </Section>

      <Section className="mt-4">
        <Grid className="grid-cols-2 gap-4 mt-3">
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
        </Grid>
      </Section>
    </Page>
  );
}
