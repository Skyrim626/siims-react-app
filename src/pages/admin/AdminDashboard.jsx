// Libraries
import React from "react";
import { useLoaderData } from "react-router-dom"; // Hook to load route data

/**
 * Components
 */
// Common components used throughout the application
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Page from "../../components/common/Page";
import Text from "../../components/common/Text";

// Icons from Lucide
import {
  BookCopy,
  Building,
  Building2Icon,
  Users,
  Building2,
  SquareUserRound,
  UserPen,
  UserRoundCheck,
} from "lucide-react";

/**
 * AdminDashboard Component
 * This component serves as the main admin dashboard, providing an overview of system statistics
 * and a welcome message to the admin user. The data is loaded using React Router's useLoaderData hook.
 */
export default function AdminDashboard() {
  // Load data for the dashboard (e.g., system statistics, user counts)
  const data = useLoaderData();

  // console.log(data);

  return (
    <Page>
      {/* Dashboard Heading Section */}
      <Section className="mb-6">
        <Heading level={3} text="Dashboard" className="text-blue-900" />
        <Text className="text-sm text-gray-600">
          Overview of the system data.
        </Text>
        <hr className="my-3 border-gray-300" />
      </Section>

      {/* Welcome Section */}
      <Section className="mb-8">
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-6">
          <div>
            <Heading
              level={2}
              text="Welcome back, Admin!"
              className="text-gray-900 font-bold"
            />
            <Text className="text-gray-600">
              Take a look at the updated SIIMS overview
            </Text>
          </div>
        </div>
      </Section>

      {/* Statistics Section */}
      <Section>
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-6">
              <div
                className={`flex flex-col justify-center items-center gap-2 bg-white rounded-lg border-t-4 px-5 py-8 border-t-blue-700`}
              >
                <Text className="text-lg font-semibold text-gray-800">
                  Total Colleges
                </Text>
                <Text className="text-3xl font-bold text-gray-900">
                  {data.total_colleges}
                </Text>
              </div>

              <div
                className={`flex flex-col justify-center items-center gap-2 bg-white rounded-lg border-t-4 px-5 py-8 border-t-red-700`}
              >
                <Text className="text-lg font-semibold text-gray-800">
                  Total Offices
                </Text>
                <Text className="text-3xl font-bold text-gray-900">
                  {data.total_offices}
                </Text>
              </div>

              <div
                className={`flex flex-col justify-center items-center gap-2 bg-white rounded-lg border-t-4 px-5 py-8 border-t-yellow-700`}
              >
                <Text className="text-lg font-semibold text-gray-800">
                  Total Jobs
                </Text>
                <Text className="text-3xl font-bold text-gray-900">
                  {data.total_work_posts}
                </Text>
              </div>

              <div
                className={`flex flex-col justify-center items-center gap-2 bg-white rounded-lg border-t-4 px-5 py-8 border-t-green-700`}
              >
                <Text className="text-lg font-semibold text-gray-800">
                  Total Programs
                </Text>
                <Text className="text-3xl font-bold text-gray-900">
                  {data.total_programs}
                </Text>
              </div>
            </div>
          </div>

          {/* Users Overview Section */}
          <div className="col-span-1">
            <Heading
              level={4}
              text="Users"
              className="font-semibold text-gray-800 mb-4"
            />
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <Text className="font-bold text-xl">Total Users</Text>
                <Text className="font-bold text-xl text-gray-900 mb-2">
                  {data.total_users}
                </Text>
              </div>
              <hr className="mb-4 border-gray-300" />
              <div className="space-y-4">
                <div
                  className={`flex items-center justify-between p-4 rounded-lg shadow-md`}
                >
                  <div className="flex items-center gap-2">
                    <Users size={30} />
                    <Text className="font-semibold text-gray-800">
                      Total Students
                    </Text>
                  </div>
                  <Text className="text-2xl font-bold text-gray-900">
                    {data.total_students}
                  </Text>
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg shadow-md`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 size={20} />
                    <Text className="font-semibold text-gray-800">
                      Total Companies
                    </Text>
                  </div>
                  <Text className="text-2xl font-bold text-gray-900">
                    {data.total_companies}
                  </Text>
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg shadow-md`}
                >
                  <div className="flex items-center gap-2">
                    <SquareUserRound size={30} />
                    <Text className="font-semibold text-gray-800">
                      Total Deans
                    </Text>
                  </div>
                  <Text className="text-2xl font-bold text-gray-900">
                    {data.total_deans}
                  </Text>
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg shadow-md`}
                >
                  <div className="flex items-center gap-2">
                    <UserPen size={30} />
                    <Text className="font-semibold text-gray-800">
                      Total Supervisors
                    </Text>
                  </div>
                  <Text className="text-2xl font-bold text-gray-900">
                    {data.total_supervisors}
                  </Text>
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg shadow-md`}
                >
                  <div className="flex items-center gap-2">
                    <UserRoundCheck size={30} />
                    <Text className="font-semibold text-gray-800">
                      Total Coordinators
                    </Text>
                  </div>
                  <Text className="text-2xl font-bold text-gray-900">
                    {data.total_coordinators}
                  </Text>
                </div>
                {/* {["Deans", "Companies", "Chairpersons", "Students"].map(
                  (role, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg shadow-md ${
                        role === "Companies" ? "bg-green-100" : "bg-yellow-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2Icon
                          size={30}
                          className={`text-${
                            role === "Companies" ? "green" : "yellow"
                          }-400`}
                        />
                        <Text className="font-semibold text-gray-800">
                          {role} 
                        </Text>
                      </div>
                      <Text className="text-2xl font-bold text-gray-900">
                        100 
                      </Text>
                    </div>
                  )
                )} */}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
