import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom"; // Hook to load route data
import { FaUserGraduate, FaBuilding, FaUsers, FaBook } from "react-icons/fa"; // Import icons

// Import Components
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table"; // Import Table component
import Page from "../../components/common/Page";

export default function ChairpersonDashboardPage() {
  // Fetch Data
  const data = useLoaderData(); // Get the data from loader
  const coordinators = useLoaderData();

  // Log the data for debugging
  useEffect(() => {
    console.log("Fetched Coordinators Data:", coordinators);
  }, [coordinators]);

  // Destructure data safely (using default values)
  const totalStudents = data?.dashboard?.totalStudents || 0;
  const totalCompanies = data?.dashboard?.totalCompanies || 0;

  const stats = [
    {
      label: "Total Interns",
      value: totalStudents,
      color: "blue",
      icon: <FaUserGraduate className="text-blue-500" size={32} />,
    },
    {
      label: "Total Companies",
      value: totalCompanies,
      color: "violet",
      icon: <FaBuilding className="text-orange-500" size={32} />,
    },
    {
      label: "Total Coordinators",
      value: 28,
      color: "red",
      icon: <FaUsers className="text-red-500" size={32} />,
    },
    {
      label: "Total Programs",
      value: 28,
      color: "teal",
      icon: <FaBook className="" size={32} />,
    },
  ];

  return (
    <>
      <Page>
        <div className="bg-blue-600 w-100 rounded-md px-2 py-7">
          <Heading
            level={3}
            text={"Welcome, Chairperson! 👋"}
            textColor="text-white"
          />
        </div>

        <section>
          <div className="p-6 bg-gray-100">
            {/* Overview Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 grid-rows-2 p-4 h-[400px] gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center bg-white shadow-md rounded-lg border-t-4 border-${stat.color}-500 p-4`}
                >
                  {/* Icon */}
                  <div className="mb-2">{stat.icon}</div>
                  {/* Label */}
                  <span className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </span>
                  {/* Value */}
                  <span className="text-6xl font-bold text-gray-800">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Coordinators Table Section */}
            <div className="mt-6">
              <Heading level={4} text={"Coordinators"} />
              <Text className="text-sm text-blue-950">
                This section shows the list of coordinators.
              </Text>
              <hr className="my-3" />

              {/* Table for Coordinators */}
              {coordinators && coordinators.length > 0 ? (
                <Table data={coordinators} />
              ) : (
                <p>No coordinators available.</p>
              )}
            </div>
          </div>
        </section>
      </Page>
    </>
  );
}
