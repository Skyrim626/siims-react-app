import React, { useRef, useState } from 'react'
import jsPDF from 'jspdf'

const Evaluation = () => {
  const evaluationRef = useRef(null) // Reference for the evaluation form

  const [departmentName, setDepartmentName] = useState(
    'Computer Programming Department'
  )
  const [approverName, setApproverName] = useState('Loki Mendez')
  const [position, setPosition] = useState('General Manager')
  const [scores, setScores] = useState({})
  const [totalPoints, setTotalPoints] = useState(0)
  const [equivalentRating, setEquivalentRating] = useState(0)

  const criteria = [
    {
      category: 'Attendance and Punctuality',
      items: [
        'Reports for work on time.',
        'Reports for work regularly.',
        'Requests permission before getting absent.',
      ],
    },
    {
      category: 'Performance',
      items: [
        'Knows his/her work well.',
        'Completes assignments on time.',
        'Works with speed and accuracy.',
        'Ensures quality of work.',
        'Produces much output with less time.',
        'Displays resourcefulness.',
        'Requires less supervision.',
        'Has initiative.',
      ],
    },
    {
      category: 'General Attitude',
      items: [
        'Shows interest in his/her work.',
        'Accepts responsibilities.',
        'Cooperates well with everybody.',
        'Exhibits honesty and dependability.',
        'Follows instructions.',
        'Observes safety rules and regulations.',
        'Respects superiors.',
        'Shows friendliness and a pleasant attitude.',
      ],
    },
  ]

  const handleScoreChange = (criterionIndex, score) => {
    const updatedScores = { ...scores, [criterionIndex]: score }
    setScores(updatedScores)

    const total = Object.values(updatedScores).reduce(
      (acc, val) => acc + parseInt(val || 0, 10),
      0
    )
    setTotalPoints(total)

    let rating
    if (total >= 96) rating = 1.25
    else if (total >= 91) rating = 1.5
    else if (total >= 86) rating = 1.75
    else if (total >= 81) rating = 2.0
    else if (total >= 76) rating = 2.25
    else if (total >= 71) rating = 2.5
    else if (total >= 66) rating = 2.75
    else if (total >= 61) rating = 3.0
    else if (total >= 56) rating = 4.0
    else rating = 5.0

    setEquivalentRating(rating)
  }

  const downloadEvaluation = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
  
    // Title Section
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 51, 102); // Dark blue for the title
    pdf.text('Performance Evaluation Form', pdfWidth / 2, 15, { align: 'center' });
  
    // Department and Approver Info
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0); // Black for the text
    pdf.text(`Department: ${departmentName}`, 20, 30);
    pdf.text(`Approver: ${approverName}`, 20, 40);
    pdf.text(`Position: ${position}`, 20, 50);
  
    // Add a line separator
    pdf.setLineWidth(0.5);
    pdf.line(20, 55, pdfWidth - 20, 55);
  
    // Space between the lines and the table
    let y = 65;
  
    // Personal Info Section (Fill-Up Form Style)
    pdf.setFontSize(12);
    pdf.text('Student Name: ', 20, y);
    y += 10;
    pdf.text('Training Hours: ________________________', 20, y);
    y += 10;
    pdf.text('Company Name: _________________________', 20, y);
    y += 10;
    pdf.text('Company Address: ______________________', 20, y);
    y += 15;
  
    // Evaluation Criteria Section (Fill-Up Form Style)
    criteria.forEach((criterion, index) => {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${index + 1}. ${criterion.category}`, 20, y);
      y += 10;
  
      criterion.items.forEach((item, idx) => {
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${idx + 1}. ${item}`, 20, y);
        y += 8;
  
        // Adding score options (1-5) for each item
        for (let i = 1; i <= 5; i++) {
          const xPos = 40 + i * 20;
          pdf.text(`[ ]`, xPos, y);
        }
        y += 12;
      });
  
      y += 10;
    });
  
    // Total Points and Equivalent Rating
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Total Points: _______________________`, 20, y);
    y += 8;
    pdf.text(`Equivalent Rating: ____________________`, 20, y);
  
    // Save the generated PDF
    pdf.save('performance-evaluation-fillable-form.pdf');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-700">
      <h1 className="text-center text-2xl font-semibold mb-6">
        Performance Evaluation
      </h1>
      <p className="text-center text-sm mb-6">
        Evaluate the intern&apos;s attendance, performance, and attitude.
      </p>

      <form ref={evaluationRef}>
        <section className="mb-6">
          <div className="flex flex-wrap justify-between mb-4">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <label className="block text-sm mb-2">Name of Student:</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg shadow-sm"
                placeholder="John Smith"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm mb-2">
                No. of Training Hours:
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg shadow-sm"
                placeholder="486"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <label className="block text-sm mb-2">Name of Company:</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg shadow-sm"
                placeholder="Tech Solutions Inc."
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm mb-2">Address of Company:</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg shadow-sm"
                placeholder="123 Main Street, Metro Manila"
              />
            </div>
          </div>
        </section>

        <p className="text-sm mb-4">
          Directions: Select the rating that best describes the student&apos;s
          performance.
        </p>

        <table className="table-auto w-full mb-6 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Criteria</th>
              <th className="px-4 py-2 text-center">1</th>
              <th className="px-4 py-2 text-center">2</th>
              <th className="px-4 py-2 text-center">3</th>
              <th className="px-4 py-2 text-center">4</th>
              <th className="px-4 py-2 text-center">5</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((criterion, criterionIndex) => (
              <React.Fragment key={criterionIndex}>
                <tr>
                  <td colSpan="6" className="px-4 py-2 font-semibold">
                    {criterion.category}
                  </td>
                </tr>
                {criterion.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className="px-4 py-2">{item}</td>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <td key={score} className="px-4 py-2 text-center">
                        <input
                          type="radio"
                          name={`score-${criterionIndex}-${itemIndex}`}
                          value={score}
                          onChange={() =>
                            handleScoreChange(criterionIndex, score)
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

        <div className="text-center mt-8">
          <button
            type="button"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            onClick={downloadEvaluation}
          >
            Generate PDF
          </button>
        </div>
      </form>
    </div>
  )
}

export default Evaluation
