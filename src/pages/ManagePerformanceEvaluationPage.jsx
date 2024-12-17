import React, { useState } from "react";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import {
  Button,
  Field,
  Input,
  Label,
  Select,
  Textarea,
} from "@headlessui/react";
import { showFailedAlert } from "../utils/toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ManagePerformanceEvaluationPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Open navigation and location
  const navigate = useNavigate();
  const location = useLocation();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Safely access the row data
  const {
    studentName,
    jobTitle: job,
    companyName: company,
    noOfHours,
    companyFullAddress: companyAddress,
  } = location.state || {};

  // Input State
  const [studentFullName, setStudentFullName] = useState(studentName || "");
  const [trainingHours, setTrainingHours] = useState(noOfHours || "");
  const [companyName, setCompanyName] = useState(company || "");
  const [companyFullAddress, setCompanyFullAddress] = useState(companyAddress);
  const [noOfTrainingHours, setNoOfTrainingHours] = useState(noOfHours || "");
  const [jobTitle, setJobTitle] = useState(job || "");
  const [scores, setScores] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [equivalentRating, setEquivalentRating] = useState(0);
  const [comments, setComments] = useState("");

  // Criterias
  const criterias = [
    {
      category: "Attendance and Punctuality",
      items: [
        "Reports for work on time.",
        "Reports for work regularly.",
        "Requests permission before getting absent.",
      ],
    },
    {
      category: "Performance",
      items: [
        "Knows his/her work well.",
        "Completes assignments on time.",
        "Works with speed and accuracy.",
        "Ensures quality of work.",
        "Produces much output with less time.",
        "Displays resourcefulness.",
        "Requires less supervision.",
        "Has initiative.",
      ],
    },
    {
      category: "General Attitude",
      items: [
        "Shows interest in his/her work.",
        "Accepts suggestions.",
        "Cooperates well with everybody.",
        "Exhibits honesty and dependability.",
        "Follows instructions.",
        "Observes safety rules and regulations.",
        "Respects superiors.",
        "Accepts responsibilities",
        "Shows friendliness and a pleasant attitude.",
      ],
    },
  ];

  // Handles Score Change
  const handleScoreChange = (criterionIndex, itemIndex, score) => {
    const key = `${criterionIndex}-${itemIndex}`;
    const updatedScores = { ...scores, [key]: score };
    setScores(updatedScores);

    const total = Object.values(updatedScores).reduce(
      (acc, val) => acc + parseInt(val || 0, 10),
      0
    );
    setTotalPoints(total);

    let rating;
    if (total >= 96) rating = 1.25;
    else if (total >= 91) rating = 1.5;
    else if (total >= 86) rating = 1.75;
    else if (total >= 81) rating = 2.0;
    else if (total >= 76) rating = 2.25;
    else if (total >= 71) rating = 2.5;
    else if (total >= 66) rating = 2.75;
    else if (total >= 61) rating = 3.0;
    else if (total >= 56) rating = 4.0;
    else rating = 5.0;

    setEquivalentRating(rating);
  };

  // Function that submits the performance evaluation
  const handleSubmit = () => {
    // Check if all criteria have scores
    const totalCriteriaItems = criterias.reduce(
      (count, criterion) => count + criterion.items.length,
      0
    );

    console.log(totalCriteriaItems);

    if (Object.keys(scores).length < totalCriteriaItems) {
      // alert("");
      showFailedAlert("Please score all criteria before submitting.");
      return;
    }

    // If validation passes, notify the coordinator
    console.log("Coordinator notified");

    // Open modal on successful submission
    setIsModalOpen(true);
  };

  const downloadEvaluation = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    // Set margins
    const margin = 20;
    let currentY = 25; // Start Y position for the title

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Performance Evaluation", pageWidth / 2, currentY, {
      align: "center",
    });

    // General Info
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    currentY += 10;
    pdf.text(`Name of Student: ${studentFullName}`, margin, currentY);
    currentY += 10;
    pdf.text(`No. of Training Hours: ${trainingHours}`, margin, currentY);
    currentY += 10;
    pdf.text(`Name of Company: ${companyName}`, margin, currentY);
    currentY += 10;
    pdf.text(`Address of Company: ${companyFullAddress}`, margin, currentY);

    // Directions
    currentY += 20;
    pdf.text(
      "Directions: Please mark (X) on the appropriate column to rate the performance.",
      margin,
      currentY
    );

    // Table setup
    const tableBody = [];
    criterias.forEach((criterion, criterionIndex) => {
      tableBody.push([
        {
          content: criterion.category,
          colSpan: 6,
          styles: { halign: "left", fontStyle: "bold" },
        },
      ]);

      criterion.items.forEach((item, itemIndex) => {
        const scoreKey = `${criterionIndex}-${itemIndex}`;
        const score = scores[scoreKey] || "";

        const row = [item];
        [1, 2, 3, 4, 5].forEach((colScore) => {
          if (score == colScore) {
            row.push({
              content: "X",
              styles: { halign: "center" },
            });
          } else {
            row.push("");
          }
        });
        tableBody.push(row);
      });
    });

    // Generate the table with jsPDF-AutoTable
    pdf.autoTable({
      head: [["CRITERIA", "1", "2", "3", "4", "5"]],
      body: tableBody,
      startY: currentY + 10, // Set the starting Y dynamically after general info
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 3 },
      margin: { left: margin, right: margin },
      pageBreak: "auto",
      showHead: "firstPage",
      headStyles: {
        fillColor: [0, 0, 255], // RGB for blue (Red, Green, Blue)
        textColor: [255, 255, 255], // White text color for contrast
        fontStyle: "bold", // Bold font for header
      },
    });

    // Update currentY after table
    const tableFinalY = pdf.lastAutoTable.finalY;

    // Total Points and Equivalent Rating (Make sure it's not overlapping the table)
    let finalY = tableFinalY + 10;
    if (finalY < pageHeight - 20) {
      pdf.text(`Total Points: ${totalPoints}`, margin, finalY);
      finalY += 10;
      pdf.text(`Equivalent Rating: ${equivalentRating}`, margin, finalY);
    }

    // Add Comments Section to PDF
    const commentsY = finalY + 20;
    pdf.text("Comments and Suggestions:", margin, commentsY);
    pdf.setFontSize(9);
    pdf.text(comments, margin, commentsY + 10);

    // Save the PDF
    pdf.save("performance-evaluation.pdf");
  };

  return (
    <Page>
      <Loader loading={loading} />
      <Section>
        <Heading level={3} text={"Performance Evaluation"} />
        <Text className="text-md text-blue-950">
          This is where you evaluate{" "}
          <span className="font-bold">{studentFullName}'s'</span> performance.
        </Text>
      </Section>

      <form className="flex flex-col gap-3 mt-3 bg-white p-3 rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-3">
          <Field className="mb-4">
            <Label>Name of Student</Label>

            <Input
              type="text"
              value={studentFullName}
              onChange={(e) => setStudentFullName(e.target.value)}
              placeholder="Student full name"
              className="w-full border rounded p-2"
              required
            />
          </Field>

          <Field className="mb-4">
            <Label>Name of Company</Label>

            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company name"
              className="w-full border rounded p-2"
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field className="mb-4">
            <Label>Number of Training Hours</Label>

            <Input
              type="text"
              value={noOfTrainingHours}
              onChange={(e) => setNoOfTrainingHours(e.target.value)}
              placeholder="Number of training hours"
              className="w-full border rounded p-2"
              required
            />
          </Field>

          <Field className="mb-4">
            <Label>Address of Company</Label>

            <Input
              type="text"
              value={companyFullAddress}
              onChange={(e) => setCompanyFullAddress(e.target.value)}
              placeholder="Address of company"
              className="w-full border rounded p-2"
              required
            />
          </Field>
        </div>

        <Text>
          <span className="font-bold uppercase">Directions:</span> Please mark{" "}
          <span className="font-bold">(•)</span> on the appropriate column the
          rating that best describes the performance of the student-trainee.
          Please use the ratings as follows:{" "}
          <span className="font-bold">five(5)</span> as the highest and{" "}
          <span className="font-bold">one (1)</span> as the lowest rate.
        </Text>

        <table className="table-auto w-full mb-6 border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="uppercase border border-gray-300 px-4 py-2 text-left">
                Criteria
              </th>
              {[1, 2, 3, 4, 5].map((score) => (
                <th
                  key={score}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {score}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criterias.map((criterion, criterionIndex) => (
              <React.Fragment key={criterionIndex}>
                {/* Category Row */}
                <tr className="bg-gray-100">
                  <td
                    colSpan="6"
                    className="uppercase border border-gray-300 px-4 py-2 font-bold"
                  >
                    {criterion.category}
                  </td>
                </tr>
                {/* Items Row */}
                {criterion.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className=" border border-gray-300 px-4 py-2">
                      {item}
                    </td>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <td
                        key={score}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        <input
                          type="radio"
                          name={`score-${criterionIndex}-${itemIndex}`}
                          value={score}
                          onChange={() =>
                            handleScoreChange(criterionIndex, itemIndex, score)
                          }
                          className="form-radio text-blue-600"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Conversion Table */}
        <div>
          <Text className="text-md font-bold uppercase">Conversion Table</Text>

          <table className="table-auto w-full mb-6 border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="uppercase text-center border border-gray-300 px-4 py-2">
                  Total Points
                </th>

                <th className="uppercase text-center border border-gray-300 px-4 py-2">
                  Equivalent Rating
                </th>

                <th className="uppercase text-center border border-gray-300 px-4 py-2">
                  Total Points
                </th>

                <th className="uppercase text-center border border-gray-300 px-4 py-2">
                  Equivalent Rating
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border font-bold">96 - 100</td>
                <td className="border font-bold">1.25</td>
                <td className="border font-bold">71 - 75</td>
                <td className="border font-bold">2.50</td>
              </tr>

              <tr className="text-center">
                <td className="border font-bold">91 - 95</td>
                <td className="border font-bold">1.50</td>
                <td className="border font-bold">66 - 70</td>
                <td className="border font-bold">2.75</td>
              </tr>

              <tr className="text-center">
                <td className="border font-bold">86 - 90</td>
                <td className="border font-bold">1.75</td>
                <td className="border font-bold">61 - 65</td>
                <td className="border font-bold">3.00</td>
              </tr>

              <tr className="text-center">
                <td className="border font-bold">81 - 85</td>
                <td className="border font-bold">2.00</td>
                <td className="border font-bold">56 - 60</td>
                <td className="border font-bold">4.00</td>
              </tr>

              <tr className="text-center">
                <td className="border font-bold">76 - 80</td>
                <td className="border font-bold">2.25</td>
                <td className="border font-bold">55 and below</td>
                <td className="border font-bold">5.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4 ">
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5} // Controls the initial height
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 resize-y" // resize-y allows vertical resizing
            placeholder="Type your comments and suggestions here..."
          />
        </div>

        <div className="text-right space-x-4">
          <Button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            View in PDF
          </Button>

          <Button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={downloadEvaluation}
          >
            Download
          </Button>

          <Button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleSubmit} // Add your submit function here
          >
            Submit Evaluation
          </Button>

          {/* Modal Component */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center flex flex-col">
                <h2 className="text-lg font-bold mb-4">
                  Submission Successful
                </h2>
                <Text className="text-gray-600 mb-6">
                  The performance evaluation has been submitted.
                </Text>
                <Button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  Okay
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </Page>
  );
};

export default ManagePerformanceEvaluationPage;
