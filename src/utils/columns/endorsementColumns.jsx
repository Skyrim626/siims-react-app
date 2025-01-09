import { getEndorsementStatusColor } from "../statusColor";

// Endorsement Static Columns
export const getEndorsementStaticColumns = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "work_post",
      headerName: "Job Title",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "office",
      headerName: "Office",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "company",
      headerName: "Company",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "file_path",
      headerName: "File",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
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
    {
      field: "created_at",
      headerName: "Requested At",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
  ];

  // Return
  return columns;
};
