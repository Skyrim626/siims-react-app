import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Important for the table feature

const ChairpersonGenerateEndorsemenLetterPage = () => {
  const [formData, setFormData] = useState({
    job_title: "Human Resource Manager",
    company: "University of Science and Technology of Southern Philippines (USTP)",
    office: "Department of Science in Architecture",
    address: "Cagayan De Oro City",
    representative: "Jane Smith", // Company representative name
    chairperson: "Dr. John Doe", // Chairperson's name
    endorse_students: [
      { full_name: "Felicia Matthew Fritz", email: "moniquejones@yahoo.com", phone_number: "297-107-7572" },
      { full_name: "Sean Hermiston O'Conner", email: "reid.ullrich@example.com", phone_number: "865.656.5124" },
      { full_name: "Olivia Marie Hughes", email: "oliviahughes@email.com", phone_number: "805-232-9473" },
    ],
    college: "College of Science and Technology",
    program: "BS Information Technology",
    year: 2024,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...formData.endorse_students];
    updatedStudents[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      endorse_students: updatedStudents,
    }));
  };

  const handleAddStudent = () => {
    setFormData((prevData) => ({
      ...prevData,
      endorse_students: [
        ...prevData.endorse_students,
        { full_name: "", email: "", phone_number: "" },
      ],
    }));
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = formData.endorse_students.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      endorse_students: updatedStudents,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Define margins and page dimensions
    const margin = 10;
    const pageWidth = doc.internal.pageSize.width;
    const lineSpacing = 7; // Set uniform line height
    let contentY = 50; // Starting Y position for content

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

    // Add Letter Date
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, 45);

    // Add Recipient Information
    doc.text("To:", margin, contentY);
    doc.text(`${formData.representative},`, margin, (contentY += lineSpacing));
    doc.text(`${formData.job_title}`, margin, (contentY += lineSpacing));
    doc.text(`${formData.company}`, margin, (contentY += lineSpacing));
    doc.text(`${formData.address}`, margin, (contentY += lineSpacing));

    // Add Greeting
    contentY += lineSpacing;
    doc.text(`Dear ${formData.representative},`, margin, contentY);

   // Add Paragraphs with Text Wrapping
doc.setFontSize(10); 


// Paragraph 1 with Text Wrapping
const paragraph1 = `I hope this letter finds you well and in good spirits. I am writing to express my sincerest gratitude for taking the\n time to read this request on behalf of the ${formData.college} at the University of Science and Technology of Southern Philippines (USTP).`;
const lines1 = doc.splitTextToSize(paragraph1, pageWidth - 2 * margin); // Accounts for both left and right margins
doc.text(lines1, margin, margin + 90, { align: "justify" });

// Paragraph 2 with Text Wrapping
const paragraph2 = `As you may be aware, the fourth-year students of our ${formData.program} program are currently in their final semester of their course. As part of their graduation requirements, they must complete a mandatory On-the-Job Training (OJT) program, with a duration of 486 hours between February and May ${formData.year}.`;
const lines2 = doc.splitTextToSize(paragraph2, pageWidth - 2 * margin); // Accounts for both left and right margins
doc.text(lines2, margin, margin + 105, { align: "justify" });

// Paragraph 3 with Text Wrapping
const paragraph3 = `In light of this, we would like to request your esteemed company to consider accepting these students for internship opportunities. Below is the list of students for endorsement:`;
const lines3 = doc.splitTextToSize(paragraph3, pageWidth - 2 * margin); // Accounts for both left and right margins
doc.text(lines3, margin, margin + 120, { align: "justify" });

// Update contentY to position subsequent elements after the text
contentY = margin + 135;



    // Add Student Table
    doc.autoTable({
        startY: contentY + lineSpacing,
        head: [["#", "Student Name", "Email", "Phone"]],
        body: formData.endorse_students.map((student, index) => [
            index + 1,
            student.full_name,
            student.email,
            student.phone_number,
        ]),
        theme: "grid",
        headStyles: { fillColor: [0, 0, 0] },
        styles: { fontSize: 10, cellPadding: 3 },
    });

    // Closing Remarks
    const tableEndY = doc.lastAutoTable.finalY + lineSpacing;
    const closingText = `
      Thank you for your time and consideration.
      
      Sincerely,
      ${formData.chairperson}
    `;
    const closingLines = doc.splitTextToSize(closingText, pageWidth - 2 * margin);
    doc.text(closingLines, margin, tableEndY);

    // Save the PDF
    doc.save("endorsement-request.pdf");
};

  
  
  


  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <label className="block mb-2">Chairperson's Name:</label>
        <input
          type="text"
          name="chairperson"
          value={formData.chairperson}
          onChange={handleInputChange}
          className="mb-4 p-2 w-full border border-gray-300 rounded"
        />

        <label className="block mb-2">Representative's Name:</label>
        <input
          type="text"
          name="representative"
          value={formData.representative}
          onChange={handleInputChange}
          className="mb-4 p-2 w-full border border-gray-300 rounded"
        />

        <h3 className="text-lg font-semibold mb-4">Students to Endorse:</h3>
        {formData.endorse_students.map((student, index) => (
          <div key={index} className="mb-4 flex justify-between items-center">
            <div className="w-full">
              <label className="block mb-2">Student {index + 1} Name:</label>
              <input
                type="text"
                value={student.full_name}
                onChange={(e) => handleStudentChange(index, "full_name", e.target.value)}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              />
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={student.email}
                onChange={(e) => handleStudentChange(index, "email", e.target.value)}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              />
              <label className="block mb-2">Phone Number:</label>
              <input
                type="text"
                value={student.phone_number}
                onChange={(e) => handleStudentChange(index, "phone_number", e.target.value)}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              />
            </div>

            <button
              onClick={() => handleDeleteStudent(index)}
              className="text-red-500 ml-4"
            >
              Delete
            </button>
          </div>
        ))}

        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
        >
          Add Student
        </button>

        <button
          onClick={generatePDF}
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default ChairpersonGenerateEndorsemenLetterPage;
