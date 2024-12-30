import { Link } from "react-router-dom";
import { getStudentStatusColor } from "../statusColor";
import { Button } from "@headlessui/react";

// Student Static Columns
export const getStudentStaticColumns = ({ authorizeRole, pathname }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Link
          to={`${pathname}/${params.row.id}`}
          className="text-blue-500 hover:underline"
        >
          <span>{params.row.id}</span>
        </Link>
      ),
    },

    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "middle_name",
      headerName: "Middle Name",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status_name",
      headerName: "Status",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const { textColor, backgroundColor } = getStudentStatusColor(
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
    {
      field: "coordinator",
      headerName: "Coordinator",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    // ! Only add the program_name column if the role is admin or dean
    ...(authorizeRole === "admin" || authorizeRole === "dean"
      ? [
          {
            field: "program_name",
            headerName: "Program",
            width: 350,
            headerClassName: "super-app-theme--header",
          },
        ]
      : []),

    //  ! Only add the email_verified_at column if the role is admin
    ...(authorizeRole === "admin"
      ? [
          {
            field: "college",
            headerName: "College",
            width: 350,
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
    ...(authorizeRole === "admin" ||
    authorizeRole === "dean" ||
    authorizeRole === "chairperson"
      ? [
          {
            field: "email_verified_at",
            headerName: "Email Verified At",
            width: 250,
            headerClassName: "super-app-theme--header",
          },
        ]
      : []),

    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "street",
      headerName: "Street",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "barangay",
      headerName: "Barangay",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "city_municipality",
      headerName: "City/Municipality",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "province",
      headerName: "Province",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "postal_code",
      headerName: "Postal Code",
      width: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
  ];

  // ! FOR ADMIN
  if (authorizeRole === "admin") {
    columns.push({
      field: "deleted_at",
      headerName: "Deleted At",
      width: 300,
      headerClassName: "super-app-theme--header",
    });
  }

  return columns;
};

// Student Action Columns
export const getStudentActionColumns = ({
  authorizeRole,
  handleEditModal,
  handleDeleteModal,
  activeTab = {},
  pathname = "",
}) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 400,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div className="flex space-x-2 items-center justify-center">
        {authorizeRole === "admin" && (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            onClick={() => handleEditModal(params.row)}
          >
            Edit
          </Button>
        )}

        {authorizeRole === "coordinator" &&
          params.row.latest_application_id && (
            <>
              {/* <Link>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                onClick={() => handleEditModal(params.row)}
              >
                View Applications
              </Button>
            </Link> */}
              <Link
                to={`${pathname}/applications/${params.row.latest_application_id}`}
              >
                <Button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
                  View Latest Application
                </Button>
              </Link>
            </>
          )}

        {authorizeRole === "admin" &&
          (params.row.deleted_at ? (
            <Button
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
              onClick={() => console.log("Restored")}
            >
              Restore
            </Button>
          ) : (
            <Button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
              onClick={() => handleDeleteModal(params.row)}
            >
              Delete
            </Button>
          ))}
      </div>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};
