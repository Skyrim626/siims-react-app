import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";

// Company Static Columns
export const getCompanyStaticColumns = ({ pathname, selectedStatus }) => {
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
      field: "company_name",
      headerName: "Company Name",
      width: 450,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "website_url",
      headerName: "Website",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <a
          href={params.value}
          target="_blank"
          className="text-blue-500 underline"
        >
          {params.value}
        </a>
      ),
    },
    {
      field: "total_supervisors",
      headerName: "Total Supervisors",
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
  ];

  if (selectedStatus === "archived") {
    columns.push({
      field: "deleted_at",
      headerName: "Deleted At",
      width: 300,
      headerClassName: "super-app-theme--header",
    });
  }

  return columns;
};

// Company Action Columns
export const getCompanyActionColumns = (
  selectedStatus,
  handleEditModal,
  handleDeleteModal,
  restoreCompany
) => {
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
            onClick={() => restoreCompany(params.row.id)}
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
