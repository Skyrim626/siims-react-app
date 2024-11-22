/* import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { postFormDataRequest } from "../../api/apiHelpers";

const ChairpersonGenerateEndorsemenLetterPage = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(content, 10, 10); // Adds the text content to the PDF
    doc.save("endorsement-request.pdf"); // Triggers the download
  };

  const viewPDF = () => {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    window.open(doc.output("bloburl"), "_blank"); // Opens the PDF in a new tab
  };

  const generatePDFBlob = () => {
    const doc = new jsPDF();
    doc.text(content, 10, 10); // Adds the text content to the PDF
    const pdfBlob = doc.output("blob"); // Returns the PDF as a Blob object
    return pdfBlob;
  };

  const handleSubmitPDF = async () => {
    const pdfBlob = generatePDFBlob();

    // Convert Blob to File object
    const file = new File([pdfBlob], "endorsement-request.pdf", {
      type: "application/pdf",
    });

    // Log the file to ensure it's correct
    console.log(file);

    const formData = new FormData();
    formData.append("file", file); // Append the File object to the FormData

    // Log the FormData to see if the file is appended correctly
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // Expect 'file: File' here
    }

    try {
      setIsSubmitting(true);
      const response = await postFormDataRequest({
        url: "/api/v1/chairperson/upload-pdf",
        data: formData,
      });
      if (response) {
        alert("PDF submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting the PDF:", error);
      alert("Failed to submit the PDF. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Generate Endorsement Request</h1>
      <textarea
        className="w-full h-40 border rounded p-2 mb-4"
        value={content}
        onChange={handleInputChange}
        placeholder="Type your endorsement request here..."
      />
      <div className="flex space-x-4">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Download as PDF
        </button>
        <button
          onClick={viewPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View as PDF
        </button>
        <button
          onClick={handleSubmitPDF}
          className={`bg-purple-500 text-white px-4 py-2 rounded ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit PDF"}
        </button>
      </div>
    </div>
  );
};

export default ChairpersonGenerateEndorsemenLetterPage;
 */

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import logo from "../../assets/images/school-logo.jpg";

const ChairpersonGenerateEndorsementLetterPage = () => {
  const location = useLocation();
  const { requested_by, endorse_students } = location.state || {};

  // State to handle the letter body (for customization)
  const [letterBody, setLetterBody] = useState(`Dear Sir/Madam,

I hope this message finds you well. I am writing to formally endorse the students listed below for your internship/job program. These students have consistently demonstrated exceptional academic performance and personal qualities, and I am confident they would make a valuable addition to your team.

Requested by: ${requested_by}

Endorsed Students:
${endorse_students
  .map((student) => `${student.full_name} (Student ID: ${student.student_id})`)
  .join("\n")}

Should you require any additional information, please feel free to contact me directly. I would be happy to provide further details or answer any questions you may have.

Thank you for your time and consideration.`);

  // Handle letter body change
  const handleLetterBodyChange = (e) => {
    setLetterBody(e.target.value);
  };

  // State to control the visibility of the table
  const [isTableVisible, setIsTableVisible] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set up the font and general style
    doc.setFont("times");
    doc.setTextColor(0, 0, 0); // Set text color to black for body text

    // University header with logo
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102); // University Blue Color
    doc.text("University Name", 15, 20);
    doc.setFontSize(12);
    doc.text("Department of Information Technology", 15, 30);

    // Add logo to the top right
    doc.addImage(logo, "JPEG", 160, 5, 30, 30);

    // Add a horizontal line after header
    doc.setDrawColor(0, 51, 102); // Line color matches university color
    doc.line(10, 40, 200, 40); // Line from left to right (10 to 200)

    // Date and recipient details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text for the body
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 50);
    doc.text("To:", 10, 60);
    doc.text("The HR Department", 10, 70);
    doc.text("Company Name", 10, 80);
    doc.text("Company Address", 10, 90);

    // Salutation
    doc.text("\nDear Sir/Madam,", 10, 100);

    // Body of the letter
    const letterContent = `I hope this message finds you well. I am writing to formally endorse the students listed below for your internship/job program. These students have consistently demonstrated exceptional academic performance and personal qualities, and I am confident they would make a valuable addition to your team.
  
  Requested by: ${requested_by}
  
  Endorsed Students:
  ${endorse_students
    .map(
      (student, index) =>
        `${index + 1}. ${student.full_name} | Email: ${
          student.email
        } | Contact: ${student.contact_number}`
    )
    .join("\n")}
  
  Should you require any additional information, please feel free to contact me directly. I would be happy to provide further details or answer any questions you may have.
  
  Thank you for your time and consideration.`;

    doc.setFontSize(12);
    doc.text(letterContent, 10, 110);

    // Signature section
    doc.setFontSize(12);
    doc.text("Sincerely,", 10, 260);
    doc.text(requested_by, 10, 270); // Requested by (Chairperson name)
    doc.text("Chairperson", 10, 280);
    doc.text("Department of Information Technology", 10, 290);
    doc.text("University Name", 10, 300);

    // Draw lines for signatures (Chairperson and Dean)
    doc.text("Dean of CITC", 150, 260); // Dean's position
    doc.line(150, 265, 220, 265); // Dean's signature line

    doc.text("Chairperson BSIT", 150, 280); // Chairperson's position
    doc.line(150, 285, 220, 285); // Chairperson's signature line

    // Footer with contact information
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128); // Gray footer text
    doc.text("For more information, please contact the Chairperson", 10, 310);
    doc.text("Department of Information Technology | University Name", 10, 320);
    doc.text(
      "Email: chairperson@university.edu | Phone: (123) 456-7890",
      10,
      330
    );

    // Download the PDF
    doc.save("endorsement_letter.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto p-10 bg-white shadow-lg rounded-lg mt-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Endorsement Letter</h1>
        <p className="mt-2 text-lg text-gray-600">From the Chairperson</p>
      </div>

      {/* Endorsement Content */}
      <form className="space-y-6">
        {/* Date and Recipient Details */}
        <div className="text-gray-700">
          <p>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </p>
          <p>
            <strong>To:</strong> The HR Department <br />
            <strong>Company Name</strong> <br />
            <strong>Company Address</strong>
          </p>
          <br />
          <p>Dear Sir/Madam,</p>
        </div>

        {/* Endorsed Students Table */}
        {endorse_students && endorse_students.length > 0 && (
          <div className="overflow-x-auto mt-6">
            <button
              type="button"
              onClick={() => setIsTableVisible(!isTableVisible)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isTableVisible
                ? "Hide Endorsed Students"
                : "Show Endorsed Students"}
            </button>
            {isTableVisible && (
              <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2">No</th>
                    <th className="border-b px-4 py-2">Student Name</th>
                    <th className="border-b px-4 py-2">Email</th>
                    <th className="border-b px-4 py-2">Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {endorse_students.map((student, index) => (
                    <tr key={index}>
                      <td className="border-b px-4 py-2">{index + 1}</td>
                      <td className="border-b px-4 py-2">
                        {student.full_name}
                      </td>
                      <td className="border-b px-4 py-2">{student.email}</td>
                      <td className="border-b px-4 py-2">
                        {student.contact_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Editable Body Section */}
        <div className="text-gray-700 mt-6">
          <textarea
            value={letterBody}
            onChange={handleLetterBodyChange}
            className="w-full h-80 p-4 mt-4 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Customize your endorsement letter here"
          ></textarea>
        </div>

        {/* Closing Section */}
        <div className="mt-6">
          <p>Thank you for your time and consideration.</p>
          <br />
          <p>
            Sincerely, <br />
            <strong>{requested_by}</strong>
          </p>
          <p>
            Chairperson <br />
            Department Name <br />
            University Name
          </p>
        </div>

        {/* PDF Generation Button */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={generatePDF}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate Endorsement Letter (PDF)
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChairpersonGenerateEndorsementLetterPage;
