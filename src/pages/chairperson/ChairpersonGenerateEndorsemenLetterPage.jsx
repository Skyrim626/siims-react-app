import { useState } from "react";
import { jsPDF } from "jspdf";
import { postFormDataRequest } from "../../api/apiHelpers";
const ChairpersonGenerateEndorsemenLetterPage = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (e) => {
    setContent(e.target.value);
  };
  const data = {
    job_title: "Nutritionist",
    company:
      "University of Science and Technology of Southern Philippines (USTP)",
    office: "Department of Science in Architecture",
    address: "Cagayan De Oro City",
    endorse_students: [
      {
        full_name: "Felicia Matthew Fritz",
        email: "moniquejones@yahoo.com",
        phone_number: "297-107-7572",
      },
      {
        full_name: "Sean Hermiston O'Conner",
        email: "reid.ullrich@example.com",
        phone_number: "865.656.5124",
      },
      {
        full_name: "Olivia Marie Hughes",
        email: "oliviahughes@email.com",
        phone_number: "805-232-9473",
      },
    ],
    college: "College of Science and Technology",
    program: "BS Information Technology",
    year: 2024,
    chairperson: "Dr. John Doe",
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
    const formData = new FormData();
    formData.append("file", file); // Append the File object to the FormData
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
    <div className="bg-gray-100 p-8 min-h-screen">
      {/* Header with Logo */}
      <div className="flex justify-between items-center mb-6">
        <img
          src="/src/assets/images/logo/USTP-Logo-against-Light.png"
          alt="School Logo"
          className="h-16 w-auto"
        />
        <h1 className="text-2xl font-bold text-center">
          University of Science and Technology of Southern Philippines
        </h1>
        <img
          src="/src/assets/images/logo/CITC_LOGO.png"
          alt="School Logo"
          className="h-16 w-auto"
        />
      </div>
      {/* Letter Content */}
      <div id="letter-content" className="bg-white shadow-lg rounded-lg p-6">
        <p className="mb-4">
          <b>Date:</b> {new Date().toLocaleDateString()}
        </p>
        <p className="mb-4">
          <b>To:</b> <br />
          <span>{data.job_title}</span> <br />
          <span>{data.company}</span> <br />
          <span>{data.address}</span>
        </p>
        <p className="mb-4">Dear {data.job_title},</p>
        <p className="mb-4">
          I hope this letter finds you well and in good spirits. I am writing to
          express my sincerest gratitude for taking the time to read this
          request on behalf of the{" "}
          <span className="font-semibold">{data.college}</span> at the
          University of Science and Technology of Southern Philippines (USTP).
        </p>
        <p className="mb-4">
          As you may be aware, the fourth-year students of our{" "}
          <span className="font-semibold">{data.program}</span> program are
          currently in their final semester of their course. As part of their
          graduation requirements, they must complete a mandatory On-the-Job
          Training (OJT) program, with a duration of 486 hours between February
          and May {data.year}.
        </p>
        <p className="mb-4">
          In light of this, I would like to respectfully request your
          consideration in accepting the following student(s):
        </p>
        {/* Student Table */}
        <table className="w-full border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">
                No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Contact Number
              </th>
            </tr>
          </thead>
          <tbody>
            {data.endorse_students.map((student, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.full_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.phone_number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mb-4">
          Thank you for considering this request. Should you have any questions,
          please contact us.
        </p>
      </div>
      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={generatePDF}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Export to PDF
        </button>
        <button
          onClick={handleSubmitPDF}
          className={`px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 ${
            isSubmitting ? "opacity-50" : ""
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
