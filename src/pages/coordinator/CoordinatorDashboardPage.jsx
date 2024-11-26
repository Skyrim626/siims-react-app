import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom"; // Hook to load route data
import { FaUserGraduate } from "react-icons/fa"; // Importing an icon for total interns

// Import Components
import { Building } from "lucide-react"; // Importing Building icon from lucide-react
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";

const CoordinatorDashboardPage = () => {
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
    { label: "Total Interns", value: totalStudents, color: "blue", icon: <FaUserGraduate size={32} className="text-blue-500" /> },
    { label: "Total Companies", value: totalCompanies, color: "red", icon: <Building size={32} className="text-red-500" /> },
  ];

  return (
    <>
      <div className="bg-blue-600 w-100 rounded-md px-2 py-7">
        <Heading level={3} text={"Welcome, Coordinator! 👋"} textColor="text-white" />
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
                className={`flex flex-col items-center justify-center bg-white shadow-md rounded-lg border-t-4 border-${stat.color}-500 p-4`}
              >
                {/* Icon */}
                <div className="mb-2">{stat.icon}</div>
                {/* Label */}
                <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
                {/* Value */}
                <span className="text-6xl font-bold text-gray-800">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoordinatorDashboardPage;
