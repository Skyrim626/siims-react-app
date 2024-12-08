import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom"; // Hook to load route data
import { FaUserGraduate } from "react-icons/fa"; // Importing an icon for total interns

// Import Components
import { Building, PersonStanding, UserPen } from "lucide-react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table"; // Importing Table component

const OsaDashboardPage = () => {
  // Fetch Data
  const data = useLoaderData(); // Get the data from loader
  const coordinators = useLoaderData(); // Fetch coordinators data

  // Log the data for debugging
  useEffect(() => {
    console.log("Fetched Coordinators Data:", coordinators);
  }, [coordinators]);

  // Destructure data safely (using default values)
  const totalStudents = data?.dashboard?.totalStudents || 0;
  const totalCompanies = data?.dashboard?.totalCompanies || 0;

  const stats = [
    {
      label: "Total Approved Documents",
      value: 193,
      color: "blue",
      icon: <FaUserGraduate />,
    },
    { label: "Pending Reviews", value: 28, color: "green", icon: <Building /> }, // Example icon for Company
  ];

  return (
    <>
      <Page>
        <div className="bg-blue-600 w-100 rounded-md px-2 py-7 mt-5">
          <Heading level={3} text={"Welcome, OSA! 👋"} textColor="text-white" />
        </div>

        <section>
          <div className="p-6 bg-gray-100">
            {/* Overview Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 p-4 h-[400px] gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center gap-2 bg-white rounded-lg border-t-4 px-5 py-8 border-t-${stat.color}-700`}
                >
                  {/* Icon */}
                  <div className="text-4xl mb-2">{stat.icon}</div>
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
          </div>
        </section>
      </Page>
    </>
  );
};

export default OsaDashboardPage;
