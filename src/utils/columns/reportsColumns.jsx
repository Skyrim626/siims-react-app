import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import { getApplicationStatusColor } from "../statusColor";

// Reports Static Columns
export const getReportsStaticColumns = ({ authorizeRole, pathname }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "student_id",
      headerName: "Student ID",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Link
          to={`/auth/${authorizeRole}/profiles/${params.row.student_id}`}
          className="text-blue-500 underline"
        >
          <span>{params.row.student_id}</span>
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Link
          to={`/auth/${authorizeRole}/profiles/${params.row.student_id}`}
          className="text-blue-500 underline"
        >
          <span>{params.row.name}</span>
        </Link>
      ),
    },
    {
      field: "job_title",
      headerName: "Job Title",
      width: 250,
      headerClassName: "super-app-theme--header",
    },
    ...(authorizeRole === "company" || authorizeRole === "coordinator"
      ? [
          {
            field: "office",
            headerName: "Office",
            width: 150,
            headerClassName: "super-app-theme--header",
          },
        ]
      : []),
    ...(authorizeRole === "coordinator"
      ? [
          {
            field: "company",
            headerName: "Company",
            width: 200,
            headerClassName: "super-app-theme--header",
          },
        ]
      : []),
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    ...(authorizeRole === "company" || authorizeRole === "coordinator"
      ? [
          {
            field: "supervisor",
            headerName: "Assigned Supervisor",
            width: 250,
            headerClassName: "super-app-theme--header",
          },
        ]
      : []),
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const { textColor, backgroundColor } = getApplicationStatusColor(
          params.value
        );

        return (
          <div
            className={`${textColor} ${backgroundColor} flex items-center justify-center rounded-full`}
          >
            {params.value}
          </div>
        );
      },
    },
  ];

  return columns;
};

// Reports Action Columns
export const getReportsActionColumns = ({
  authorizeRole,
  navigateToApplication,
  navigateToDtr,
  navigateToWar,
  navigateToEvaluation,
  activeTab,
}) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 600,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div className="flex space-x-2 items-center justify-center">
        {activeTab.name === "Active" && (
          <>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              onClick={() =>
                navigateToDtr({
                  id: params.row.id,
                })
              }
            >
              View DTR
            </Button>

            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              onClick={() => navigateToWar(params)}
            >
              View WAR
            </Button>

            {authorizeRole === "supervisor" && (
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                onClick={() => navigateToEvaluation(params)}
              >
                Evaluate
              </Button>
            )}
          </>
        )}

        {activeTab.name === "Completed" && (
          <>
            {params.row.reports &&
              params.row.reports.map((report) => {
                return (
                  <a
                    key={report.id}
                    href={`${report.file_path}`}
                    target="_blank"
                    className="flex"
                  >
                    <Button
                      className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-1 rounded"
                      onClick={() => {}}
                    >
                      {report.name}
                    </Button>
                  </a>
                );
              })}
          </>
        )}
      </div>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};
