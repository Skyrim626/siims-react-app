import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const StudentViewEvaluationPage = () => {
  const [departmentName, setDepartmentName] = useState(
    "Computer Programming Department"
  );
  const [approverName, setApproverName] = useState("Loki Mendez");
  const [position, setPosition] = useState("General Manager");
  const [scores, setScores] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [equivalentRating, setEquivalentRating] = useState(0);
  const evaluationRef = useRef();
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
        "Accepts responsibilities.",
        "Cooperates well with everybody.",
        "Exhibits honesty and dependability.",
        "Follows instructions.",
        "Observes safety rules and regulations.",
        "Accepts Responsibilities",
        "Respects superiors.",
        "Shows friendliness and a pleasant attitude.",
      ],
    },
  ];

  const handleScoreChange = (criterionIndex, score) => {
    const updatedScores = { ...scores, [criterionIndex]: score };
    setScores(updatedScores);

    const total = Object.values(updatedScores).reduce(
      (acc, val) => acc + parseInt(val || 0, 10),
      0
    );
    setTotalPoints(total);

    // Determine the equivalent rating based on the total points
    let rating;
    if (total >= 96) {
      rating = 1.25;
    } else if (total >= 91) {
      rating = 1.5;
    } else if (total >= 86) {
      rating = 1.75;
    } else if (total >= 81) {
      rating = 2.0;
    } else if (total >= 76) {
      rating = 2.25;
    } else if (total >= 71) {
      rating = 2.5;
    } else if (total >= 66) {
      rating = 2.75;
    } else if (total >= 61) {
      rating = 3.0;
    } else if (total >= 56) {
      rating = 4.0;
    } else {
      rating = 5.0;
    }

    setEquivalentRating(rating);
  };

  const downloadEvaluation = async () => {
    const element = evaluationRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate the scale factor to fit the content within the PDF page
    const scaleFactor = Math.min(
      pdfWidth / canvas.width,
      pdfHeight / canvas.height
    );

    // Add the image with the scaled width and height
    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      canvas.width * scaleFactor,
      canvas.height * scaleFactor
    );
    pdf.save("performance-evaluation.pdf");
  };

  return (
    <div
      ref={evaluationRef}
      className="px-8 py-4 max-w-4xl mx-auto text-gray-800"
    >
      <h1 className="text-center text-2xl font-bold mb-4">
        <span className="text-blue-500">Performance</span> Evaluation
        <button
          onClick={downloadEvaluation}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-end ml-5"
        >
          Download Evaluation
        </button>
      </h1>

      <p className="text-center text-sm mb-6">
        Evaluate the intern&apos;s attendance and punctuality, performance, and
        general attitude.
      </p>

      <form>
        {/* Header Section */}
        <section className="mb-6">
          <div className="flex flex-wrap justify-between mb-4">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0 px-2">
              <label className="block text-sm font-medium mb-2">
                Name of Student:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="John Smith"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-sm font-medium mb-2">
                No. of Training Hours:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="486"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0 px-2">
              <label className="block text-sm font-medium mb-2">
                Name of Company:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Tech Solutions Inc."
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-sm font-medium mb-2">
                Address of Company:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="123 Main Street, Central Business District, Metro Manila, 1234"
              />
            </div>
          </div>
        </section>
        {/* Directions */}
        <p className="text-sm mb-6">
          Directions: Please select the appropriate column the rating that best
          describe the performance of the students-trainee. Please use the
          ratings as follows: five(5) as the highest and one(1) as the lowest
          rate.
        </p>

        {/* Evaluation Table */}
        <table className="w-full border-collapse border mb-6">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-2">Criteria</th>
              <th className="border p-2">1</th>
              <th className="border p-2">2</th>
              <th className="border p-2">3</th>
              <th className="border p-2">4</th>
              <th className="border p-2">5</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((criterion, catIndex) => (
              <React.Fragment key={catIndex}>
                <tr>
                  <td colSpan="7" className="border p-2 bg-gray-100 font-bold">
                    {criterion.category}
                  </td>
                </tr>
                {criterion.items.map((item, itemIndex) => {
                  const totalPointsForRow =
                    scores[`${catIndex}-${itemIndex}`] || 0;

                  return (
                    <tr key={`${catIndex}-${itemIndex}`}>
                      <td className="border p-2">{item}</td>
                      {[1, 2, 3, 4, 5].map((score) => (
                        <td className="border p-2 text-center" key={score}>
                          <input
                            type="radio"
                            name={`criterion-${catIndex}-${itemIndex}`}
                            value={score}
                            onChange={() =>
                              handleScoreChange(
                                `${catIndex}-${itemIndex}`,
                                score
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
            {/* Final Total and Equivalent Rating */}
            <tr>
              <td
                colSpan="5"
                className="border p-2 font-bold text-right bg-gray-100"
              >
                Total Points:
              </td>
              <td className="border p-2 text-center font-bold">
                {totalPoints}
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                className="border p-2 font-bold text-right bg-gray-100"
              >
                Equivalent Rating:
              </td>
              <td className="border p-2 text-center font-bold">
                {equivalentRating}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Summary Section */}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Comments and Suggestions
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md bg-gray-100 p-5"
          />
        </div>
        {/* Rated By Section */}
        <div className="mb-10">
          <p className="mb-2">Rated By:</p>
          <div className="border-b border-black pb-2 text-center">
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full text-center font-bold uppercase bg-transparent outline-none"
            />
          </div>
          <p className="text-center text-sm mt-2">
            Signature over Printed Department Name
          </p>
        </div>

        {/* Approved Section */}
        <div>
          <p className="mb-2">Approved:</p>
          <div className="border-b border-black pb-2 text-center">
            <input
              type="text"
              value={approverName}
              onChange={(e) => setApproverName(e.target.value)}
              className="w-full text-center font-bold uppercase bg-transparent outline-none"
            />
          </div>
          <p className="text-center text-sm mt-2">
            Signature over Printed Name
          </p>

          <div className="border-b border-black pb-2 text-center mt-8">
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full text-center font-bold bg-transparent outline-none"
            />
          </div>
          <p className="text-center text-sm mt-2">Position</p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full mt-4"
        >
          Submit Evaluation
        </button>
      </form>
    </div>
  );
};

export default StudentViewEvaluationPage;
