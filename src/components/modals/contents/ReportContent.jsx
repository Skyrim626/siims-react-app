import React from "react";
import LatestApplicationDetails from "./details/LatestApplicationDetails";

const ReportContent = ({ latestApplication }) => {
  const reports = [
    {
      id: 1,
      reportType: "Progress Report",
      submitted_at: "2025-01-10",
    },
    {
      id: 2,
      reportType: "Final Report",
      submitted_at: "2025-01-15",
    },
    {
      id: 3,
      reportType: "Incident Report",
      submitted_at: "2025-01-18",
    },
  ];

  // console.log(latestApplication);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {latestApplication && latestApplication.reports.length > 0 ? (
        <>
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            Report Section
          </h2>

          {/* Latest Application Details */}
          <LatestApplicationDetails
            supervisor={latestApplication.work_post.office.supervisor}
            company={latestApplication.work_post.office.company.name}
            office={latestApplication.work_post.office.name}
            workPost={latestApplication.work_post.title}
            workType={latestApplication.work_post.work_type.name}
          />

          {/* Reports Table */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-4">
              Reports
            </h3>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="border border-gray-200 px-4 py-2">ID</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Report Type
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Submitted At
                  </th>
                  <th className="border border-gray-200 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      {report.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {report.reportType}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {report.submitted_at}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleView(report.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="w-full h-52 flex items-center justify-center">
          <p className="text-2xl font-bold text-gray-500">No Reports Yet</p>
        </div>
      )}
    </div>
  );
};

export default ReportContent;
