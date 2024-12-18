import React, { useMemo, useState } from "react";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";

const ViewUsersPage = () => {
  // Row state
  const [rows, setRows] = useState([]);

  // Static Columns
  const staticColumns = useMemo(
    () => [
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
        field: "roles",
        headerName: "Roles",
        width: 300,
        // Custom rendering for the roles array
        renderCell: (params) => {
          return params.row.roles.map((role) => role.name).join(", ");
        },
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
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "updated_at",
        headerName: "Updated At",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "deleted_at",
        headerName: "Deleted At",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
    ],
    []
  );

  const columns = useMemo(() => [...staticColumns], [staticColumns]);

  return (
    <>
      <div className="mt-3">
        <DynamicDataGrid
          searchPlaceholder={"Search Users"}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={"/users"}
          pageSizeOptions={[5, 10, 15, 30, 50]}
          checkboxSelection={false}
        />
      </div>
    </>
  );
};

export default ViewUsersPage;
