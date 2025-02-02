import { Button } from "@headlessui/react";
import { getStudentStatusColor } from "../../../utils/statusColor";

// Student Static Columns
export const getStudentStaticColumns = ({
  authorizeRole,
  selectedSection,
  openStudentInfoModal,
}) => {
  // console.log(selectedSection);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <Button
            onClick={() => openStudentInfoModal(params.row)}
            className="text-blue-500 hover:underline"
          >
            {params.row.id}
          </Button>
        </>
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
      field: "has_requested_endorsement",
      headerName: "Has Requested",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <div className="text-center">
              {params.row.has_requested_endorsement === "Requested" ? (
                <span className="bg-green-100 text-green-600 px-5 py-4 rounded-full">
                  Requested
                </span>
              ) : (
                <span className="bg-gray-600 text-gray-100 px-3 py-3 rounded-full">
                  Not yet
                </span>
              )}
            </div>
          </>
        );
      },
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
export const getStudentActionColumns = ({ authorizeRole }) => {
  return {};
};
