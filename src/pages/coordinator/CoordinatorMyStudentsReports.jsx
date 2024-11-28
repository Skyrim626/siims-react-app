import React, { useState } from "react";
import { FaSearch, FaEye, FaFilter } from "react-icons/fa"; // Import FontAwesome Eye icon
import Page from "../../components/common/Page";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";

/* const students = [
  {
    id: 1,
    studentNo: "20240001",
    name: "John Smith",
    company: "TechSolutionsInc.",
    status: "Ongoing",
  },
  {
    id: 2,
    studentNo: "20240002",
    name: "Jane Doe",
    company: "Google",
    status: "Completed",
  },
  {
    id: 3,
    studentNo: "20240003",
    name: "Michael Douglas",
    company: "Amazon",
    status: "Ongoing",
  },
  {
    id: 4,
    studentNo: "20240004",
    name: "Sarah Connor",
    company: "NASA",
    status: "Completed",
  },
  {
    id: 5,
    studentNo: "20240005",
    name: "Spencer Selover",
    company: "Amazon",
    status: "Ongoing",
  },
  {
    id: 6,
    studentNo: "20240006",
    name: "Chris Evans",
    company: "Marvel Studios",
    status: "Completed",
  },
]; */

const CoordinatorMyStudentsReports = () => {
  // Fetch Data
  const { initial_student_reports } = useLoaderData();
  console.log(initial_student_reports);

  // Container State
  const [students, setStudents] = useState(initial_student_reports || []); // Array of objects but it only has 1 Data for now

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("Ongoing Intern/Immersion"); // State for selected tab
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter students based on search term and current tab
  const filteredStudents = students.filter((student) => {
    const name = student?.name?.toLowerCase() || ""; // Default to empty string if undefined
    const company = student?.company?.toLowerCase() || "";
    const studentNo = student?.studentNo || "";
    return (
      (name.includes(searchTerm.toLowerCase()) ||
        company.includes(searchTerm.toLowerCase()) ||
        studentNo.includes(searchTerm)) &&
      student?.status === currentTab
    );
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNavigation = (action, studentId) => {
    switch (action) {
      case "Evaluation":
        navigate(`${location.pathname}/evaluation/${studentId}`);
        break;
      case "Weekly Accomplishment":
        navigate(`${location.pathname}/weekly-accomplishment/${studentId}`);
        break;
      case "Daily Time Record":
        navigate(`${location.pathname}/daily-time-record/${studentId}`);
        break;
      default:
        break;
    }
  };

  return (
    <Page>
      {students.length > 0 ? (
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              On Job Training
            </h2>
            <p className="text-gray-600">
              Access student daily time records and weekly accomplishment
              reports.
            </p>

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                {/* Tabs for Ongoing and Completed */}
                {["Ongoing Intern/Immersion", "Completed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setCurrentTab(tab);
                      setCurrentPage(1); // Reset to page 1 when switching tabs
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                      currentTab === tab
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2 items-center ml-auto">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by name, company, or student no."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 py-2 w-64 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <FaFilter className="mr-2 text-black" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="px-6 py-3 text-left font-medium">
                    Student No.
                  </th>
                  <th className="px-6 py-3 text-left font-medium">Student</th>
                  <th className="px-6 py-3 text-left font-medium">Company</th>
                  <th className="px-6 py-3 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-t border-gray-200`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.studentNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.company}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() =>
                            handleNavigation("Evaluation", student.id)
                          }
                          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 transition"
                        >
                          <FaEye className="mr-2 text-blue-500" />
                          Evaluation
                        </button>
                        <button
                          onClick={() =>
                            handleNavigation(
                              "Weekly Accomplishment",
                              student.id
                            )
                          }
                          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 transition"
                        >
                          <FaEye className="mr-2 text-white" />
                          Weekly Accomplishment
                        </button>
                        <button
                          onClick={() =>
                            handleNavigation("Daily Time Record", student.id)
                          }
                          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition"
                        >
                          <FaEye className="mr-2 text-white" />
                          Daily Time Record
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {itemsPerPage * (currentPage - 1) + 1} to{" "}
              {Math.min(itemsPerPage * currentPage, filteredStudents.length)} of{" "}
              {filteredStudents.length} entries
            </p>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-md transition ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No student reports available at the moment"
          message="Once activities are recorded, student reports will appear here."
        />
      )}
    </Page>
  );
};

export default CoordinatorMyStudentsReports;
