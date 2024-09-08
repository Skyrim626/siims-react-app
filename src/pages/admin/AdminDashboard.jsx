// Libraries
import React from "react";
import { useLoaderData } from "react-router-dom";

// Assets
import welcomingImage from "../../assets/images/welcoming-message-admin.svg";

// Components (Common)
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Page from "../../components/common/Page";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";

// Import Lucide Icones
import { BookCopy, Building, Building2Icon, Users } from "lucide-react";
import TextBox from "../../components/molecules/TextBox";

// Admin Layout
export default function AdminDashboard() {
  // Load Data
  const data = useLoaderData();

  // Get User's name
  const { user } = useAuth();
  // Concatenate full name
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <Page>
      <Section>
        <Heading level={2} text={"Dashboard"} />
        <p className="text-blue-950">Overview of the system data.</p>
        <hr className="my-3" />
      </Section>
      <Section className="my-5 flex items-end">
        <div className="rounded-lg bg-blue-600 p-3 py-4 w-full">
          <Heading
            level={1}
            text={`Welcome, Admin ${fullName} ! 👋`}
            className="font-bold text-gray-50"
          />
        </div>
      </Section>

      <Section className="mt-4">
        <div className="grid grid-cols-4 gap-3 mt-3">
          <div className="col-span-3">
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
          </div>
          <div className="col-span-1">
            <div className="flex justify-between items-center">
              <Heading level={4} text={"Users"} className="font-semibold" />
              <p className="font-bold text-lg">1000</p>
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
