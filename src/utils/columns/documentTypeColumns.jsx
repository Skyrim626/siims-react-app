import { Button } from "@headlessui/react";

// Document Type Static Columns
export const getDocumentTypeStaticColumns = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Document Type",
      width: 300,
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
    {
      field: "deleted_at",
      headerName: "Deleted At",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
  ];

  return columns;
};

// Document Type Action Columns
export const getDocumentTypeActionColumns = ({
  handleEditModal,
  handleDeleteModal,
  authorizeRole,
}) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div className="flex space-x-2 items-center justify-center">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          onClick={() => handleEditModal(params.row)}
        >
          Edit
        </Button>

        {/* Delete is only allowed for Admin */}
        {authorizeRole === "admin" && (
          <Button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
            onClick={() => handleDeleteModal(params.row)}
          >
            Delete
          </Button>
        )}
      </div>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};
