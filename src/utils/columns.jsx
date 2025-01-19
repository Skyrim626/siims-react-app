import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  getEndorsementStatusColor,
  getStudentStatusColor,
} from "./statusColor";
import toFilePath from "./baseURL";

// Endorsement Letter Requests Static Columns
export const getEndorsementRequestsStaticColumns = ({
  pathname,
  studentPathname,
  activeTab,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if (activeTab.name === "All") {
          return (
            <Link
              to={`${pathname}/view/${params.row.id}`}
              className="text-blue-500 underline"
            >
              <span>{params.row.id}</span>
            </Link>
          );
        } else if (activeTab.name === "Pending") {
          return (
            <Link
              to={`${pathname}/${params.row.id}`}
              className="text-blue-500 underline"
            >
              <span>{params.row.id}</span>
            </Link>
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
    {
      field: "description",
      headerName: "Description",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "job_title",
      headerName: "Job",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "endorse_students_count",
      headerName: "Total Endorse Students",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "file_path",
      headerName: "File",
      width: 300,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <a
          href={`${toFilePath(params.row["file_path"])}`}
          className="underline text-blue-500"
          target="_blank"
        >
          {params.row.file_path}
        </a>
      ),
    },
    {
      field: "letter_status_name",
      headerName: "Status",
      width: 150,
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
      field: "remarks",
      headerName: "Remarks",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
  ];

  return columns;
};

// Endorsement Letter Requests Action Columns
export const getEndorsementRequestsActionColumns = ({
  pathname,
  activeTab,
}) => {
  return activeTab.name === "Pending"
    ? {
        field: "actions",
        headerName: "Actions",
        width: 200,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          <div className="flex space-x-2 items-center justify-center">
            <Link
              to={`${pathname}/${params.id}`}
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
            >
              View
            </Link>
          </div>
        ),
        sortable: false, // Prevent sorting for the actions column
        filterable: false, // Prevent filtering for the actions column
      }
    : {};
};

// Dean Static Columns
export const getDeanStaticColumns = ({ pathname }) => {
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
      field: "email",
      headerName: "Email",
      width: 250,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "college_name",
      headerName: "College Assigned",
      width: 300,
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
    {
      field: "deleted_at",
      headerName: "Deleted At",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
  ];

  return columns;
};

// Dean Action Columns
export const getDeanActionColumns = (handleEditModal, handleDeleteModal) => {
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

// Chairperson Static Columns
export const getChairpersonStaticColumns = ({ pathname, selectedStatus }) => {
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
      field: "program",
      headerName: "Program Assigned",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "college",
      headerName: "College",
      width: 300,
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

// Chairperson Action Columns
export const getChairpersonActionColumns = ({
  handleEditModal,
  handleDeleteModal,
  selectedStatus,
  handleRestore,
}) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div className="flex space-x-2 items-center justify-center">
        {selectedStatus === "archived" && (
          <Button
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
            onClick={() => handleRestore(params.row.id)}
          >
            Restore
          </Button>
        )}

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
      </div>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};

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
      width: 150,
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
export const getStudentActionColumns = (
  authorizeRole,
  handleEditModal,
  handleDeleteModal,
  activeTab = {}
) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div className="flex space-x-2 items-center justify-center">
        {!(activeTab.name === "Pending Approval") && (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            onClick={() => handleEditModal(params.row)}
          >
            Edit
          </Button>
        )}

        {authorizeRole !== "chairperson" &&
          authorizeRole === "coordinator" &&
          activeTab.name === "Pending Approval" && (
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              onClick={() => handleEditModal(params.row)}
            >
              View Applications
            </Button>
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

// Office Static Columns
export const getOfficeStaticColumns = ({ pathname }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
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
      field: "office_type",
      headerName: "Office Type",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 350,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "total_work_posts",
      headerName: "Total Job Posts",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "supervisor_name",
      headerName: "Supervisor",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        console.log(params.row);

        return (
          <Link
            to={`${pathname}/${params.row.supervisor_id}`}
            className="text-blue-500 hover:underline"
          >
            <span>{params.row.supervisor_name}</span>
          </Link>
        );
      },
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
    {
      field: "deleted_at",
      headerName: "Deleted At",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
  ];

  return columns;
};

// Office Action Columns
export const getOfficeActionColumns = ({ handleDeleteModal, pathname }) => {
  return {
    field: "actions",
    headerName: "Actions",
    width: 200,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div className="flex space-x-2 items-center justify-center">
        <Link
          to={`${pathname}/edit-office/${params.row.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
        >
          Edit
        </Link>

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
