import React from "react";

// Import Components
import Section from "../../components/atoms/Section";
import Heading from "../../components/atoms/Heading";
import { Building, PersonStanding, UserPen } from "lucide-react";

export default function ChairpersonDashboard() {
  return (
    <>
      <div className="px-4">
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
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-center items-center gap-2 bg-white rounded-lg border-t-4 border-t-blue-700 px-5 py-8">
              <UserPen size={30} />
              <p className="font-bold text-lg">Total Interns</p>
              <p className="font-bold text-3xl">193</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 bg-white rounded-lg border-t-4 border-t-yellow-400 px-5 py-8">
              <Building size={30} />
              <p className="font-bold text-lg">Total Company</p>
              <p className="font-bold text-3xl">28</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 bg-white rounded-lg border-t-4 border-t-red-600 px-5 py-8">
              <PersonStanding size={30} />
              <p className="font-bold text-lg">Total Coordinators</p>
              <p className="font-bold text-3xl">28</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 bg-white rounded-lg border-t-4 border-t-green-700 px-5 py-8">
              <UserPen size={30} />
              <p className="font-bold text-lg">Total Programs</p>
              <p className="font-bold text-3xl">28</p>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
