import React, { useMemo, useState } from "react";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import Section from "../components/common/Section";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import { getStudentStatusColor } from "../utils/statusColor";
import { Button } from "@headlessui/react";
import { BookText, CalendarClock, ClipboardCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import getFullName from "../utils/getFullName";
import { getFullAddress } from "../utils/formatAddress";

const ViewActiveStudentsPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Open navigation and location
  const navigate = useNavigate();
  const location = useLocation();

  // Row state
  const [rows, setRows] = useState([]);

  // Static Columns
  const staticColumns = useMemo(() => {
    const columns = [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "first_name",
        headerName: "First name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "middel_name",
        headerName: "Middle name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "last_name",
        headerName: "Last name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "phone_number",
        headerName: "Phone Number",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "student_status",
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
    ];

    return columns;
  }, [authorizeRole]);

  // Action Column
  const actionColumn = useMemo(
    () => ({
      field: "actions",
      headerName: "Actions",
      width: 500,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex space-x-2 items-center justify-center">
          <Button
            onClick={() =>
              navigate(
                `${location.pathname}/applications/${params.row.application_id}/daily-time-records`
              )
            }
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          >
            <CalendarClock size={15} />
            View DTR
          </Button>
          <Button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            onClick={() =>
              navigate(
                `${location.pathname}/applications/${params.row.application_id}/weekly-accomplishment-reports`,
                {
                  state: {
                    firstName: params.row.first_name,
                    middleName: params.row.middle_name,
                    lastName: params.row.last_name,
                  }, // Pass the data as state
                }
              )
            }
          >
            <BookText size={15} />
            View Weekly Reports
          </Button>

          {/* For Coordinator */}
          {authorizeRole === "coordinator" ? (
            // ! Not allowed to view for the coordinator if the student status is not equal to 5 (Completed)
            <Button
              className={`flex items-center gap-2 text-white py-1 px-4 rounded ${
                params.row.student_status_id === 5
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              onClick={() =>
                navigate(
                  `${location.pathname}/applications/${params.row.application_id}/performance-evaluation`
                )
              }
            >
              <ClipboardCheck size={15} className="text-white" />
              Evaluate
            </Button>
          ) : (
            <Button
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              onClick={() =>
                navigate(
                  `${location.pathname}/applications/${params.row.application_id}/performance-evaluation`,
                  {
                    state: {
                      studentName: getFullName(
                        params.row.first_name,
                        params.row.middle_name,
                        params.row.last_name
                      ),
                      officeName: params.row.office_name,
                      jobTitle: params.row.job_title,
                      companyName: params.row.company_name,
                      noOfHours: params.row.no_of_hours,
                      companyFullAddress: getFullAddress({
                        street: params.row.company_street,
                        barangay: params.row.company_barangay,
                        city: params.row.company_city_municipality,
                        province: params.row.company_provice,
                        postalCode: params.row.company_postal_code,
                      }),
                    }, // Pass the data as state
                  }
                )
              }
            >
              <ClipboardCheck size={15} className="text-white" />
              Evaluate
            </Button>
          )}
        </div>
      ),
      sortable: false, // Prevent sorting for the actions column
      filterable: false, // Prevent filtering for the actions column
    }),
    [authorizeRole]
  );

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );
  return (
    <Page>
      <Loader loading={loading} />
      <Section>
        <Heading
          level={3}
          text={
            authorizeRole === "supervisor"
              ? "View Active Trainees"
              : "View Active Students"
          }
        />
        <Text className="text-md text-blue-950">
          {authorizeRole === "supervisor" || authorizeRole === "company"
            ? "This is where you view active trainees' reports."
            : "This is where you view active students' reports."}
        </Text>
        <hr className="my-3" />
      </Section>

      <DynamicDataGrid
        searchPlaceholder={
          authorizeRole === "coordinator"
            ? "Search Students"
            : "Search Trainees"
        }
        rows={rows}
        setRows={setRows}
        columns={columns}
        url={"/users/students/get-active-students"}
      />
    </Page>
  );
};

export default ViewActiveStudentsPage;
