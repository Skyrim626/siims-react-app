import { Link } from "react-router-dom";
import { getApplicationStatusColor } from "../statusColor";
import toFilePath from "../baseURL";
import { Button } from "@headlessui/react";

// Applicants Static Columns
export const getApplicantsStaticColumns = ({
  activeTab,
  authorizeRole,
  pathname,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Link
          to={`${pathname}/${params.row.id}`}
          className="text-blue-500 underline"
        >
          <span>{params.row.id}</span>
        </Link>
      ),
    },
    {
      field: "office",
      headerName: "Office",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "job_title",
      headerName: "Job Title",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        // ! IF OSA DO NOT LINK
        if (authorizeRole === "osa") {
          return <span>{params.row.name}</span>;
        } else {
          return (
            <Link
              to={`/auth/${authorizeRole}/profiles/${params.row.student_id}`}
              className="text-blue-500 underline"
            >
              <span>{params.row.name}</span>
            </Link>
          );
        }
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone_number",
      headerName: "Phone_number",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    /* {
      field: "file_path",
      headerName: "File",
      width: 300,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        console.log(params.row.documents);

        return (
          <div>
            {params.row.documents.map((document) => {
              return (
                <p key={document.id}>
                  <a
                    href={`${toFilePath(document["file_path"])}`}
                    className="underline text-blue-500"
                    target="_blank"
                  >
                    {document.name}
                  </a>
                </p>
              );
            })}
          </div>
        );
      },
    }, */
    {
      field: "applied_at",
      headerName: "Date Applied",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
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

// Applicants Action Columns
export const getApplicantsActionColumns = ({ pathname }) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <Link to={`${pathname}/${params.row.id}`}>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
          View Application
        </Button>
      </Link>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};
