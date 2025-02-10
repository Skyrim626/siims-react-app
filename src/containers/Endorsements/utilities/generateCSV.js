import { unparse } from "papaparse";

export const generateCSV = (rows = []) => {
  if (!rows || rows.length === 0) {
    alert("No data available for download.");
    return;
  }

  console.log(rows);

  // Prepare data for CSV
  const csvData = rows.flatMap((row) => {
    const companyName = row.company_name || "Unknown Company";
    const companyAddress = row.company_address || "Unknown Address";
    const recipientName = row.recipient_name || "Unknown Recepient Name";
    const recipientPosition = row.recipient_position || "Unknown Recipient Position"
    const {
      name = "N/A", // Main student's name
      student_id = "N/A", // Main student's ID
      // status = "N/A",
      // letter_status_name = "N/A",
      email = "N/A", // Main student's email
      students = [],
    } = row;

    // Collect all students, including the main student
    const allStudents = [
      ...students.map((student) => ({
        "Student Name": `${student.student?.user?.first_name} ${student.student?.user?.middle_name || ""} ${student.student?.user?.last_name || ""}`.trim(),
        "Student ID": student.student?.user_id || "",
        "Student Email": student.student?.user?.email || "",
      })),
      {
        "Student Name": name,
        "Student ID": student_id,
        "Student Email": email, // Assuming email is present for the main student
      },
    ];

    // Avoid duplicates in case the main student is already listed
    const uniqueStudents = Array.from(
      new Map(
        allStudents.map((student) => [student["Student ID"], student]) // Use Student ID as the key
      ).values()
    );

    // Prepare the grouped format
    const companyHeader = {
      "Company Name": companyName,
      "Company Address": companyAddress,
      "Recipient Name": recipientName,
      "Recipient Position": recipientPosition,
      "Student Name": "", // Blank for grouping
      "Student ID": "",
      "Student Email": "",
      // Status: "",
      // "Letter Status": "",
    };

    const studentRows = uniqueStudents.map((student) => ({
      "Company Name": "", // Indent under the company
      "Company Address": "",
      "Student Name": `  - ${student["Student Name"]}`, // Indent for student
      "Student ID": student["Student ID"],
      "Student Email": student["Student Email"],
      // Status: status,
      // "Letter Status": letter_status_name,
    }));

    return [companyHeader, ...studentRows];
  });

  // Generate CSV using papaparse
  const csvContent = unparse(csvData);

  // Trigger CSV download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "endorsement_requests_by_company.csv";
  link.click();
};
