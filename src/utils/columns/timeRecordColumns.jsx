import { Button } from "@headlessui/react";
import { getTimeRecordStatusColor } from "../statusColor";

// Time Record Static Columns
export const getTimeRecordStaticColumns = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "time_in",
      headerName: "Time In",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "time_out",
      headerName: "Time Out",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "hours_received",
      headerName: "Hours Received",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status_name",
      headerName: "Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const { textColor, backgroundColor } = getTimeRecordStatusColor(
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

// Time Record Action Columns
export const getTimeRecordActionColumns = ({
  handleEditModal,
  handleDeleteModal,
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

        <Button
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
          onClick={() => handleDeleteModal(params.row)}
        >
          Delete
        </Button>
      </div>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};
