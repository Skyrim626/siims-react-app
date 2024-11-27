import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Important for the table feature

const ChairpersonGenerateEndorsemenLetterPage = () => {
  // Example data for the table
  const tableData = [
    { title: "Candidate Name", value: "John Doe" },
    { title: "Position Applied", value: "Software Engineer" },
    { title: "Qualification", value: "M.Sc. in Computer Science" },
    { title: "Years of Experience", value: "5" },
    { title: "Recommendation", value: "Strongly Endorsed" },
  ];

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set the title and content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Endorsement Letter", 20, 20);
    doc.setFontSize(12);

    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text("Chairperson's Office", 20, 40);
    doc.text("Dear Sir/Madam,", 20, 50);

    doc.text(
      `I am writing to formally endorse the candidacy of ${tableData[0].value} for the position of ${tableData[1].value} at your esteemed organization.`,
      20,
      60
    );
    doc.text(
      `Below are some of the details regarding ${tableData[0].value}'s qualifications:`,
      20,
      70
    );

    // Using jsPDF-AutoTable to add the table
    const tableColumns = ["Title", "Value"];
    const tableRows = tableData.map((row) => [row.title, row.value]);

    autoTable(doc, {
      startY: 80, // Position of the table
      head: [tableColumns],
      body: tableRows,
      theme: "grid", // Style of the table
    });

    doc.text(
      `Based on my experience working with him, I am confident that ${tableData[0].value} will bring great value to your team.`,
      20,
      doc.lastAutoTable.finalY + 10
    );
    doc.text("Sincerely,", 20, doc.lastAutoTable.finalY + 20);
    doc.text("Jane Smith", 20, doc.lastAutoTable.finalY + 30);
    doc.text("Chairperson, XYZ Corporation", 20, doc.lastAutoTable.finalY + 40);

    // Save the PDF
    doc.save("endorsement_letter.pdf");
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1>Endorsement Letter</h1>
        <p>Chairperson's Office</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
      </header>

      {/* Body Section */}
      <section style={styles.body}>
        <p>Dear Sir/Madam,</p>
        <p>
          I am writing to formally endorse the candidacy of{" "}
          <strong>{tableData[0].value}</strong> for the position of{" "}
          <strong>{tableData[1].value}</strong> at your esteemed organization. I
          have had the privilege of working closely with John over the past few
          years, and I can confidently attest to his skills, dedication, and
          passion for his field.
        </p>
        <p>Below are some of the details regarding John’s qualifications:</p>

        {/* Table with values */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Title</th>
              <th style={styles.tableHeader}>Value</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{row.title}</td>
                <td style={styles.tableCell}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          Based on my experience working with him, I am confident that John will
          bring great value to your team and will be a valuable asset to your
          organization. Should you need further information or references,
          please feel free to contact me.
        </p>

        <p>Sincerely,</p>
        <p>
          <strong>Jane Smith</strong>
        </p>
        <p>Chairperson, XYZ Corporation</p>
      </section>

      {/* Button to generate PDF */}
      <button onClick={generatePDF} style={styles.button}>
        Generate PDF
      </button>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p>XYZ Corporation - All rights reserved</p>
      </footer>
    </div>
  );
};

// Styles for the letter components
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  body: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "12px",
    color: "#888",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default ChairpersonGenerateEndorsemenLetterPage;
