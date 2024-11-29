import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { jsPDF } from "jspdf";
import Loader from "../../components/common/Loader";

const SupervisorViewWeeklyReport = () => {
  // Fetch Data
  const { initial_wars } = useLoaderData();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Trainee Info
  const traineeInfo = {
    name: "John Doe",
    department: "Software Development",
    weeksSubmitted: initial_wars.length, // Dynamically set based on data
  };

  // Sample Weekly Accomplishment Reports (This will be updated with the loader data)
  const [weeklyReports] = useState(initial_wars);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for uploading

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title for PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Weekly Accomplishment Reports", 14, 20);

    // Trainee Info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${traineeInfo.name}`, 14, 30);
    doc.text(`Department: ${traineeInfo.department}`, 14, 35);
    doc.text(`Weeks Submitted: ${traineeInfo.weeksSubmitted}`, 14, 40);

    // Adding a space before the table
    doc.text("", 14, 50);

    // Table headers with background color
    const headers = [
      "Start Date",
      "End Date",
      "Tasks",
      "Learnings",
      "No. of Hours",
      "Date Submitted",
    ];

    // Set table header background color
    doc.setFillColor(0, 56, 168); // Blue color for headers
    doc.rect(14, 50, 40, 8, "F");
    doc.rect(54, 50, 40, 8, "F");
    doc.rect(94, 50, 60, 8, "F");
    doc.rect(154, 50, 80, 8, "F");
    doc.rect(234, 50, 30, 8, "F");
    doc.rect(264, 50, 40, 8, "F");

    // Set text color to white for headers
    doc.setTextColor(255, 255, 255);
    headers.forEach((header, idx) => {
      doc.text(header, 14 + idx * 40, 55);
    });

    // Set data row colors and borders
    const rowColor1 = [245, 245, 245]; // Light gray for alternating rows
    const rowColor2 = [255, 255, 255]; // White for alternating rows
    doc.setTextColor(0, 0, 0); // Reset text color to black

    // Set the table data with alternating row colors
    weeklyReports.forEach((report, rowIndex) => {
      const yPosition = 60 + rowIndex * 10;

      // Set alternating row colors
      const fillColor = rowIndex % 2 === 0 ? rowColor1 : rowColor2;
      doc.setFillColor(...fillColor);

      // Add rows with the background color
      doc.rect(14, yPosition, 40, 8, "F");
      doc.rect(54, yPosition, 40, 8, "F");
      doc.rect(94, yPosition, 60, 8, "F");
      doc.rect(154, yPosition, 80, 8, "F");
      doc.rect(234, yPosition, 30, 8, "F");
      doc.rect(264, yPosition, 40, 8, "F");

      // Set text in each cell
      doc.setTextColor(0, 0, 0); // Black text
      doc.text(report.start_date, 14, yPosition + 5);
      doc.text(report.end_date, 54, yPosition + 5);
      doc.text(report.tasks, 94, yPosition + 5);
      doc.text(report.learnings, 154, yPosition + 5);
      doc.text(report.no_of_hours.toString(), 234, yPosition + 5);
      doc.text(report.date_submitted, 264, yPosition + 5);
    });

    // Save the PDF
    doc.save("weekly_accomplishment_reports.pdf");
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    // Add logic here to send the formData via an API request
    console.log("File uploaded:", formData);
    setIsModalOpen(false); // Close modal after upload
  };

  return (
    <div className="p-6">
      <Loader loading={loading} />
      <div>
        {/* Trainee Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Weekly Accomplishment Reports
          </h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {traineeInfo.name}
          </p>
          <p className="text-gray-700">
            <strong>Department:</strong> {traineeInfo.department}
          </p>
          <p className="text-gray-700">
            <strong>Total Weeks Submitted:</strong> {traineeInfo.weeksSubmitted}{" "}
            weeks
          </p>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto mb-6">
          <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white text-lg">
                <th className="border border-gray-300 px-6 py-3 text-left">
                  Start Date
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  End Date
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  Tasks
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  Learnings
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  No. of Hours
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  Date Submitted
                </th>
              </tr>
            </thead>
            <tbody>
              {weeklyReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-6 py-4">
                    {report.start_date}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {report.end_date}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {report.tasks}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {report.learnings}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {report.no_of_hours}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {report.date_submitted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={generatePDF}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Download PDF
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Upload PDF
          </button>
        </div>

        {/* Modal for Upload */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-bold mb-4">
                Upload Weekly Report PDF
              </h3>
              <form>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="mb-4 w-full border px-4 py-2 rounded-lg"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg ml-2 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorViewWeeklyReport;
