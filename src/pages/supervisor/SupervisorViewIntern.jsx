import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData, useLocation } from "react-router-dom";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import { ClipboardCheck, BookText, CalendarClock } from "lucide-react";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

const SupervisorViewInterns = () => {
  // Fetch User Data
  const { initial_interns } = useLoaderData();

  // Location and Navigate
  const navigate = useNavigate();
  const location = useLocation();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Mock data for interns (transformed format)
  const [interns, setInterns] = useState(initial_interns);

  console.log(interns);

  return (
    <div>
      <Loader loading={loading} />

      {interns.length > 0 ? (
        <Section className="m-6">
          <h2 className="font-medium text-xl text-black">Trainee list</h2>
          <Text className="text-sm text-gray-600 mb-8">
            Below is the list of trainees under your supervision. Click the
            buttons to view their records or evaluate them.
          </Text>
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Course
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {interns.map((intern) => (
                  <tr key={intern.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {intern.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {intern.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {intern.course}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {intern.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        {/* DTR Button */}
                        <button
                          className="outline outline-2 outline-sky-800 bg-white text-sky-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-sky-200 transition"
                          onClick={() =>
                            navigate(
                              `${location.pathname}/daily-time-records/${intern.application_id}`
                            )
                          }
                        >
                          <CalendarClock size={16} className="text-sky-900" />
                          View DTR
                        </button>

                        {/* Weekly Reports Button */}
                        <button
                          className="outline outline-2 outline-green-500 bg-white text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-200 transition"
                          onClick={() =>
                            navigate(
                              `${location.pathname}/weekly-accomplishment-reports/${intern.application_id}`
                            )
                          }
                        >
                          <BookText size={16} className="text-green-700" />
                          Weekly Reports
                        </button>

                        {/* Evaluate Button */}
                        <button
                          className="outline outline-2 outline-blue-700 text-white bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-300 transition"
                          onClick={() => navigate(`/evaluate/${intern.id}`)}
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
        </Section>
      ) : (
        <EmptyState
          title="No interns available at the moment"
          message="Once activities are recorded, interns will appear here."
        />
      )}
    </div>
  );
};

export default SupervisorViewInterns;
