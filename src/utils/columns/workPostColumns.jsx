import { Button } from "@headlessui/react";

// Work Post Static Columns
export const getWorkPostStaticColumns = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "office_name",
      headerName: "Office",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "work_type",
      headerName: "Type",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "title",
      headerName: "Job Title",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "responsibilities",
      headerName: "Responsibilities",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "qualifications",
      headerName: "Qualifications",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "max_applicants",
      headerName: "Max Applicants",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "work_duration",
      headerName: "Work Duration",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "is_closed",
      headerName: "Status",
      width: 300,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        console.log(params.row.is_closed);

        return params.row.is_closed ? (
          <div className="text-red-600 bg-red-100 text-center">Close</div>
        ) : (
          <div className="text-green-600 bg-green-100 text-center">Open</div>
        );
      },
    },
  ];

  return columns;
};

export const getWorkPostActionColumns = ({ pathname, navigate }) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div className="flex space-x-2 items-center justify-center">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          onClick={() => navigate(`${pathname}/edit/${params.row.id}`)}
        >
          Edit
        </Button>

        <Button
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
          // onClick={() => handleDeleteModal(params.row)}
        >
          Delete
        </Button>
      </div>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};
