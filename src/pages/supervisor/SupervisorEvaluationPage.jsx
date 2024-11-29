import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useLoaderData } from "react-router-dom";

const SupervisorEvaluationPage = () => {
  const { list_of_interns } = useLoaderData();

  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentOptions, setStudentOptions] = useState([]);

  useEffect(() => {
    // Simulate an API call to fetch students
    setStudentOptions(students); // Replace with API response when applicable
  }, []);

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const [studentName, setStudentName] = useState("John Smith");
  const [trainingHours, setTrainingHours] = useState("486");
  const [companyName, setCompanyName] = useState("Tech Solutions Inc.");
  const [companyAddress, setCompanyAddress] = useState(
    "123 Main Street, Central Business District, Metro Manila, 1234"
  );
  const [scores, setScores] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [equivalentRating, setEquivalentRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = () => {
    // Check if all criteria have scores
    const totalCriteriaItems = criteria.reduce(
      (count, criterion) => count + criterion.items.length,
      0
    );

    if (Object.keys(scores).length < totalCriteriaItems) {
      alert("Please score all criteria before submitting.");
      return;
    }

    // If validation passes, notify the coordinator
    console.log("Coordinator notified");

    // Open modal on successful submission
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };
  // Assume `students` is fetched from an API or hardcoded for simplicity.
  const students = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Alice Brown" },
  ];

  const criteria = [
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
    pdf.text(`Name of Student: ${studentName}`, margin, currentY);
    currentY += 10;
    pdf.text(`No. of Training Hours: ${trainingHours}`, margin, currentY);
    currentY += 10;
    pdf.text(`Name of Company: ${companyName}`, margin, currentY);
    currentY += 10;
    pdf.text(`Address of Company: ${companyAddress}`, margin, currentY);

    // Directions
    currentY += 20;
    pdf.text(
      "Directions: Please mark (X) on the appropriate column to rate the performance.",
      margin,
      currentY
    );

    // Table setup
    const tableBody = [];
    criteria.forEach((criterion, criterionIndex) => {
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
    <div className="container mx-auto p-6">
      <h1 className="text-center text-2xl font-semibold mb-6">
        Performance Evaluation
      </h1>
      <form>
        <div className="mb-4">
          <label>Name of Student:</label>
          <select
            value={selectedStudent}
            onChange={handleStudentChange}
            className="w-full border rounded p-2"
          >
            <option value="" disabled>
              Select a Student
            </option>
            {studentOptions.map((student) => (
              <option key={student.id} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label>No. of Training Hours:</label>
          <input
            type="text"
            value={trainingHours}
            onChange={(e) => setTrainingHours(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label>Name of Company:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label>Address of Company:</label>
          <input
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <table className="table-auto w-full mb-6">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((criterion, criterionIndex) => (
              <React.Fragment key={criterionIndex}>
                <tr>
                  <td colSpan="6" className="font-bold">
                    {criterion.category}
                  </td>
                </tr>
                {criterion.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item}</td>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <td key={score} className="text-center">
                        <input
                          type="radio"
                          name={`score-${criterionIndex}-${itemIndex}`}
                          value={score}
                          onChange={() =>
                            handleScoreChange(criterionIndex, itemIndex, score)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="mb-4 ">
          <textarea
            value={comments}
            onChange={handleCommentsChange}
            rows={5} // Controls the initial height
            className="w-full p-3 border border-gray-500 rounded-md bg-gray-100 resize-y" // resize-y allows vertical resizing
            placeholder="Type your comments and suggestions here..."
          />
        </div>
        <div className="text-right space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleSubmit} // Add your submit function here
          >
            Submit
          </button>

          {/* Modal Component */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-lg font-bold mb-4">
                  Submission Successful
                </h2>
                <p className="text-gray-600 mb-6">
                  The performance evaluation has been submitted, and the
                  coordinator has been notified.
                </p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={closeModal}
                >
                  Okay
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={downloadEvaluation}
          >
            Download
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupervisorEvaluationPage;
