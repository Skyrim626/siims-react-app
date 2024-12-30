import React, { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import getFullName from "../utils/getFullName";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Button } from "@headlessui/react";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import GenerateWeeklyAccomplishmentReport from "../components/letters/GenerateWeeklyAccomplishmentReport";
import Section from "../components/common/Section";
import Text from "../components/common/Text";
import Heading from "../components/common/Heading";
import Page from "../components/common/Page";

const ViewWarPage = ({ authorizeRole }) => {
  // Get id from params
  const { id: applicationId } = useParams();

  // Open location
  const location = useLocation();
  // Safely access the row data
  // const { firstName, middleName, lastName } = location.state;
  const { name } = location.state;

  // Loading State
  const [loading, setLoading] = useState(false);

  // File Name
  const [fileName, setFileName] = useState("weekly-accomplishment-report.pdf");

  // Row State
  const [rows, setRows] = useState([]);

  /**
   * Function that calls the Weekly Report PDF Format
   */
  const callWeeklyReport = () => {
    return <GenerateWeeklyAccomplishmentReport weeklyEntries={rows} />;
  };

  /**
   * Function that views the Weekly Reports PDF
   */
  const viewWeeklyReportPDF = async () => {
    try {
      const document = callWeeklyReport();
      const blob = await pdf(document).toBlob();

      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Static Columns
  const staticColumns = useMemo(() => {
    const columns = [
      {
        field: "id",
        headerName: "ID",
        width: 90,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "week_number",
        headerName: "Week Number",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "start_date",
        headerName: "Start Date",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "end_date",
        headerName: "End Date",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "tasks",
        headerName: "Tasks",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "learnings",
        headerName: "Learnings",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "no_of_hours",
        headerName: "Number of hours",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
    ];

    return columns;
  }, [authorizeRole]);

  const columns = useMemo(() => [...staticColumns], [staticColumns]);

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <div className="flex items-center justify-between">
          <div>
            <Heading level={3} text={"Weekly Accomplishment Reports"} />

            <Text className="text-md text-blue-950">
              This is where you view <span className="font-bold">{name}</span>{" "}
              weekly accomplishment reports.
            </Text>
          </div>

          <div className="flex flex-col justify-end space-y-2">
            <Button
              type="button"
              onClick={viewWeeklyReportPDF}
              className="text-sm gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              View Weekly Reports as PDF
            </Button>

            <div>
              <PDFDownloadLink
                document={callWeeklyReport()}
                fileName={fileName}
              >
                {({ loading }) =>
                  loading ? (
                    <Button className="text-sm flex items-end justify-end gap-2 px-3 py-2 bg-gray-500 cursor-not-allowed text-white rounded">
                      Loading Weekly Report...
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="text-sm flex items-end justify-end gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      Download Weekly Report as PDF
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        </div>

        <hr className="my-3" />
      </Section>

      <DynamicDataGrid
        allowSearch={false}
        rows={rows}
        setRows={setRows}
        columns={columns}
        url={`/${applicationId}/weekly-accomplishment-reports`}
      />
    </Page>
  );
};

export default ViewWarPage;
