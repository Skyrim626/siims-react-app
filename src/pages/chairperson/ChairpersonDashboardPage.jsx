import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom"; // Hook to load route data

// Import Components
import { Building, PersonStanding, UserPen } from "lucide-react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table"; // Import Table component

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
    { label: "Total Interns", value: 193, color: "blue" },
    { label: "Total Company", value: 28, color: "orange" },
    { label: "Total Coordinators", value: 28, color: "red" },
    { label: "Total Programs", value: 28, color: "green" },
  ];

  return (
    <>
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
                className={`flex flex-col items-center justify-center bg-white shadow-md rounded-lg border-t-4 border-t-${stat.color}-500 p-4`}
              >
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
    </>
  );
}
