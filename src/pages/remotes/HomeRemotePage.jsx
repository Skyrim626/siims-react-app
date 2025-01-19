import React, { useEffect, useState } from "react";
import CompanyHomePageTesting from "../company/CompanyHomePageTesting";
import Loader from "../../components/common/Loader";
import { getRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Calendar from "react-calendar/dist/cjs/Calendar.js";
import Container from "../../components/dashboards/Container";
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
// Recharts

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

const HomeRemotePage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State
  const [details, setDetails] = useState({});
  const [barChartData, setBarChartData] = useState([
    {
      name: "",
      value: 0,
    },
  ]);

  // Fetch Request
  const fetchDetails = async () => {
    // Set Loading State
    setLoading(true);

    try {
      const response = await getRequest({
        url: "/api/v1/dashboards",
        params: {
          requestedBy: authorizeRole,
        },
      });

      if (response) {
        // console.log(response);
        setBarChartData(response.bar_chart);
        setDetails(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch Details
    fetchDetails();
  }, []);

  // Set Loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  /**
   * Remote for User Dashboards/Homepage
   */
  if (authorizeRole === "company") {
    return <CompanyHomePageTesting details={details} />;
  }

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

      {/* Welcome Section */}
      <Section className="mb-12 flex items-stretch justify-between">
        <div className="flex flex-1 justify-between items-center bg-white shadow-xl rounded-md p-8">
          <div>
            <Heading
              level={2}
              text={`Welcome back, ${capitalizeFirstLetter(authorizeRole)}!`}
              className="text-gray-900 font-bold text-2xl"
            />
            <Text className="text-gray-600 mt-1">
              Take a look at the updated SIIMS overview and statistics.
            </Text>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md">
            <Calendar
              locale="en-US" // Sets the week to start on Sunday
              className="shadow-lg rounded-lg border w-full"
            />
          </div>
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
              {/* Total Students */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center gap-2">
                  <Users size={30} className="text-indigo-600" />
                  <Text className="font-semibold text-gray-800">
                    Total Students
                  </Text>
                </div>
                <Text className="text-2xl font-bold text-gray-900">
                  {details.total_students}
                </Text>
              </div>

              {/* Total Companies */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center gap-2">
                  <Building2 size={24} className="text-teal-600" />
                  <Text className="font-semibold text-gray-800">
                    Total Companies
                  </Text>
                </div>
                <Text className="text-2xl font-bold text-gray-900">
                  {details.total_companies}
                </Text>
              </div>

              {/* Total Deans */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center gap-2">
                  <SquareUserRound size={30} className="text-purple-600" />
                  <Text className="font-semibold text-gray-800">
                    Total Deans
                  </Text>
                </div>
                <Text className="text-2xl font-bold text-gray-900">
                  {details.total_deans}
                </Text>
              </div>

              {/* Total Supervisors */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center gap-2">
                  <UserPen size={30} className="text-orange-600" />
                  <Text className="font-semibold text-gray-800">
                    Total Supervisors
                  </Text>
                </div>
                <Text className="text-2xl font-bold text-gray-900">
                  {details.total_supervisors}
                </Text>
              </div>

              {/* Total Coordinators */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center gap-2">
                  <UserRoundCheck size={30} className="text-green-600" />
                  <Text className="font-semibold text-gray-800">
                    Total Coordinators
                  </Text>
                </div>
                <Text className="text-2xl font-bold text-gray-900">
                  {details.total_coordinators}
                </Text>
              </div>
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

export default HomeRemotePage;
