import React, { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import axiosClient from "../../api/axiosClient";
import { putRequest } from "../../api/apiHelpers";

const SupervisorManageDTR = () => {
  // Fetch loader
  const { initial_daily_time_records } = useLoaderData();

  /**
   * Navigate
   */
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Trainee Info
  const traineeInfo = {
    name: "John Doe",
    department: "Software Development",
    totalRequiredHours: 486,
  };

  // Status Mapping (status ID => human-readable value)
  const statusMapping = {
    1: "Pending",
    2: "Approved",
    3: "Rejected",
  };

  const [dtrEntries, setDTREntries] = useState(initial_daily_time_records);

  const [selectedMonth, setSelectedMonth] = useState("all"); // Default to all

  // Filtered Entries and Total Hours
  const filteredEntries =
    selectedMonth === "all"
      ? dtrEntries
      : dtrEntries.filter(
          (entry) =>
            new Date(entry.date).getMonth() + 1 === parseInt(selectedMonth)
        );
  const totalHours = filteredEntries.reduce(
    (sum, entry) => sum + entry.hours,
    0
  );

  // Handlers
  const handleStatusChange = async (id, newStatusId) => {
    // console.log(newStatusId);

    setDTREntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, status: newStatusId } : entry
      )
    );

    // Loading
    setLoading(true);
    // Here, you would send the newStatusId to the backend

    try {
      // console.log(id);
      console.log(newStatusId);

      // Payload
      const payload = {
        status_id: newStatusId,
      };

      // PUT
      const response = await putRequest({
        url: `/api/v1/users/supervisors/interns/daily-time-records/${id}/mark`,
        data: payload,
      });

      if (response) {
        console.log("Success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    console.log("DTR entries saved:", dtrEntries);
    navigate("/auth/supervisor/trainees");
  };

  const handleCancel = () => {
    navigate("/auth/supervisor/trainees");
  };

  return (
    <div>
      <Loader loading={loading} />

      {dtrEntries.length > 0 ? (
        <div className="p-6">
          {/* Trainee Info */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Daily Time Record
            </h2>
            <p className="text-gray-700">
              <strong>Name:</strong> {traineeInfo.name}
            </p>
            <p className="text-gray-700">
              <strong>Assigned Department:</strong> {traineeInfo.department}
            </p>
            <p className="text-gray-700">
              <strong>Total Hours Rendered:</strong> {totalHours.toFixed(2)}{" "}
              hours
            </p>
            <p className="text-gray-700">
              <strong>Percentage of Required Hours Completed:</strong>{" "}
              {((totalHours / traineeInfo.totalRequiredHours) * 100).toFixed(2)}
              %
            </p>
            <p className="text-gray-700">
              <strong>Required Hours:</strong> {traineeInfo.totalRequiredHours}{" "}
              hours
            </p>
          </div>

          {/* Month Filter */}
          <div className="mb-4 mx-2">
            <label className="text-gray-700 mr-2">Filter by Month:</label>
            <select
              className="border border-gray-300 rounded px-2 py-2"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All</option>
              <option value="10">October</option>
              <option value="11">November</option>
            </select>
          </div>

          {/* DTR Table */}
          {filteredEntries.length === 0 ? (
            <p className="text-red-600">
              No entries found for the selected month.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Time In
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Time Out
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Hours
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Status
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {entry.date}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {entry.timeIn}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {entry.timeOut}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {entry.hours}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {/* {statusMapping[entry.status]} */}
                        {entry.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            className="outline outline-2 outline-green-500 bg-white text-green-700 px-3 py-1 rounded hover:bg-green-200 transition"
                            onClick={() => handleStatusChange(entry.id, 2)} // 2 -> Approved
                          >
                            Approve
                          </button>
                          <button
                            className="outline outline-2 outline-red-500 bg-white text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
                            onClick={() => handleStatusChange(entry.id, 3)} // 3 -> Rejected
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No document types available at the moment"
          message="Once activities are recorded, document types will appear here."
        />
      )}
    </div>
  );
};

export default SupervisorManageDTR;
