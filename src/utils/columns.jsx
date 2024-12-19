import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";

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
export const getChairpersonStaticColumns = ({ pathname }) => {
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
    {
      field: "deleted_at",
      headerName: "Deleted At",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
  ];

  return columns;
};

// Chairperson Action Columns
export const getChairpersonActionColumns = (
  handleEditModal,
  handleDeleteModal
) => {
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

// Company Static Columns
export const getCompanyStaticColumns = ({ authorizeRole, pathname }) => {
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
          rel="noopener noreferrer"
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

// Company Action Columns
export const getCompanyActionColumns = (
  authorizeRole,
  handleEditModal,
  handleDeleteModal
) => {
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

// Supervisor Static Columns
export const getSupervisorStaticColumns = (authorizeRole) => {
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

// Supervisor Action Columns
export const getSupervisorActionColumns = (
  authorizeRole,
  handleEditModal,
  handleDeleteModal
) => {
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

        {params.row.deleted_at ? (
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
        )}
      </div>
    ),
    sortable: false, // Prevent sorting for the actions column
    filterable: false, // Prevent filtering for the actions column
  };
};

// Student Static Columns
export const getStudentStaticColumns = (authorizeRole) => {
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
  handleDeleteModal
) => {
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
