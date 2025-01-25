import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's default theme styles

const ReportsContainer = ({ authorizeRole }) => {
  const [formData, setFormData] = useState({
    date: "",
    employeeName: "",
    employeeID: "",
    timeInMorning: "",
    timeOutMorning: "",
    timeInAfternoon: "",
    timeOutAfternoon: "",
    overtime: "",
    notes: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Quill editor changes
  const handleEditorChange = (value) => {
    setFormData({
      ...formData,
      notes: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Send formData to your API if needed
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Daily Time Record (DTR)
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Employee Name:</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleInputChange}
              placeholder="Enter employee name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Employee ID:</label>
            <input
              type="text"
              name="employeeID"
              value={formData.employeeID}
              onChange={handleInputChange}
              placeholder="Enter employee ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Time In (Morning):</label>
            <input
              type="time"
              name="timeInMorning"
              value={formData.timeInMorning}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Time Out (Morning):
            </label>
            <input
              type="time"
              name="timeOutMorning"
              value={formData.timeOutMorning}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Time In (Afternoon):
            </label>
            <input
              type="time"
              name="timeInAfternoon"
              value={formData.timeInAfternoon}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Time Out (Afternoon):
            </label>
            <input
              type="time"
              name="timeOutAfternoon"
              value={formData.timeOutAfternoon}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Overtime:</label>
            <input
              type="time"
              name="overtime"
              value={formData.overtime}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Notes / Remarks:</label>
            <ReactQuill
              value={formData.notes}
              onChange={handleEditorChange}
              placeholder="Add your notes or remarks here..."
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>

        {/* Display submitted data */}
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-bold text-lg mb-4">Submitted Data:</h3>
          <pre className="text-sm text-gray-600">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </>
  );
};

export default ReportsContainer;
