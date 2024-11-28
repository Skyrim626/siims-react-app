import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Text from "../../components/common/Text";
import "jspdf-autotable"; // Make sure this is imported for autoTable support
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { deleteRequest, postRequest, putRequest } from "../../api/apiHelpers";
import Loader from "../../components/common/Loader";
import { Button } from "@headlessui/react";

const StudentManageDtrPage = () => {
  // Fetch Data
  const { applicationId } = useParams();

  // Loading State
  const [loading, setLoading] = useState(false);

  // console.log(applicationId);
  const { status, dtrEntries } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the student is applicable to access this page
  if (![4, 12].includes(status)) {
    navigate("/auth/my", {
      replace: true,
    });
  }

  // Daily Time Record State
  const [editRecord, setEditRecord] = useState({
    id: null,
    date: "",
    time_in: "",
    time_out: "",
    hours_received: 0,
  });

  const [newRecord, setNewRecord] = useState({
    date: "",
    time_in: "",
    time_out: "",
    hours_received: "",
  });

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sample state for daily time records
  /* const [dailyRecords, setDailyRecords] = useState([
    {
      id: 1,
      date: "2024-11-20",
      time_in: "08:00 AM",
      time_out: "05:00 PM",
      hours_received: 8,
      status: "Completed", // Example status
    },
    {
      id: 2,
      date: "2024-11-21",
      time_in: "09:00 AM",
      time_out: "06:00 PM",
      hours_received: 8,
      status: "Pending", // Example status
    },
  ]); */
  const [dailyRecords, setDailyRecords] = useState(dtrEntries);

  // Function to map status to color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#4CAF50"; // Green
      case "Pending":
        return "#FF9800"; // Orange
      case "Cancelled":
        return "#F44336"; // Red
      default:
        return "#9E9E9E"; // Grey (for unknown statuses)
    }
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    // doc.setFontSize(18);
    // doc.text("Daily Time Record", 14, 20);

    // Table Headers
    doc.setFontSize(12);
    const headers = [
      // "ID",
      "Date",
      "Time In",
      "Time Out",
      "Hours Received",
      // "Status",
    ];
    doc.autoTable({
      startY: 30,
      head: [headers],
      body: dailyRecords.map((record) => [
        // record.id,
        record.date,
        record.time_in,
        record.time_out,
        record.hours_received,
        // Adding the Status with background color
        /* {
          content: record.status,
          styles: {
            cellWidth: "auto", // Allow width to be dynamic based on content
            halign: "center", // Center align the content
            fillColor: getStatusColor(record.status),
            textColor: "#fff", // Text color (white)
            fontSize: 10,
            fontStyle: "normal",
            lineColor: [255, 255, 255], // Line color for the border
            lineWidth: 0.1,
            padding: 2, // Padding for the cell (like p-2 in Tailwind)
            // Creating rounded corners for the status background
            borderRadius: 15,
          },
        }, */
      ]),
    });

    // Save the PDF
    doc.save("daily_time_record.pdf");
  };

  // Open the delete modal and set the selected record for deleting
  const handleDeleteRecord = async (record) => {
    // console.log(record);

    try {
      // DELTE
      const response = await deleteRequest({
        url: `/api/v1/daily-time-records/${applicationId}/${record.id}`,
      });

      // Check response
      if (response) {
        setDailyRecords(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Open the edit modal and set the selected record for editing
  const handleEditRecord = (record) => {
    setEditRecord(record);
    setIsEditModalOpen(true);
  };

  // Update the record in the state
  const handleUpdateRecord = async () => {
    // console.log(editRecord);

    try {
      // Ready payload
      const payload = editRecord;

      // PUT
      const response = await putRequest({
        url: `/api/v1/daily-time-records/${applicationId}/${editRecord.id}`,
        data: payload,
      });

      // Check response
      if (response) {
        setDailyRecords(response.data);
      }
    } catch (errors) {
      console.log(errors);
    }
    setIsEditModalOpen(false);
  };

  // Handle input changes in the edit modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  // Handle input changes for new record form
  const handleNewRecordChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  // Submit new record
  const handleAddNewRecord = async (e) => {
    e.preventDefault();

    // Set Loading
    setLoading(true);
    try {
      // Ready Payload
      const payload = newRecord;

      // POST
      const response = await postRequest({
        url: `/api/v1/daily-time-records/${applicationId}`,
        data: payload,
      });

      // Check if response
      if (response) {
        setDailyRecords(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    // console.log(newRecord);
    setNewRecord({
      date: "",
      time_in: "",
      time_out: "",
      hours_received: "",
    });

    /* const newId = dailyRecords.length + 1;
    setDailyRecords([
      ...dailyRecords,
      {
        ...newRecord,
        id: newId,
        hours_received: parseInt(newRecord.hours_received),
      },
    ]); */
  };

  // Submit PDF to Backend
  const submitPDF = async () => {
    const pdf = generatePDF();
    const pdfBlob = pdf.output("blob"); // Create a Blob from the PDF

    // Prepare the form data
    const formData = new FormData();
    formData.append("file", pdfBlob, "daily_time_record.pdf");
  };

  return (
    <div>
      <Loader loading={loading} />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Daily Time Record
        </h2>

        <div className="flex space-x-3">
          <Button
            onClick={generatePDF}
            className=" transition px-4 py-2 text-white rounded-md  bg-blue-500  hover:bg-blue-600 active:bg-blue-700"
          >
            Download DTR as PDF
          </Button>
          <Button
            className={`transition text-white rounded-md px-4 py-2 ${
              status === 4
                ? "bg-blue-500  hover:bg-blue-600 active:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            disabled={status !== 4}
          >
            Upload DTR
          </Button>
          <Button
            className={`transition text-white rounded-md px-4 py-2 ${
              status === 4
                ? "bg-blue-500  hover:bg-blue-600 active:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Submit DTR
          </Button>
        </div>

        {/* Add New Record Form */}
        <form onSubmit={handleAddNewRecord} className="mb-6">
          <div className="mb-4">
            <label className="block font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={newRecord.date}
              onChange={handleNewRecordChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Time In</label>
            <input
              type="text"
              name="time_in"
              value={newRecord.time_in}
              onChange={handleNewRecordChange}
              placeholder="e.g., 08:00 AM"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Time Out</label>
            <input
              type="text"
              name="time_out"
              value={newRecord.time_out}
              onChange={handleNewRecordChange}
              placeholder="e.g., 05:00 PM"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Hours Received</label>
            <input
              type="number"
              name="hours_received"
              value={newRecord.hours_received}
              onChange={handleNewRecordChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add New Record
          </button>
        </form>

        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time In</th>
              <th className="px-4 py-2 text-left">Time Out</th>
              <th className="px-4 py-2 text-left">Hours Received</th>
              {/*  <th className="px-4 py-2 text-left">Status</th>{" "} */}
              {/* New Status column */}
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {dailyRecords.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="px-4 py-2">{record.date}</td>
                <td className="px-4 py-2">{record.time_in}</td>
                <td className="px-4 py-2">{record.time_out}</td>
                <td className="px-4 py-2">{record.hours_received}</td>
                {/* <td className="px-4 py-2 text-center">
                <Text className="bg-green-500 p-2 rounded-full">
                  {record.status}
                </Text>
              </td> */}

                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEditRecord(record)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRecord(record)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h3 className="text-lg font-bold mb-4">Edit Record</h3>
              <div className="mb-4">
                <label className="block font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={editRecord.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Time In</label>
                <input
                  type="text"
                  name="time_in"
                  value={editRecord.time_in}
                  onChange={handleInputChange}
                  placeholder="e.g., 08:00 AM"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Time Out</label>
                <input
                  type="text"
                  name="time_out"
                  value={editRecord.time_out}
                  onChange={handleInputChange}
                  placeholder="e.g., 05:00 PM"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Hours Received</label>
                <input
                  type="number"
                  name="hours_received"
                  value={editRecord.hours_received}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRecord}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManageDtrPage;
