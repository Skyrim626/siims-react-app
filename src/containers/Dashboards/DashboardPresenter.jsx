import React, { useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Container from "./components/Container";
import {
  Building2,
  BuildingIcon,
  Layers,
  Notebook,
  SquareUserRound,
  UserPen,
  UserRoundCheck,
  Users,
} from "lucide-react";
import StatCard from "./components/StatCard";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "react-leaflet";

const DashboardPresenter = ({ authorizeRole, details, barChartData }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Controlled state for the calendar

  return (
    <Page>
      {/* Dashboard Heading Section */}
      <Section className="mb-8 mt-5">
        <Heading level={3} text="Dashboard" className="text-blue-800" />
        <Text className="text-sm text-gray-500">
          Overview of the system data. Stay on top of everything!
        </Text>
        <hr className="my-4 border-gray-300" />
      </Section>

      {/* Welcome and Calendar Section */}
      <Section className="mb-12 flex flex-wrap gap-6">
        {/* Welcome Banner */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-8 flex items-center justify-center flex-col">
          <Heading
            level={2}
            text={`Welcome back, ${authorizeRole}!`}
            className="text-gray-900 font-bold text-2xl capitalize"
          />
          <Text className="text-gray-600 mt-2">
            Stay updated with the latest SIIMS statistics and insights.
          </Text>
        </div>

        {/* Calendar Section */}
        <div className="flex-1 rounded-lg p-6 w-full max-w-sm">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate} // Controlled value
              onChange={(newValue) => setSelectedDate(newValue)} // Update state on change
              className="border rounded-md"
            />
          </LocalizationProvider>
        </div>
      </Section>

      {/* Statistics Section */}
      <Section>
        {/* Main Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Key Statistics */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Total Colleges */}
            <Container
              borderTopColor="border-t-indigo-600"
              title="Total Colleges"
              totalData={details.total_colleges}
            >
              <Building2 size={32} className="text-indigo-600" />
            </Container>

            {/* Total Offices */}
            <Container
              borderTopColor="border-t-red-600"
              title="Total Offices"
              totalData={details.total_offices}
            >
              <Layers size={32} className="text-red-600" />
            </Container>

            {/* Total Jobs */}
            <Container
              borderTopColor="border-t-yellow-600"
              title="Total Jobs"
              totalData={details.total_work_posts}
            >
              <Notebook size={32} className="text-yellow-600" />
            </Container>

            {/* Total Programs */}
            <Container
              borderTopColor="border-t-green-600"
              title="Total Programs"
              totalData={details.total_programs}
            >
              <BuildingIcon size={32} className="text-green-600" />
            </Container>
          </div>

          {/* Right Panel: User Overview */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Heading
              level={4}
              text="User Overview"
              className="font-semibold text-gray-800 mb-4"
            />
            <div className="flex items-center justify-between">
              <Text className="font-bold text-xl">Total Users</Text>
              <Text className="font-bold text-xl text-gray-900">
                {details.total_users}
              </Text>
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="space-y-6">
              <StatCard
                icon={<Users size={30} className="text-indigo-600" />}
                label={"Total Students"}
                value={details.total_students}
              />
              <StatCard
                icon={<Building2 size={24} className="text-teal-600" />}
                label={"Total Companies"}
                value={details.total_companies}
              />
              <StatCard
                icon={<SquareUserRound size={30} className="text-purple-600" />}
                label={"Total Deans"}
                value={details.total_deans}
              />
              <StatCard
                icon={<UserPen size={30} className="text-orange-600" />}
                label={"Total Supervisors"}
                value={details.total_supervisors}
              />
              <StatCard
                icon={<UserRoundCheck size={30} className="text-green-600" />}
                label={"Total Coordinators"}
                value={details.total_coordinators}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* System Overview (Bar Chart) */}
      <Section className="mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Heading
            level={4}
            text="System Overview (Bar Chart)"
            className="font-semibold text-gray-800 mb-4"
          />

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6c63ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>
    </Page>
  );
};

export default DashboardPresenter;
