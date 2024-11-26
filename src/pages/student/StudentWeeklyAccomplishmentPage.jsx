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

  const deleteReport = (index) => {
    const updatedReports = [...weeklyReports];
    const deletedReport = updatedReports.splice(index, 1); // Remove the report at the specified index
    setWeeklyReports(updatedReports);
    setTotalHours(
      updatedReports.reduce((sum, report) => sum + parseInt(report.hours, 10), 0)
    );
    alert(`Report for Week ${deletedReport[0].weekNumber} deleted`);
  };

  const handleWeekSelection = (e) => {
    const selectedWeek = e.target.value;
    setSelectedWeek(selectedWeek);

    // Fetch start and end dates for the selected week dynamically
    if (groupedReports[selectedWeek] && groupedReports[selectedWeek].length > 0) {
      const { startDate, endDate } = groupedReports[selectedWeek][0]; // Assume all reports in a week share the same start and end dates
      setCurrentWeek((prev) => ({ ...prev, startDate, endDate }));
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ format: "a4" });

    const margin = 10;
    const pageWidth = doc.internal.pageSize.width;

    const reportsForWeek = groupedReports[selectedWeek];
    if (!reportsForWeek || reportsForWeek.length === 0) {
      alert("No reports available for the selected week.");
      return;
    }

    // Report Period Text
    const periodText = `For the Period: ${reportsForWeek[0]?.startDate || "N/A"} to ${
      reportsForWeek[reportsForWeek.length - 1]?.endDate || "N/A"
    }`;

    // Add logos and header
    const leftLogo = "/src/assets/images/logo/USTP-Logo-against-Light.png";
    const rightLogo = "/src/assets/images/logo/CITC_LOGO.png";
    doc.addImage(leftLogo, "JPEG", margin, margin, 25, 25);
    doc.addImage(rightLogo, "JPEG", pageWidth - margin - 35, margin, 35, 25);

    const centerText = `
      UNIVERSITY OF SCIENCE AND TECHNOLOGY
      OF SOUTHERN PHILIPPINES
      Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
    `;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(centerText, pageWidth / 2, margin + 15, { align: "center" });

    // Metadata and Title
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Weekly Accomplishment Report", margin, margin + 40);
    doc.setFontSize(10);
    doc.text(periodText, margin, margin + 45);

    doc.text("Name: Jane Smith", margin, margin + 50);
    doc.text("Company: Mindanao Tech Solutions", margin, margin + 55);
    doc.text("Unit/Office/Department: IT Department", margin, margin + 60);

    // Define header and table data
    const header = ["Week", "Start Date", "End Date", "Tasks", "Learnings", "Hours"];
    const tableData = reportsForWeek.map((report) => [
      report.weekNumber,
      report.startDate,
      report.endDate,
      report.tasks,
      report.learnings,
      report.hours,
    ]);

    // Generate table
    doc.autoTable({
      head: [header],
      body: tableData,
      startY: margin + 70,
      margin: { top: margin },
      styles: {
        fontSize: 8,
        valign: "middle",
        halign: "center",
        overflow: "linebreak",
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 45 },
        4: { cellWidth: 45 },
        5: { cellWidth: 15 },
      },
    });

    // Save PDF
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={currentWeek.startDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={currentWeek.endDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hours</label>
            <input
              type="number"
              name="hours"
              value={currentWeek.hours}
              onChange={handleChange}
              placeholder="e.g., 40"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tasks</label>
            <textarea
              name="tasks"
              value={currentWeek.tasks}
              onChange={handleChange}
              placeholder="Tasks completed during the week"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Learnings</label>
            <textarea
              name="learnings"
              value={currentWeek.learnings}
              onChange={handleChange}
              placeholder="What you learned this week"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={editingReport !== null ? saveEditedReport : addReport}
            className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
          >
            {editingReport !== null ? "Save Changes" : "Add Report"}
          </button>
        </div>
      </div>

      {/* Weekly Reports Table */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Week</th>
                <th className="px-4 py-2 text-left border-b">Start Date</th>
                <th className="px-4 py-2 text-left border-b">End Date</th>
                <th className="px-4 py-2 text-left border-b">Tasks</th>
                <th className="px-4 py-2 text-left border-b">Learnings</th>
                <th className="px-4 py-2 text-left border-b">Hours</th>
                <th className="px-4 py-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {weeklyReports.map((report, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{report.weekNumber}</td>
                  <td className="px-4 py-2">{report.startDate}</td>
                  <td className="px-4 py-2">{report.endDate}</td>
                  <td className="px-4 py-2">{report.tasks}</td>
                  <td className="px-4 py-2">{report.learnings}</td>
                  <td className="px-4 py-2">{report.hours}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => editReport(index)}
                      className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteReport(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <p>Total Hours: {totalHours}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentWeeklyAccomplishmentPage;
