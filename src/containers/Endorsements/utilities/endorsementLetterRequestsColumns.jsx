import { Link } from "react-router-dom";
import { getEndorsementStatusColor } from "../../../utils/statusColor";
import { Button } from "@headlessui/react";
import getFullName from "../../../utils/getFullName";
import TypeWrapper from "../components/TypeWrapper";

// Static Columns
export const getEndorsementRequestsStaticColumns = ({
  pathname,
  selectedStatus,
  authorizeRole,
  viewEndorsementPage,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if (selectedStatus === "walk-in") {
          return (
            <Button
              onClick={() =>
                viewEndorsementPage(params.row.id, "manual", params.row)
              }
              className="text-blue-500 underline"
            >
              <span>{params.row.id}</span>
            </Button>
          );
        } else {
          return <span>{params.row.id}</span>;
        }
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Link
          to={`/auth/chairperson/students/${params.row.student_id}`}
          className="text-blue-500 underline"
        >
          <span>{params.row.name}</span>
        </Link>
      ),
    },
    /* {
      field: "students",
      headerName: "Students",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if (!params.row.students) {
          return null;
        }

        if (!params.row.students.length === 0) {
          return null;
        }

        return (
          <ul>
            {params.row.students.map((endoStudent, index) => {
              // console.log(endoStudent);

              return <li key={index}>{endoStudent.student.user.first_name}</li>;
            })}
          </ul>
        );
      },
    }, */
    {
      field: "endorse_students_count",
      headerName: "Total Endorse Students",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "letter_status_name",
      headerName: "Status",
      width: 200,
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
    // Conditionally add new field for "walk-in" status
    ...(selectedStatus === "walk-in"
      ? [
          {
            field: "company_name",
            headerName: "Company Name",
            width: 250,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
              <span>{params.row.company_name || "N/A"}</span>
            ),
          },
        ]
      : []),
    ...(selectedStatus === "walk-in"
      ? [
          {
            field: "company_address",
            headerName: "Company Address",
            width: 250,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
              <span>{params.row.company_address || "N/A"}</span>
            ),
          },
        ]
      : []),
    ...(selectedStatus === "walk-in"
      ? [
          {
            field: "recipient_name",
            headerName: "Recipient Name",
            width: 250,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
              <span>{params.row.recipient_name || "N/A"}</span>
            ),
          },
        ]
      : []),
    ...(selectedStatus === "walk-in"
      ? [
          {
            field: "recipient_position",
            headerName: "Recipient Position",
            width: 250,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
              <span>{params.row.recipient_position || "N/A"}</span>
            ),
          },
        ]
      : []),
    ...(selectedStatus === "archived"
      ? [
          {
            field: "deleted_at",
            headerName: "Deleted At",
            width: 250,
            headerClassName: "super-app-theme--header",
          },
        ]
      : []),
  ];

  // Return
  return columns;
};

// Action Columns
export const getEndorsementRequestsActionColumns = ({
  pathname,
  selectedStatus,
  openDeleteModal,
  openRestoreModal,
}) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      // Fallback for missing data
      const rowId = params?.row?.id || "N/A";

      // console.log(selectedStatus);

      return (
        <div className="flex space-x-2 items-center justify-center">
          <Link
            to={`${pathname}/endorsement-requests/${rowId}`}
            className="text-blue-500 underline hidden"
          >
            View
          </Link>

          <TypeWrapper type={selectedStatus} requiredType={"walk-in"}>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
              onClick={() => openDeleteModal(params.row.id)}
            >
              Delete
            </Button>
          </TypeWrapper>

          <TypeWrapper type={selectedStatus} requiredType={"archived"}>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
              onClick={() => openRestoreModal(params.row.id)}
            >
              Restore
            </Button>
          </TypeWrapper>
        </div>
      );
    },
  };
};
