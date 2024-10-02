import React, { useState } from "react";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Page from "../../components/common/Page";
import { Briefcase, Calendar as CalendarIcon } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

// Sample data for the supervisor's office
const officeDetails = {
  officeName: "Information and Technology Office",
  officeLocation: "5th Floor, West Wing, Tech Park Building",
  companyName: "Tech Solutions Corp",
};

const SupervisorDashboardPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Page>
      {/* Header Section */}
      <Section>
        <Heading level={3} text={"Dashboard"} />
        <Text className="text-sm text-blue-950">
          Overview of the system data.
        </Text>
        <hr className="my-3" />
      </Section>

      {/* Welcome and Office Details */}
      <Section className="my-3 flex flex-col items-start">
        <div className="rounded-lg py-6 px-4 bg-gray-50 shadow-md w-full">
          <Heading
            level={5}
            text={officeDetails.officeName}
            className="font-bold text-gray-800"
          />
          <Text className="text-sm text-gray-600 mb-1">
            Company: {officeDetails.companyName}
          </Text>
          <Text className="text-sm text-gray-600 mb-4">
            Location: {officeDetails.officeLocation}
          </Text>
          <Heading
            level={2}
            text={`Welcome back, Supervisor!`}
            className="font-bold text-gray-800 mt-2"
          />
          <Text className="text-gray-700">
            Take a look at the updated SIIMS overview.
          </Text>
        </div>
      </Section>

      {/* Statistics Cards */}
      <Section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform duration-200 hover:shadow-xl">
          <Briefcase size={40} className="text-blue-600" />
          <div>
            <Heading level={4} text={"Internships"} className="text-gray-800" />
            <Text className="text-lg font-bold">12</Text>
            <Text className="text-sm text-gray-600">Active Internships</Text>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform duration-200 hover:shadow-xl">
          <Briefcase size={40} className="text-blue-600" />
          <div>
            <Heading level={4} text={"Interns"} className="text-gray-800" />
            <Text className="text-lg font-bold">15</Text>
            <Text className="text-sm text-gray-600">Current Interns</Text>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform duration-200 hover:shadow-xl">
          <CalendarIcon size={40} className="text-blue-600" />
          <div>
            <Heading level={4} text={"Job Posts"} className="text-gray-800" />
            <Text className="text-lg font-bold">5</Text>
            <Text className="text-sm text-gray-600">Active Job Posts</Text>
          </div>
        </div>
      </Section>

      {/* Calendar Section */}
      <Section className="my-8">
        <Heading level={4} text={"Your Calendar"} className="mb-4" />
        <div className="p-4 bg-white rounded-lg shadow-md">
          <Calendar onChange={setDate} value={date} className="rounded-md" />
        </div>
      </Section>
    </Page>
  );
};

export default SupervisorDashboardPage;
