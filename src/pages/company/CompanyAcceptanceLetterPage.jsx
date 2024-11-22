import { useState } from "react";
import jsPDF from "jspdf";

const CompanyAcceptanceLetterPage = () => {
  
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
      .map((student, index) => `${index + 1}. ${student.name} - ${student.course}`)
      .join("\n");
  
  //   const content = `
  // Reply Form
  // ${chairmanName}
  // Chairman, ${department}
  // USTP-CDO, CM Recto Ave, Lapasan, CDO
  
  // Subject: Trainee Acceptance Certificate
  
  // This is to certify that the following list of student trainee(s) are hereby accepted to undergo 486 training hours with our company starting ${startDate}.
  
  // ${studentDetails}
  
  // Issued this ${day}th day of ${month} ${year} at ${companyAddress}.
  
  // Office/Company Name: ${companyName}
  // Representative Name: ${representativeName}
  // Title: ${jobTitle}
  // Signature:
  // `;
  
    // Generate the PDF
    const doc = new jsPDF();
    
    // Set margins and other settings
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Set title and styling
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("REPLY FORM", margin, margin + 10);
  
    // Set body text style
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
  
    // Add the content
    doc.text(`Reply Form`, margin, margin + 30);
    doc.text(chairmanName, margin, margin + 40);
    doc.text(`Chairman, ${department}`, margin, margin + 50);
    doc.text("USTP-CDO, CM Recto Ave, Lapasan, CDO", margin, margin + 60);
    doc.text("Subject: Trainee Acceptance Certificate", margin, margin + 80);
  
    // Add line separator
    doc.setLineWidth(0.5);
    doc.line(margin, margin + 85, pageWidth - margin, margin + 85);
  
    doc.text(
      `This is to certify that the following list of student trainee(s) are hereby accepted \n to undergo 486 training hours with our company starting ${startDate}.`,
      margin,
      margin + 100
    );
  
    // Add student list
    const studentListStartY = margin + 120;
    students.forEach((student, index) => {
      doc.text(`${index + 1}. ${student.name} - ${student.course}`, margin, studentListStartY + index * 10);
    });
  
    // Footer section
    doc.text(
      `Issued this ${day}th day of ${month} ${year} at ${companyAddress}.`,
      margin,
      studentListStartY + students.length * 10 + 20
    );
    doc.text(`Office/Company Name: ${companyName}`, margin, studentListStartY + students.length * 10 + 30);
    doc.text(`Representative Name: ${representativeName}`, margin, studentListStartY + students.length * 10 + 40);
    doc.text(`Title: ${jobTitle}`, margin, studentListStartY + students.length * 10 + 50);
    doc.text("Signature:", margin, studentListStartY + students.length * 10 + 60);
  
    // Save the generated PDF
    doc.save("Trainee_Acceptance_Letter.pdf");
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Trainee Acceptance Letter</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Chairman's Name</label>
          <input
            type="text"
            name="chairmanName"
            value={formData.chairmanName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Chairman's Name"
          />
        </div>
        <div>
          <label className="block font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Department"
          />
        </div>
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block font-medium">Day</label>
            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Day"
            />
          </div>
          <div>
            <label className="block font-medium">Month</label>
            <input
              type="text"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Month"
            />
          </div>
          <div>
            <label className="block font-medium">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Year"
            />
          </div>
        </div>
        <div>
          <label className="block font-medium">Company Address</label>
          <input
            type="text"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Company Address"
          />
        </div>
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Company Name"
          />
        </div>
        <div>
          <label className="block font-medium">Representative Name</label>
          <input
            type="text"
            name="representativeName"
            value={formData.representativeName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Representative Name"
          />
        </div>
        <div>
          <label className="block font-medium">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Job Title"
          />
        </div>
        <div>
          <label className="block font-medium">Students</label>
          <div className="space-y-4">
            {students.map((student, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) => updateStudent(index, "name", e.target.value)}
                  className="w-1/2 p-2 border rounded"
                  placeholder="Student Name"
                />
                <input
                  type="text"
                  value={student.course}
                  onChange={(e) => updateStudent(index, "course", e.target.value)}
                  className="w-1/2 p-2 border rounded"
                  placeholder="Course"
                />
                <button
                  onClick={() => removeStudent(index)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addStudent}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default CompanyAcceptanceLetterPage;
