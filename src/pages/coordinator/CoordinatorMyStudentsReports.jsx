import React from "react";
import { FaSearch, FaEye, FaFilter } from "react-icons/fa"; // Import FontAwesome Eye icon
import Page from "../../components/common/Page";

const students = [
  { id: 1, name: "John Smith", company: "TechSolutionsInc." },
  { id: 2, name: "Jane Doe", company: "Google" },
  { id: 3, name: "Michael Douglas", company: "Amazon" },
  { id: 4, name: "Sarah Connor", company: "NASA" },
  { id: 5, name: "Spencer Selover", company: "Amazon" },
];

const CoordinatorMyStudentsReports = () => {
  const handleButtonClick = (action, studentName) => {
    console.log(`${action} clicked for ${studentName}`);
  };

  return (
    <Page>
      <div className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            On Job Training
          </h2>
          <p className="text-gray-600">
            Access student daily time records and weekly accomplishment reports.
          </p>

          {/* Search and Filters */}
          <div className="flex justify-between items-center">
            {/* Empty space to keep the title aligned on the left */}
            <div></div>

            {/* Search and Filters section */}
            <div className="flex space-x-2 items-center ml-auto">
              {/* Search Input */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search something..."
                  className="pl-10 pr-4 py-2 w-64 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filters Button */}
              <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FaFilter className="mr-2 text-black" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="px-6 py-3 text-left font-medium">Student</th>
                <th className="px-6 py-3 text-left font-medium">Company</th>
                <th className="px-6 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-t border-gray-200`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {student.company}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {/* Buttons Container */}
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() =>
                          handleButtonClick("Evaluation", student.name)
                        }
                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 transition"
                      >
                        <FaEye className="mr-2 text-blue-500" />
                        Evaluation
                      </button>
                      <button
                        onClick={() =>
                          handleButtonClick(
                            "Weekly Accomplishment",
                            student.name
                          )
                        }
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 transition"
                      >
                        <FaEye className="mr-2 text-white" />
                        Weekly Accomplishment
                      </button>
                      <button
                        onClick={() =>
                          handleButtonClick("Daily Time Record", student.name)
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

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing 1 to {students.length} of 57 entries
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              1
            </button>
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
              2
            </button>
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
              3
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CoordinatorMyStudentsReports;
