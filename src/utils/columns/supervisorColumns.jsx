import { Button } from "@headlessui/react";

// Supervisor Static Columns
export const getSupervisorStaticColumns = ({
  authorizeRole,
  selectedStatus,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "super-app-theme--header",
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
      field: "office",
      headerName: "Office",
      width: 350,
      headerClassName: "super-app-theme--header",
    },

    // ! Only add the company column if the role is admin or dean
    ...(authorizeRole === "admin" || authorizeRole === "dean"
      ? [
          {
            field: "company",
            headerName: "Company",
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
    {
      field: "email_verified_at",
      headerName: "Email Verified At",
      width: 250,
      headerClassName: "super-app-theme--header",
    },
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
    ...(selectedStatus === "archived"
      ? [
          {
            field: "deleted_at",
            headerName: "Deleted At",
            width: 300,
            headerClassName: "super-app-theme--header",
          },
        ]
      : []),
  ];

  return columns;
};

// Supervisor Action Columns
export const getSupervisorActionColumns = ({
  authorizeRole,
  handleEditModal,
  handleDeleteModal,
  selectedStatus,
  restoreSupervisor,
}) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div className="flex space-x-2 items-center justify-center">
        {selectedStatus === "all" && (
          <>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              onClick={() => handleEditModal(params.row)}
            >
              Edit
            </Button>

            <Button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
              onClick={() => handleDeleteModal(params.row)}
            >
              Delete
            </Button>
          </>
        )}

        {selectedStatus === "archived" && (
          <Button
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
            onClick={() => restoreSupervisor(params.row.id)}
          >
            Restore
          </Button>
        )}
      </div>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};
