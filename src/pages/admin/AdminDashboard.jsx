// Libraries
import React from "react";
import { useLoaderData } from "react-router-dom";

/**
 * Components
 */
// Components (Common)
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Page from "../../components/common/Page";
import Text from "../../components/common/Text";

// Import Lucide Icones
import { BookCopy, Building, Building2Icon, Users } from "lucide-react";
import TextBox from "../../components/molecules/TextBox";

// Admin Layout
export default function AdminDashboard() {
  // Load Data
  const data = useLoaderData();

  return (
    <Page>
      <Section>
        <Heading level={3} text={"Dashboard"} />
        <Text className="text-sm text-blue-950">
          Overview of the system data.
        </Text>
        <hr className="my-3" />
      </Section>
      <Section className="my-3 flex items-end">
        <div className="rounded-lg py-4 w-full">
          <Heading
            level={2}
            text={`Welcome back, Admin!`}
            className="font-bold text-black"
          />
          <Text>Take a look at the updated SIIMS overview</Text>
        </div>
      </Section>

      <Section className="mt-4">
        <div className="grid grid-cols-4 gap-3 mt-3">
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-4 mt-3">
              <TextBox borderColor="border-yellow-400">
                <Building2Icon size={20} />
                <Text className="font-bold text-lg">{data[0].label}</Text>
                <Text className="font-bold text-3xl">{data[0].total}</Text>
              </TextBox>
              <TextBox borderColor="border-green-400">
                <BookCopy size={20} />
                <Text className="font-bold text-lg">{data[1].label}</Text>
                <Text className="font-bold text-3xl">{data[1].total}</Text>
              </TextBox>
              <TextBox borderColor="border-blue-500">
                <Users size={20} />
                <Text className="font-bold text-lg">{data[2].label}</Text>
                <Text className="font-bold text-3xl">{data[2].total}</Text>
              </TextBox>
              <TextBox borderColor="border-red-500">
                <Building size={20} />
                <Text className="font-bold text-lg">{data[3].label}</Text>
                <Text className="font-bold text-3xl">{data[3].total}</Text>
              </TextBox>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex justify-between items-center">
              <Heading level={4} text={"Users"} className="font-semibold" />
              <Text className="font-bold text-lg">1000</Text>
            </div>
            <hr />
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-400 rounded-md justify-between">
                <div className="flex items-center gap-2">
                  <Building2Icon size={30} />
                  <p className="font-bold text-lg">Deans</p>
                </div>
                <p className="font-bold text-2xl">100</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-400 rounded-md justify-between">
                <div className="flex items-center gap-2">
                  <Building2Icon size={30} />
                  <p className="font-bold text-lg">Companies</p>
                </div>
                <p className="font-bold text-2xl">100</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-400 rounded-md justify-between">
                <div className="flex items-center gap-2">
                  <Building2Icon size={30} />
                  <p className="font-bold text-lg">Chairpersons</p>
                </div>
                <p className="font-bold text-2xl">100</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-400 rounded-md justify-between">
                <div className="flex items-center gap-2">
                  <Building2Icon size={30} />
                  <p className="font-bold text-lg">Students</p>
                </div>
                <p className="font-bold text-2xl">100</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
