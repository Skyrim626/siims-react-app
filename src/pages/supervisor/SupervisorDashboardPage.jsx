import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Page from "../../components/common/Page";
import {
  Briefcase,
  UsersRound,
  ClipboardCheck,
  BookText,
  CalendarClock,
  Calendar as CalendarIcon,
} from "lucide-react";

const SupervisorDashboardPage = () => {
  const [supervisorName, setSupervisorName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating an API call or fetching from localStorage
    const fetchedName = "John Doe"; // Replace with actual fetching logic
    setSupervisorName(fetchedName);
  }, []);

  // Sample data for recent interns
  const recentInterns = [
    {
      id: 1,
      name: "Alice Johnson",
      jobTitle: "Web Developer",
      dateUpdated: "2024-11-26",
    },
    {
      id: 2,
      name: "John Smith",
      jobTitle: "UI/UX Designer",
      dateUpdated: "2024-11-25",
    },
    {
      id: 3,
      name: "Emily Davis",
      jobTitle: "Data Analyst",
      dateUpdated: "2024-11-24",
    },
  ];

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

      {/* Welcome Section */}
      <Section className="my-3 flex flex-col items-start">
        <Heading
          level={3}
          text={`Welcome back, ${supervisorName || "Supervisor"}!`}
          className="font-bold text-gray-800 mt-2"
        />
      </Section>

      {/* Statistics Cards */}
      <Section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform duration-200 hover:shadow-xl">
          <Briefcase size={40} className="text-blue-600" />
          <div>
            <Heading level={4} text={"Internships"} className="text-gray-800" />
            <Text className="text-lg font-bold">12</Text>
            <Text className="text-sm px-2 text-gray-600">
              Active Internships
            </Text>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform duration-200 hover:shadow-xl">
          <UsersRound size={40} className="text-blue-600" />
          <div>
            <Heading level={4} text={"Interns"} className="text-gray-800" />
            <Text className="text-lg font-bold">15</Text>
            <Text className="text-sm px-2 text-gray-600">Current Interns</Text>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform duration-200 hover:shadow-xl">
          <CalendarIcon size={40} className="text-blue-600" />
          <div>
            <Heading level={4} text={"Job Posts"} className="text-gray-800" />
            <Text className="text-lg font-bold">5</Text>
            <Text className="text-sm px-2 text-gray-600">Active Job Posts</Text>
          </div>
        </div>
      </Section>

      {/* Recent Interns Report */}
      {/* <Section className="my-6">
        <Heading
          level={4}
          text={"Recent Interns Report"}
          className="text-gray-800 mb-4"
        />
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Job Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date Updated
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recentInterns.map((intern) => (
                <tr key={intern.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {intern.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {intern.jobTitle}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {intern.dateUpdated}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="outline outline-2 outline-sky-800 bg-white text-sky-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-sky-200 transition"
                        onClick={() =>
                          navigate(
                            `/auth/supervisor/dtr/${intern.application_id}`
                          )
                        }
                      >
                        <CalendarClock size={16} className="text-sky-900 " />
                        View DTR
                      </button>
                      <button
                        className="outline outline-2 outline-green-500 bg-white text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-200 transition"
                        onClick={() =>
                          navigate(
                            `/auth/supervisor/weekly-report/${intern.id}`
                          )
                        }
                      >
                        <BookText size={16} className="text-green-700 " />
                        Weekly Reports
                      </button>
                      <button
                        className="outline outline-2 outline-blue-700 text-white bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-300 transition"
                        onClick={() =>
                          alert(
                            `Redirect to evaluation page for ${intern.name}`
                          )
                        }
                      >
                        <ClipboardCheck size={16} className="text-white" />
                        Evaluate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section> */}
    </Page>
  );
};

export default SupervisorDashboardPage;
