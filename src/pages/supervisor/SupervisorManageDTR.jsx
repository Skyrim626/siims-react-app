import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SupervisorManageDTR = () => {
  const navigate = useNavigate();

  // Trainee Info
  const traineeInfo = {
    name: "John Doe",
    department: "Software Development",
    totalRequiredHours: 486,
  };

  // Sample DTR Entries
  const [dtrEntries, setDTREntries] = useState([
    { id: 1, date: "2024-11-01", timeIn: "08:00 AM", timeOut: "05:00 PM", hours: 8, status: "Pending" },
    { id: 2, date: "2024-11-02", timeIn: "08:30 AM", timeOut: "04:30 PM", hours: 7.5, status: "Pending" },
    { id: 3, date: "2024-10-15", timeIn: "08:00 AM", timeOut: "05:00 PM", hours: 8, status: "Pending" },
    { id: 4, date: "2024-10-16", timeIn: "08:30 AM", timeOut: "05:30 PM", hours: 9, status: "Pending" },
  ]);

  const [selectedMonth, setSelectedMonth] = useState("all"); // Default to all

  // Filtered Entries and Total Hours
  const filteredEntries =
    selectedMonth === "all"
      ? dtrEntries
      : dtrEntries.filter(
          (entry) => new Date(entry.date).getMonth() + 1 === parseInt(selectedMonth)
        );
  const totalHours = filteredEntries.reduce((sum, entry) => sum + entry.hours, 0);

  // Handlers
  const handleStatusChange = (id, newStatus) => {
    setDTREntries((prevEntries) =>
      prevEntries.map((entry) => (entry.id === id ? { ...entry, status: newStatus } : entry))
    );
  };

  const handleSave = () => {
    console.log("DTR entries saved:", dtrEntries);
    navigate("/auth/supervisor/trainees");
  };

  const handleCancel = () => {
    navigate("/auth/supervisor/trainees");
  };

  return (
    <div className="p-6">
      {/* Trainee Info */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Daily Time Record</h2>
        <p className="text-gray-700">
          <strong>Name:</strong> {traineeInfo.name}
        </p>
        <p className="text-gray-700">
          <strong>Assigned Department:</strong> {traineeInfo.department}
        </p>
        <p className="text-gray-700">
          <strong>Total Hours Rendered:</strong> {totalHours.toFixed(2)} hours
        </p>
        <p className="text-gray-700">
          <strong>Percentage of Required Hours Completed:</strong>{" "}
          {((totalHours / traineeInfo.totalRequiredHours) * 100).toFixed(2)}%
        </p>
        <p className="text-gray-700">
          <strong>Required Hours:</strong> {traineeInfo.totalRequiredHours} hours
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
        <p className="text-red-600">No entries found for the selected month.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Time In</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Time Out</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Hours</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.timeIn}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.timeOut}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.hours}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{entry.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="outline outline-2 outline-green-500 bg-white text-green-700 px-3 py-1 rounded hover:bg-green-200 transition"
                        onClick={() => handleStatusChange(entry.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="outline outline-2 outline-red-500 bg-white text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
                        onClick={() => handleStatusChange(entry.id, "Rejected")}
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
  );
};

export default SupervisorManageDTR;
