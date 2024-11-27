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
