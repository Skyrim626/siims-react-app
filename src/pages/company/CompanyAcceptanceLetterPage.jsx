import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import { postFormDataRequest } from "../../api/apiHelpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { stripLocation } from "../../utils/strip";
import { UserPlus, Trash } from "lucide-react";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";

const CompanyAcceptanceLetterPage = () => {
  // Get Params
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Loader State
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    chairmanName: "",
    department: "",
    startDate: "",
    day: "",
    month: "",
    year: "",
    companyAddress: "",
    companyName: "",
    representativeName: "",
    jobTitle: "",
  });
  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Subtract 1 since month numbers are 1-based, but arrays are 0-based.
    return months[monthNumber - 1];
  };

  // Set the day, month, and year to today's date when the component mounts
  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // JavaScript months are 0-indexed (January is 0)
    const year = today.getFullYear();

    const monthName = getMonthName(month);

    setFormData((prevData) => ({
      ...prevData,
      day: day < 10 ? `0${day}` : day, // Add leading zero if day is a single digit
      month: monthName, // Add leading zero if month is a single digit
      year,
    }));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the string to a Date object

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = months[date.getMonth()]; // Get month name
    const day = date.getDate(); // Get the day
    const year = date.getFullYear(); // Get the year

    // Format the date as 'Month Day, Year'
    return `${monthName} ${day}, ${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addStudent = () => {
    setStudents([...students, { name: "", course: "" }]);
  };

  const updateStudent = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const removeStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const generatePDF = () => {
    const {
      chairmanName,
      department,
      startDate,
      day,
      month,
      year,
      companyAddress,
      companyName,
      representativeName,
      jobTitle,
    } = formData;

    const studentDetails = students
      .map(
        (student, index) => `${index + 1}. ${student.name} - ${student.course}`
      )
      .join("\n");

    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const formattedStartDate = formatDate(startDate);

    // Set title and styling
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("REPLY FORM", margin, margin + 10);

    // Set body text style
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Reply Form`, margin, margin + 30);
    doc.text(chairmanName, margin, margin + 40);
    doc.text(`Chairman, ${department}`, margin, margin + 50);
    doc.text("USTP-CDO, CM Recto Ave, Lapasan, CDO", margin, margin + 60);
    doc.text("Subject: Trainee Acceptance Certificate", margin, margin + 80);

    doc.setLineWidth(0.5);
    doc.line(margin, margin + 85, pageWidth - margin, margin + 85);

    doc.text(
      `This is to certify that the following list of student trainee(s) are hereby accepted \n to undergo 486 training hours with our company starting ${formattedStartDate}.`,
      margin,
      margin + 100
    );

    const studentListStartY = margin + 120;
    students.forEach((student, index) => {
      doc.text(
        `${index + 1}. ${student.name} - ${student.course}`,
        margin,
        studentListStartY + index * 10
      );
    });

    doc.text(
      `Issued this ${day}th day of ${month} ${year} at ${companyAddress}.`,
      margin,
      studentListStartY + students.length * 10 + 20
    );

    doc.text(
      representativeName,
      margin,
      studentListStartY + students.length * 10 + 40
    );
    doc.text(
      ` ${companyName} , ${jobTitle} `,
      margin,
      studentListStartY + students.length * 10 + 50
    );
    doc.text(
      "Signature:",
      margin,
      studentListStartY + students.length * 10 + 60
    );

    // Convert the generated PDF to a Blob
    const pdfBlob = doc.output("blob");

    return pdfBlob;
  };

  const submitAcceptanceLetter = async () => {
    // Set loading
    setLoading(true);

    try {
      // Generate the PDF Blob
      const pdfBlob = generatePDF();

      // Prepare form data including the PDF
      const formDataWithPDF = new FormData();
      formDataWithPDF.append("chairmanName", formData.chairmanName);
      formDataWithPDF.append("department", formData.department);
      formDataWithPDF.append("startDate", formData.startDate);
      formDataWithPDF.append("day", formData.day);
      formDataWithPDF.append("month", formData.month);
      formDataWithPDF.append("year", formData.year);
      formDataWithPDF.append("companyAddress", formData.companyAddress);
      formDataWithPDF.append("companyName", formData.companyName);
      formDataWithPDF.append("representativeName", formData.representativeName);
      formDataWithPDF.append("jobTitle", formData.jobTitle);

      // Append the generated PDF file
      formDataWithPDF.append("file", pdfBlob, "Trainee_Acceptance_Letter.pdf");

      // Handle response from the server
      try {
        const response = await postFormDataRequest({
          url: `/api/v1/applications/${id}/submit-acceptance-letter`,
          data: formDataWithPDF,
        });

        if (response) {
          navigate(stripLocation(location.pathname, "/generate-acceptance"));
        }
      } catch (error) {
        console.error(
          "Error uploading acceptance letter:",
          error.response.data
        );
      }
    } catch (error) {
      console.error("Error submitting the acceptance letter:", error);
      alert("Failed to submit the acceptance letter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Loader loading={loading} />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Trainee Acceptance Letter
        </h1>
        <div className="space-y-6">
          <div className="form-group">
            <label className="block text-lg font-medium text-gray-700">
              Chairman's Name
            </label>
            <input
              type="text"
              name="chairmanName"
              value={formData.chairmanName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Chairman's Name"
            />
          </div>
          <div className="form-group">
            <label className="block text-lg font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Department"
            />
          </div>
          <div className="form-group">
            <label className="block text-lg font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Select the start date for the internship.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Day
              </label>
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Month
              </label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="block text-lg font-medium text-gray-700">
              Company Address
            </label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Company Address"
            />
          </div>
          <div className="form-group">
            <label className="block text-lg font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Company Name"
            />
          </div>
          <div className="form-group">
            <label className="block text-lg font-medium text-gray-700">
              Representative Name
            </label>
            <input
              type="text"
              name="representativeName"
              value={formData.representativeName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Representative Name"
            />
          </div>
          <div className="form-group">
            <label className="block text-lg font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Job Title"
            />
          </div>
          {/* Add student details form */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Student Details
            </h3>
            {students.map((student, index) => (
              <div key={index} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) => updateStudent(index, "name", e.target.value)}
                  placeholder="Student Name"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm"
                />
                <input
                  type="text"
                  value={student.course}
                  onChange={(e) =>
                    updateStudent(index, "course", e.target.value)
                  }
                  placeholder="Course"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm"
                />
                <button
                  onClick={() => removeStudent(index)}
                  className="bg-red-100 hover:bg-red-200 p-2 rounded-full text-red-600"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addStudent}
              className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded flex items-center gap-2"
            >
              <UserPlus size={18} />
              Add Student
            </button>
          </div>
          {/* Submit Acceptance Letter */}
          <div className="mt-2">
            <button
              onClick={submitAcceptanceLetter}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Submit Acceptance Letter
            </button>
          </div>
          {/* DOwnload PDF */}
          <div className="space-y-2">
            <button
              onClick={() => {
                const pdfBlob = generatePDF();
                const url = window.URL.createObjectURL(pdfBlob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "Trainee_Acceptance_Letter.pdf";
                link.click();
                window.URL.revokeObjectURL(url);
              }}
              className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
            >
              Download Acceptance Letter
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CompanyAcceptanceLetterPage;
