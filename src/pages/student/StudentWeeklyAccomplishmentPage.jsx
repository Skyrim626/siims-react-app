import { useState } from "react";
import jsPDF from "jspdf";

const StudentWeeklyAccomplishmentPage = () => {
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [currentWeek, setCurrentWeek] = useState({
    weekNumber: "",
    startDate: "",
    endDate: "",
    hours: "",
    tasks: "",
    learnings: "",
  });
  const [totalHours, setTotalHours] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(""); // For selecting week to export
  const [editingReport, setEditingReport] = useState(null); // Track which report is being edited

  // Group reports by week number
  const groupedReports = weeklyReports.reduce((acc, report) => {
    if (!acc[report.weekNumber]) {
      acc[report.weekNumber] = [];
    }
    acc[report.weekNumber].push(report);
    return acc;
  }, {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWeek({ ...currentWeek, [name]: value });
  };

  const handleWeekSelection = (e) => {
    setSelectedWeek(e.target.value);
  };

  const addReport = () => {
    if (
      currentWeek.startDate &&
      currentWeek.endDate &&
      currentWeek.hours &&
      currentWeek.tasks &&
      currentWeek.learnings
    ) {
      const parsedHours = parseInt(currentWeek.hours, 10);
      if (parsedHours <= 0) {
        alert("Hours must be greater than 0.");
        return;
      }

      setWeeklyReports([...weeklyReports, currentWeek]);
      setTotalHours(totalHours + parsedHours);

      // Reset form fields
      setCurrentWeek({
        weekNumber: "",
        startDate: "",
        endDate: "",
        hours: "",
        tasks: "",
        learnings: "",
      });
    } else {
      alert("Please complete all fields.");
    }
  };

  const editReport = (index) => {
    const reportToEdit = weeklyReports[index];
    setEditingReport(index);
    setCurrentWeek(reportToEdit);
  };

  const saveEditedReport = () => {
    const updatedReports = [...weeklyReports];
    updatedReports[editingReport] = currentWeek;
    setWeeklyReports(updatedReports);
    setTotalHours(
      updatedReports.reduce((sum, report) => sum + parseInt(report.hours, 10), 0)
    );
    setEditingReport(null);
    setCurrentWeek({
      weekNumber: "",
      startDate: "",
      endDate: "",
      hours: "",
      tasks: "",
      learnings: "",
    });
  };

  
  const exportToPDF = () => {
    const doc = new jsPDF({
      format: 'a4', // Set the page size to A4
    });

    const margin = 10;
    const pageWidth = doc.internal.pageSize.width;
  
    const reportsToExport = selectedWeek
      ? groupedReports[selectedWeek]
      : weeklyReports;
  
    if (reportsToExport.length === 0) {
      alert("No reports to export.");
      return;
    }

    // Example of accessing start and end dates from a selected report
    const selectedReport = reportsToExport[selectedWeek];  // Get selected report
    const startDate = selectedReport.startDate;  // Start date of the report
    const endDate = selectedReport.endDate;      // End date of the report

    const periodText = `For the period: ${startDate} to ${endDate}`;

  
    // Left logo properties
    const leftLogo = '/src/assets/images/logo/USTP-Logo-against-Light.png'; // Replace with actual path to left logo
    const leftLogoWidth = 25;
    const leftLogoHeight = 25;

    // Right logo properties
    const rightLogo = '/src/assets/images/logo/CITC_LOGO.png'; // Replace with actual path to right logo
    const rightLogoWidth = 35;
    const rightLogoHeight = 25;
    
    doc.addImage(leftLogo, 'JPEG', margin, margin, leftLogoWidth, leftLogoHeight); // Left logo
    doc.addImage(rightLogo, 'JPEG', pageWidth - margin - rightLogoWidth, margin, rightLogoWidth, rightLogoHeight); // Right logo
  
    // Add the centered text
    const centerText = `
      UNIVERSITY OF SCIENCE AND TECHNOLOGY
      OF SOUTHERN PHILIPPINES
      Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
    `;
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10); // Smaller font size for A4
  
      // Center the text between the logos
    const centerX = pageWidth / 2;
    const centerY = 5 + (leftLogoHeight / 2) ; // Adjust Y position for alignment with logos
    doc.text(centerText, centerX, centerY, { align: "center" });
  
    // Set title and metadata for the PDF
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12); // Smaller font for the A4 title
    doc.text("Weekly Accomplishment Report", margin, margin + leftLogoHeight + 10); // Adjust Y position
    doc.setFontSize(10); // Smaller font size for period
    doc.text(periodText, margin, margin + leftLogoHeight + 15); // Period text below the title

    
    doc.setFontSize(10);
    doc.text("Name: Jane Smith", margin, margin + leftLogoHeight + 20);
    doc.text("Company: Mindanao Tech Solutions", margin, margin + leftLogoHeight + 25);
    doc.text("Unit/Office/Department: IT Department", margin, margin + leftLogoHeight + 30);
  
    // Define the header
    const header = ["Week", "Start Date", "End Date", "Tasks", "Learnings", "Hours"];
  
    // Define the table data
    const tableData = reportsToExport.map(report => [
      report.weekNumber,
      report.startDate,
      report.endDate,
      report.tasks,
      report.learnings,
      report.hours
    ]);
  
    // Table layout using autoTable
    const tableWidth = pageWidth - 2 * margin; // Max width for the table (page width minus margins)
  
    doc.autoTable({
      startY: margin + leftLogoHeight + 40, // Start the table below the metadata
      head: [header],
      body: tableData,
      margin: { top: margin + leftLogoHeight + 40 },
      styles: {
        cellWidth: "auto",
        fontSize: 8, // Smaller font for table on A4
        valign: "middle",
        halign: "center",
        overflow: "linebreak", // This enables text wrapping
      },
      columnStyles: {
        0: { cellWidth: 15 }, // Adjust the width of columns if necessary
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 45 },
        4: { cellWidth: 45 },
        5: { cellWidth: 15 },
      },
      tableWidth: tableWidth, // Limit the width of the table
      didDrawPage: function (data) {
        // Ensure the table fits on the page without overflowing
        const pageHeight = doc.internal.pageSize.height;
        if (data.cursor.y > pageHeight - 30) {
          doc.addPage();
        }
      },
    });
  
    // Save the generated PDF
    doc.save("weekly_accomplishment_report.pdf");
  };
  
  
  
  
  

  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Weekly Accomplishment Report</h1>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-lg font-semibold text-gray-700">Name: Jane Smith</p>
            <p className="text-lg font-semibold text-gray-700">Company: Mindanao Tech Solutions</p>
            <p className="text-lg font-semibold text-gray-700">Unit/Office/Department: IT Department</p>
          </div>
          <div>
            <select
              value={selectedWeek}
              onChange={handleWeekSelection}
              className="border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 px-4 py-2"
            >
              <option value="">Select Week</option>
              {Object.keys(groupedReports).map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
            <button
              onClick={exportToPDF}
              className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600 ml-4"
            >
              Export to PDF
            </button>
          </div>
        </div>
      </div>

      {/* Form to Add/Edit Report */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingReport !== null ? "Edit Weekly Report" : "Add Weekly Report"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Week Number</label>
            <input
              type="number"
              name="weekNumber"
              value={currentWeek.weekNumber}
              onChange={handleChange}
              placeholder="e.g., 1"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={currentWeek.startDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={currentWeek.endDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hours</label>
            <input
              type="number"
              name="hours"
              value={currentWeek.hours}
              onChange={handleChange}
              placeholder=""
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Activities/Tasks</label>
            <textarea
              name="tasks"
              value={currentWeek.tasks}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the activities/tasks for the week"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Learnings</label>
            <textarea
              name="learnings"
              value={currentWeek.learnings}
              onChange={handleChange}
              rows={4}
              placeholder="Summarize your learnings for the week"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <button
          onClick={editingReport !== null ? saveEditedReport : addReport}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          {editingReport !== null ? "Save Changes" : "Add Report"}
        </button>
      </div>

      {/* Weekly Reports Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {Object.keys(groupedReports).length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="border-b px-4 py-2">Week</th>
                <th className="border-b px-4 py-2">Start Date</th>
                <th className="border-b px-4 py-2">End Date</th>
                <th className="border-b px-4 py-2">Tasks</th>
                <th className="border-b px-4 py-2">Learnings</th>
                <th className="border-b px-4 py-2">Hours</th>
                <th className="border-b px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {weeklyReports.map((report, index) => (
                <tr key={index}>
                  <td className="border-b px-4 py-2">Week {report.weekNumber}</td>
                  <td className="border-b px-4 py-2">{report.startDate}</td>
                  <td className="border-b px-4 py-2">{report.endDate}</td>
                  <td className="border-b px-4 py-2">{report.tasks}</td>
                  <td className="border-b px-4 py-2">{report.learnings}</td>
                  <td className="border-b px-4 py-2">{report.hours}</td>
                  <td className="border-b px-4 py-2">
                    <button
                      onClick={() => editReport(index)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reports added yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentWeeklyAccomplishmentPage;
