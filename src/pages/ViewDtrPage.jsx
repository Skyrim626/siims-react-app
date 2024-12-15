import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import Section from "../components/common/Section";
import Text from "../components/common/Text";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import Heading from "../components/common/Heading";
import { Button, Select } from "@headlessui/react";
import { getTimeRecordStatusColor } from "../utils/statusColor";
import { HelpCircle } from "lucide-react";
import { getRequest } from "../api/apiHelpers";
import { formatDateOnly } from "../utils/formatDate";
import useRequest from "../hooks/useRequest";
const ViewDtrPage = ({ authorizeRole }) => {
  // Get params ID
  const { id } = useParams();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State
  const [dailyTimeRecordStatusesLists, setDailyTimeRecordStatusesLists] =
    useState([]);

  // Row state
  const [rows, setRows] = useState([]);

  /**
   * Use Request
   */
  const { putData } = useRequest({
    setData: setRows,
    setLoading: setLoading,
  });

  /**
   * Use Effect
   */
  useEffect(() => {
    const fetchDailyTimeRecordStatusesList = async () => {
      // Set Loading State
      setLoading(true);

      try {
        const fetchDailyTimeRecordStatusesListResponse = await getRequest({
          url: "/api/v1/statuses/daily-time-record-status-lists",
        });

        if (fetchDailyTimeRecordStatusesListResponse) {
          setDailyTimeRecordStatusesLists(
            fetchDailyTimeRecordStatusesListResponse
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Call Method
    fetchDailyTimeRecordStatusesList();
  }, []);

  /**
   * Function that change the status of Daily Time Record
   */
  const handleDailyTimeRecordStatusChange = (e, params) => {
    const newStatus = e.target.value;
    // console.log(`Selected status for ${params.row.id}: ${newStatus}`);

    // PUT METHOD
    putData({
      url: `/daily-time-records/${params.row.id}/mark-status`,
      payload: {
        status_id: newStatus,
      },
      selectedData: params.row,
    });

    // Optionally, you can make an API call to update the status on the server
    // await updateStatusOnServer(params.row.id, newStatus);
  };

  //  TODO: Handle Question Mark Button Click
  const handleQuestionMarkClick = () => {
    console.log("Question mark clicked! Display info modal.");
    // Place your modal logic here
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
        field: "date",
        headerName: "Date",
        width: 150,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
          return formatDateOnly(params.row.date);
        },
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
            params.row.status_name
          );

          return (
            <div
              className={`${textColor} ${backgroundColor} flex items-center justify-center rounded-full`}
            >
              {params.row.status_name}
            </div>
          );
        },
      },
    ];

    return columns;
  }, [authorizeRole]);

  const actionColumn = useMemo(() => {
    if (authorizeRole !== "supervisor") return null; // Exclude the action column if role is not supervisor

    return {
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex space-x-2 items-center justify-center">
          <Select
            className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 shadow-sm focus:ring-indigo-500 h-full focus:border-indigo-500"
            value={params.row.status_id}
            onChange={(e) => handleDailyTimeRecordStatusChange(e, params)}
          >
            <option>--Select Status--</option>
            {dailyTimeRecordStatusesLists.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </Select>
        </div>
      ),
      sortable: false,
      filterable: false,
    };
  }, [authorizeRole, dailyTimeRecordStatusesLists]);

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <div className="flex justify-between items-center">
          <div>
            <Heading level={3} text="View Daily Time Records" />
            <Text className="text-md text-blue-950">
              {authorizeRole === "coordinator"
                ? "This is where you view your student's daily time records."
                : "This is where you view your trainee's daily time records."}
            </Text>
          </div>
          <div>
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
              onClick={handleQuestionMarkClick}
            >
              <HelpCircle size={25} />
            </Button>
          </div>
        </div>
        <hr className="my-3" />
      </Section>

      <DynamicDataGrid
        allowSearch={false}
        rows={rows}
        setRows={setRows}
        columns={columns}
        url={`/applications/${id}/daily-time-records`}
      />
    </Page>
  );
};

export default ViewDtrPage;
