import React from "react";
import { FaUserGraduate, FaBuilding, FaUsers } from "react-icons/fa";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles
import Heading from "../../components/common/Heading";

import "react-calendar/dist/Calendar.css";
import "../../css/Calendar.css";

const CoordinatorDashboardPage = () => {
  const stats = [
    {
      label: "Total Batches",
      value: 15,
      icon: <FaUsers size={40} className="text-blue-500" />,
      borderColor: "border-blue-500",
    },
    {
      label: "Total Students",
      value: 320,
      icon: <FaUserGraduate size={40} className="text-green-500" />,
      borderColor: "border-green-500",
    },
    {
      label: "Total Companies",
      value: 60,
      icon: <FaBuilding size={40} className="text-yellow-500" />,
      borderColor: "border-yellow-500",
    },
  ];

  const handleDateChange = (date) => {
    console.log("Selected date:", date);
  };

  return (
    <>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-full rounded-md px-6 py-8 mb-8 text-white shadow-lg">
        <Heading
          level={3}
          text="Welcome to the SIPP Coordinator Dashboard! 🎉"
          textColor="text-white"
        />
        <p className="text-sm text-blue-200 mt-2">
          Stay updated with real-time statistics and insights.
        </p>
      </div>

      {/* Dashboard Overview */}
      <section className="p-6 bg-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Dashboard Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center bg-white shadow-lg rounded-lg border-t-4 ${stat.borderColor} p-6`}
            >
              <div className="mb-4">{stat.icon}</div>
              <span className="text-gray-500 text-sm font-medium mb-2">
                {stat.label}
              </span>
              <span className="text-2xl font-bold text-gray-800 text-center">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions and Calendar Section */}
      <section className="p-6 mt-8 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Quick Actions & Calendar
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="flex flex-col gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow">
              TBD LINKS
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded shadow">
              TBD LINKS
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded shadow">
              TBD LINKS
            </button>
          </div>

          {/* Calendar */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
              <Calendar
                locale="en-US" // Sets the week to start on Sunday
                className="shadow-lg rounded-lg border w-full"
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoordinatorDashboardPage;
