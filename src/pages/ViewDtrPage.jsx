import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import Section from "../components/common/Section";
import Text from "../components/common/Text";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import Heading from "../components/common/Heading";
import { Button, Dialog, Select } from "@headlessui/react";
import { getTimeRecordStatusColor } from "../utils/statusColor";
import { HelpCircle, X } from "lucide-react";
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

  // Modal State
  const [isOpen, setIsOpen] = useState(false);

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
    const columns = [];

    // ! For Company and Supervisor Only
    if (authorizeRole === "supervisor" || authorizeRole === "company") {
      columns.push({
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
      });
    } // Exclude the action column if role is not supervisor

    return columns;
  }, [authorizeRole, dailyTimeRecordStatusesLists]);

  const columns = useMemo(() => {
    return authorizeRole === "supervisor" || authorizeRole === "company"
      ? [...staticColumns, ...actionColumn]
      : staticColumns; // Do not append actionColumn if not a supervisor
  }, [authorizeRole, staticColumns, actionColumn]);

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
              onClick={() => setIsOpen(!isOpen)}
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

      {/* Status List Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Centered container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* Modal Panel */}
          <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <Dialog.Title className=" text-lg font-semibold text-gray-800">
                Time Record Status Descriptions
              </Dialog.Title>
              <Button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" /> {/* Lucide close icon */}
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {dailyTimeRecordStatusesLists.map((status, index) => {
                const { textColor, backgroundColor } = getTimeRecordStatusColor(
                  status.name
                );

                return (
                  <div
                    key={index}
                    className="rounded-lg p-4 border border-gray-200 bg-gray-50"
                  >
                    <h3
                      className={`rounded-full px-3 text-base font-semibold ${textColor} ${backgroundColor}`}
                    >
                      {status.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {status.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-200 p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Page>
  );
};

export default ViewDtrPage;
