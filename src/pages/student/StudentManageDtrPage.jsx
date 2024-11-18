import { useState } from "react";
import jsPDF from "jspdf";

const StudentManageDtrPage = () => {
  const traineeInfo = {
    name: "Daine Ekeya",
    department: "Programming Department",
    supervisor: "Mr. John Doe",
    totalRequiredHours: 486,
    totalHoursRendered: 72,
  };

  const [weeksData, setWeeksData] = useState([
    {
      week: "Week 1",
      records: [
        {
          date: "06/01/2024",
          timeIn: "09:00 AM",
          timeOut: "05:00 PM",
          hours: 8,
          status: "Present",
        },
        {
          date: "06/02/2024",
          timeIn: "09:00 AM",
          timeOut: "05:00 PM",
          hours: 8,
          status: "Present",
        },
      ],
    },
    {
      week: "Week 2",
      records: [
        {
          date: "06/08/2024",
          timeIn: "09:00 AM",
          timeOut: "05:00 PM",
          hours: 8,
          status: "",
        },
        {
          date: "06/09/2024",
          timeIn: "09:00 AM",
          timeOut: "05:00 PM",
          hours: 8,
          status: "",
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWeekName, setNewWeekName] = useState("");
  const [newRecords, setNewRecords] = useState([
    { date: "", timeIn: "", timeOut: "", hours: 0, status: "Present" },
  ]);

  const handleAddWeek = () => {
    const newWeek = {
      week: newWeekName,
      records: newRecords,
    };
    setWeeksData([...weeksData, newWeek]);
    setIsModalOpen(false);
    setNewWeekName("");
    setNewRecords([
      { date: "", timeIn: "", timeOut: "", hours: 0, status: "Present" },
    ]);
  };

  const handleRecordChange = (index, field, value) => {
    const updatedRecords = [...newRecords];
    updatedRecords[index][field] = value;
    setNewRecords(updatedRecords);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Daily Time Record", 105, 15, { align: "center" });

    // Trainee Information Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Trainee Information:", 10, 30);
    doc.line(10, 32, 200, 32); // Line under section title

    doc.text(`Name of Trainee: ${traineeInfo.name}`, 10, 40);
    doc.text(`Assigned Unit Department: ${traineeInfo.department}`, 10, 46);
    doc.text(`Supervisor: ${traineeInfo.supervisor}`, 10, 52);
    doc.text(`Total Required Hours: ${traineeInfo.totalRequiredHours}`, 10, 58);
    doc.text(`Total Hours Rendered: ${traineeInfo.totalHoursRendered}`, 10, 64);

    let yPos = 75; // Start position for weeks

    weeksData.forEach((week, weekIndex) => {
      // Week Header
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${week.week}, 10, yPos`);
      doc.line(10, yPos + 2, 200, yPos + 2); // Line under week header
      yPos += 8;

      // Table Headers
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Date", 12, yPos);
      doc.text("Time In", 50, yPos);
      doc.text("Time Out", 90, yPos);
      doc.text("Hours", 130, yPos);
      doc.text("Status", 160, yPos);
      doc.line(10, yPos + 2, 200, yPos + 2); // Line under headers
      yPos += 6;

      // Table Rows
      doc.setFont("helvetica", "normal");
      week.records.forEach((record) => {
        doc.text(record.date, 12, yPos);
        doc.text(record.timeIn, 50, yPos);
        doc.text(record.timeOut, 90, yPos);
        doc.text(`${record.hours}, 130, yPos`);
        doc.text(record.status || "Not Set", 160, yPos);
        yPos += 6;

        // Handle page overflow
        if (yPos > 280) {
          doc.addPage();
          yPos = 10;
        }
      });
      yPos += 8; // Space between weeks
    });

    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Generated on " + new Date().toLocaleDateString(), 10, 290);

    // Save the PDF
    doc.save("Minimalist_Daily_Time_Record.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Daily Time Record</h2>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md">
            Save
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Download
          </button>
        </div>
      </div>

      {/* User Information */}
      <div className="mb-4 text-sm text-gray-700">
        <p>
          <strong>Name of Trainee:</strong> {traineeInfo.name}
        </p>
        <p>
          <strong>Assigned Unit Department:</strong> {traineeInfo.department}
        </p>
        <p>
          <strong>Supervisor:</strong> {traineeInfo.supervisor}
        </p>
      </div>

      {/* Hours Summary */}
      <div className="flex justify-between mb-6">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700">
            Total Required Hours
          </p>
          <p className="text-2xl font-bold text-gray-800">
            {traineeInfo.totalRequiredHours}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700">
            Total Hours Rendered
          </p>
          <p className="text-2xl font-bold text-red-600">
            {traineeInfo.totalHoursRendered}
          </p>
        </div>
      </div>

      {/* Weeks Container */}
      <div className="space-y-8">
        {weeksData.map((week, weekIndex) => (
          <div key={weekIndex}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {week.week}
            </h3>

            {/* Table */}
            <table className="min-w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time In</th>
                  <th className="px-4 py-2 text-left">Time Out</th>
                  <th className="px-4 py-2 text-left">Hours Recorded</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {week.records.map((record, recordIndex) => (
                  <tr key={recordIndex} className="border-b">
                    <td className="px-4 py-2">{record.date}</td>
                    <td className="px-4 py-2">{record.timeIn}</td>
                    <td className="px-4 py-2">{record.timeOut}</td>
                    <td className="px-4 py-2">{record.hours}</td>
                    <td className="px-4 py-2">
                      {record.status ? (
                        <span
                          className={`px-3 py-1 text-white rounded-full ${
                            record.status === "Present"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {record.status}
                        </span>
                      ) : (
                        <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full">
                          Set Status
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Add Week Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
      >
        + Add Week
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Add New Week</h2>
            <input
              type="text"
              placeholder="Week Name"
              value={newWeekName}
              onChange={(e) => setNewWeekName(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="space-y-2">
              {newRecords.map((record, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="date"
                    value={record.date}
                    onChange={(e) =>
                      handleRecordChange(index, "date", e.target.value)
                    }
                    className="w-1/4 p-2 border rounded"
                  />
                  <input
                    type="time"
                    value={record.timeIn}
                    onChange={(e) =>
                      handleRecordChange(index, "timeIn", e.target.value)
                    }
                    className="w-1/4 p-2 border rounded"
                  />
                  <input
                    type="time"
                    value={record.timeOut}
                    onChange={(e) =>
                      handleRecordChange(index, "timeOut", e.target.value)
                    }
                    className="w-1/4 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Hours"
                    value={record.hours}
                    onChange={(e) =>
                      handleRecordChange(index, "hours", e.target.value)
                    }
                    className="w-1/4 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Status"
                    value={record.status}
                    onChange={(e) =>
                      handleRecordChange(index, "status", e.target.value)
                    }
                    className="w-1/4 p-2 border rounded"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleAddWeek}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Add Week
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManageDtrPage;
