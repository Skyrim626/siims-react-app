import { Button } from "@headlessui/react";
import { getEndorsementStatusColor } from "../statusColor";
import toFilePath from "../baseURL";
import { Link } from "react-router-dom";

// Endorsement Letter Requests Approval Static Columns
export const getEndorsementRequestsApprovalStaticColumns = ({
  activeTab,
  authorizeRole,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Link
          to={`/auth/${authorizeRole}/students/${params.row.student_id}`}
          className="text-blue-500 underline"
        >
          <span>{params.row.name}</span>
        </Link>
      ),
    },
    {
      field: "program",
      headerName: "Program",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "file_path",
      headerName: "File",
      width: 300,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <a
          href={`${toFilePath(params.row["file_path"])}`}
          className="underline text-blue-500"
          target="_blank"
        >
          {params.row.file_path}
        </a>
      ),
    },
    {
      field: "letter_status_name",
      headerName: "Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const { textColor, backgroundColor } = getEndorsementStatusColor(
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

// Endorsement Letter Requests Approval Action Columns
export const getEndorsementRequestsApprovalActionColumns = ({
  activeTab,
  openModal,
}) => {
  return activeTab.name === "Pending Approval"
    ? {
        field: "actions",
        headerName: "Actions",
        width: 300,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          <div className="flex space-x-2 items-center justify-center">
            <Button
              onClick={() => openModal(params.row)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            >
              Change File
            </Button>

            {/* <Button className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded">
              Mark as Approve
            </Button> */}
          </div>
        ),
        sortable: false, // Prevent sorting for the actions column
        filterable: false, // Prevent filtering for the actions column
      }
    : {};
};
