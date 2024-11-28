import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SupervisorViewWeeklyReport = () => {
  const navigate = useNavigate();

  // Trainee Info
  const traineeInfo = {
    name: "John Doe",
    department: "Software Development",
    weeksSubmitted: 4,
  };

  // Sample Weekly Accomplishment Reports
  const [weeklyReports] = useState([
    { id: 1, week: 1, dateSubmitted: "2024-10-01", activities: "Completed module 1 tasks." },
    { id: 2, week: 2, dateSubmitted: "2024-10-08", activities: "Assisted in testing module 2 features." },
    { id: 3, week: 3, dateSubmitted: "2024-10-15", activities: "Documented API integration process." },
    { id: 4, week: 4, dateSubmitted: "2024-10-22", activities: "Collaborated on debugging session for the system." },
  ]);

  // Handlers
  const handleViewReport = (id) => {
    console.log("Viewing report ID:", id);
    // Navigate to a detailed view of the selected report
    navigate(`/auth/supervisor/trainee/war/${id}`);
  };

  return (
    <div className="p-6">
      {/* Trainee Info */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Weekly Accomplishment Reports</h2>
        <p className="text-gray-700">
          <strong>Name:</strong> {traineeInfo.name}
        </p>
        <p className="text-gray-700">
          <strong>Department:</strong> {traineeInfo.department}
        </p>
        <p className="text-gray-700">
          <strong>Total Weeks Submitted:</strong> {traineeInfo.weeksSubmitted} weeks
        </p>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-4 py-2 text-left">Date Submitted</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Week #</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {weeklyReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{report.dateSubmitted}</td>
                <td className="border border-gray-300 px-4 py-2">Week {report.week}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="outline outline-2 outline-blue-500 bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                    onClick={() => handleViewReport(report.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupervisorViewWeeklyReport;
