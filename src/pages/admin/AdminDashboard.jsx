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
import { BookCopy, Building, Building2Icon, Users } from "lucide-react";
import TextBox from "../../components/dashboards/TextBox";

/**
 * AdminDashboard Component
 * This component serves as the main admin dashboard, providing an overview of system statistics
 * and a welcome message to the admin user. The data is loaded using React Router's useLoaderData hook.
 */
export default function AdminDashboard() {
  // Load data for the dashboard (e.g., system statistics, user counts)
  const data = useLoaderData();

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
              {/* {data.map((item, index) => (
                <TextBox
                  key={index}
                  borderColor={`border-${item.color}-400`} // Dynamic border color based on item color
                  className="bg-white shadow-lg rounded-lg p-6"
                >
              
                  {index === 0 && (
                    <Building2Icon size={30} className="text-yellow-400" />
                  )}
                  {index === 1 && (
                    <BookCopy size={30} className="text-green-400" />
                  )}
                  {index === 2 && <Users size={30} className="text-blue-500" />}
                  {index === 3 && (
                    <Building size={30} className="text-red-500" />
                  )}

                  
                  <Text className="text-lg font-semibold text-gray-800">
                    {item.label}
                  </Text>
                  <Text className="text-3xl font-bold text-gray-900">
                    {item.total}
                  </Text>
                </TextBox>
              ))} */}
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
                    <Building2Icon size={30} />
                    <Text className="font-semibold text-gray-800">Sample</Text>
                  </div>
                  <Text className="text-2xl font-bold text-gray-900">100</Text>
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
