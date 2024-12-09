import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import getFullName from "../../utils/getFullName";
import { Button, Field, Input, Label } from "@headlessui/react";
import { postFormDataRequest } from "../../api/apiHelpers";
import Text from "../../components/common/Text";
import Loader from "../../components/common/Loader";

const ChairpersonGenerateEndorsemenLetterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    requested_by,
    endorse_students,
    main_student,
    request_id,
    company_name,
  } = location.state;

  const currentDate = new Date();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Set the default date to the current date in the desired format
  const [date, setDate] = useState(
    currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [recipient, setRecipient] = useState("Dear, Charisse Nadine A. Laroda");
  const [company, setCompany] = useState(
    company_name || "Fligno Software Phil"
  );
  const [address, setAddress] = useState("Cagayan de Oro City");
  const [description, setDescription] = useState(
    "I hope this letter finds you well and in good spirits. I am writing to express my sincerest gratitude for taking the time to read this request on behalf of the College of Information Technology and Computing (CITC) at the University of Science and Technology of Southern Philippines (USTP). As you may be aware, the fourth-year students of our Bachelor of Science in Information Technology (BSIT) program are currently in their final semester of their course. As part of their graduation requirements, they must complete a mandatory On-the-Job Training (OJT) program, with a duration of 486 hours between February and May 2023."
  );
  const [footerDescription, setFooterDescription] = useState();
  const [errors, setErrors] = useState({});

  // Format of Endorsement Letter
  const endorsementLetterPDFFormat = () => {
    const doc = new jsPDF({
      format: "a4", // Set the page size to A4
    });

    // const date = new Date().toLocaleDateString();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(12);

    // Header Image
    // const leftLogo = "/src/assets/images/logo/USTP-Logo-against-Light.png"; // Left logo path
    // const rightLogo = "/src/assets/images/logo/CITC_LOGO.png"; // Right logo path

    const leftLogo = "/src/assets/images/logo/USTP-Logo-against-Light.png";
    const centerLogo = "/src/assets/images/logo/IT-Logo.png";
    const rightLogo = "/src/assets/images/logo/CITC_LOGO.png";

    /* const leftLogoWidth = 25;
    const leftLogoHeight = 25;
    const rightLogoWidth = 35;
    const rightLogoHeight = 25; */

    // Adjust logo sizes
    const leftCenterLogoWidth = 20; // Width for left and center logos
    const logoHeight = 20; // Height for all logos
    const rightLogoWidth = 35; // Width for the third logo (right logo)

    // Reduced space between logos (e.g., 10mm)
    const logoSpacing = 10; // Space between logos

    // Calculate positions for logos to center them horizontally with reduced spacing
    const logosTotalWidth =
      leftCenterLogoWidth * 2 + rightLogoWidth + logoSpacing * 2; // Left + Center + Right with spacing
    const startX = (pageWidth - logosTotalWidth) / 2;

    // Add logos with updated size and reduced spacing
    doc.addImage(leftLogo, "PNG", startX, 10, leftCenterLogoWidth, logoHeight); // Left logo
    doc.addImage(
      centerLogo,
      "PNG",
      startX + leftCenterLogoWidth + logoSpacing,
      10,
      leftCenterLogoWidth,
      logoHeight
    ); // Center logo
    doc.addImage(
      rightLogo,
      "PNG",
      startX + (leftCenterLogoWidth + logoSpacing) * 2,
      10,
      rightLogoWidth,
      logoHeight
    ); // Right logo with adjusted width

    // Add university name below logos
    const universityName =
      "UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES";
    const campuses =
      "Alubijid | Cagayan de Oro | Claveria | Villanueva | Balubal | Jasaan | Oroquieta | Panaon";
    const textY = 10 + logoHeight + 5; // Reduced space between logos and university name

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(universityName, pageWidth / 2, textY, { align: "center" });

    // Adjusted the Y position for campuses text to be closer
    doc.text(campuses, pageWidth / 2, textY + 4, { align: "center" });

    // Add saved data content below the university name
    let yPosition = textY + 20;

    // Add Date
    doc.setFont("helvetica", "normal"); // Ensure normal font style (not bold)
    doc.setFontSize(11);
    doc.text(date, 10, 50); // Do not Bold

    // Add Company Owner
    doc.setFontSize(11);
    doc.text(company, 10, 55); // Do not Bold

    // Address
    doc.setFontSize(11);
    doc.text(address, 10, 60); // Do not Bold

    // Add Recipient
    doc.setFont("helvetica", "normal"); // Set font to normal
    doc.setFontSize(11); // Set font size to 11
    doc.text(`${recipient}`, 10, 70);

    // Add Description
    const textWidth = pageWidth - 2 * margin; // The available width for text
    doc.setFontSize(11);

    // Split the text into lines that fit the specified width
    const descriptionLines = doc.splitTextToSize(description, textWidth);

    // Calculate the total height based on the number of lines
    const lineHeight = 9 * 0.3528; // Approximate line height in mm for 11pt font
    const descriptionHeight = descriptionLines.length * lineHeight;

    // Starting Y position for description
    let descriptionY = 80;

    // Check if the description will overflow the page height
    if (descriptionY + descriptionHeight > pageHeight - margin) {
      doc.addPage();
      descriptionY = margin; // Reset to the top margin of the new page
    }

    // Render the description
    doc.text(descriptionLines, margin, descriptionY, { align: "left" });

    // console.log(descriptionY);
    // console.log(descriptionHeight);

    // Adjust the padding between the description and the table
    const tablePadding = 25; // Adjust this value as needed
    const tableStartY = descriptionY + descriptionHeight + tablePadding; // Position table after the description

    // Add the table
    doc.autoTable({
      startY: tableStartY, // Set table to start after description
      head: [["Student ID", "Full Name", "Email", "Phone Number"]],
      body: [
        [
          main_student.id, // Main student's Student ID
          getFullName(
            main_student.user.first_name,
            main_student.user.middle_name,
            main_student.user.last_name
          ), // Main student's full name
          main_student.user.email, // Main student's email
          main_student.user.phone_number, // Main student's phone number
        ],
        ...endorse_students.map((student) => [
          student.student_id,
          student.full_name,
          student.email,
          student.phone_number,
        ]),
      ],
      theme: "grid",
      styles: {
        fontSize: 10, // Adjust font size
        cellPadding: 2, // Padding for better readability
        lineWidth: 0.1, // Thin border lines
        lineColor: [200, 200, 200], // Light gray border color
      },
      headStyles: {
        fillColor: [240, 240, 240], // Light gray header background
        fontStyle: "bold", // Bold header text
        textColor: [60, 60, 60], // Dark gray text color for header
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // White background for table rows
        textColor: [80, 80, 80], // Dark gray text for rows
        halign: "left", // Align body text to the left
      },
      columnStyles: {
        0: {
          // Student ID column
          fontStyle: "normal", // Bold student IDs
          textColor: [0, 0, 0], // Black color for student IDs
          halign: "left", // Left-align Student ID text
        },
      },
    });

    // Add Signatures
    const finalY = doc.lastAutoTable.finalY + 20;

    // Chairperson Signature
    doc.line(15, finalY + 20, 60, finalY + 20); // Draw line first
    doc.text("Chairperson", 20, finalY + 30); // Place title below the line

    // Dean Signature
    doc.line(145, finalY + 20, 190, finalY + 20); // Draw line first
    doc.text("Dean", 150, finalY + 30); // Place title below the line

    // Returns the PDF document
    return doc;
  };

  // Generates a PDF
  const generatePDF = () => {
    const doc = endorsementLetterPDFFormat();
    // Save PDF
    doc.save("Endorsement_Letter.pdf");
  };

  // Submit to Dean
  const handleSubmitForApproval = async () => {
    // Set Loading
    setLoading(true);

    const doc = endorsementLetterPDFFormat();

    // Generate the PDF as a Blob
    const pdfBlob = doc.output("blob");

    // Create a File from the Blob
    const pdfFile = new File([pdfBlob], "Endorsement_Letter.pdf", {
      type: "application/pdf",
    });

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("pdf_file", pdfFile);

    try {
      // POST FORM DATA
      const response = await postFormDataRequest({
        url: `/api/v1/endorsement-letter-requests/${request_id}/upload`,
        data: formData,
      });

      if (response) {
        navigate(-1);
      }
    } catch (error) {
      // console.log(error.response.data.errors);
      setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-2xl font-bold mb-4">Generate Endorsement Letter</h1>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">Date</Label>
          <Input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter Date"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Company
          </Label>
          <Input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter recipient (e.g., Dear Dr. Smith)"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Address
          </Label>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter recipient (e.g., Dear Dr. Smith)"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Recipient
          </Label>
          <Input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter recipient (e.g., Dear Dr. Smith)"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Description
          </Label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter description (e.g., I hope this message finds you well...)"
            rows="5"
            cols="40"
          />
        </Field>

        <h2 className="text-xl font-semibold mb-4">Students to Endorse</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                  Student ID
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                  Full Name
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {main_student.id}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {getFullName(
                    main_student.user.first_name,
                    main_student.user.middle_name,
                    main_student.user.last_name
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {main_student.user.email}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {main_student.user.phone_number}
                </td>
              </tr>
              {endorse_students &&
                endorse_students.length > 0 &&
                endorse_students.map((student, index) => (
                  <tr key={index} className="bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                      {student.student_id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                      {student.full_name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                      {student.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                      {student.phone_number}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end space-x-5">
          <Button
            onClick={generatePDF}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Generate PDF
          </Button>
          <div>
            <Button
              onClick={handleSubmitForApproval}
              className="bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600"
            >
              Submit for approval to Dean
            </Button>
            {errors["pdf_file"] && <Text>The pdf file is required</Text>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChairpersonGenerateEndorsemenLetterPage;
