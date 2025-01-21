import { Button } from "@headlessui/react";
import StatusWrapper from "../components/StatusWrapper";
import RoleBasedView from "../../../components/common/RoleBasedView";

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
  restoreDocumentType,
  selectedStatus,
}) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div className="flex space-x-2 items-center justify-center">
        <StatusWrapper status={selectedStatus} requiredStatus={"all"}>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            onClick={() => handleEditModal(params.row)}
          >
            Edit
          </Button>

          <RoleBasedView roles={["admin"]} authorizeRole={authorizeRole}>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
              onClick={() => handleDeleteModal(params.row)}
            >
              Delete
            </Button>
          </RoleBasedView>
        </StatusWrapper>

        <StatusWrapper status={selectedStatus} requiredStatus={"archived"}>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
            onClick={() => restoreDocumentType(params.row.id)}
          >
            Restore
          </Button>
        </StatusWrapper>
      </div>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};
