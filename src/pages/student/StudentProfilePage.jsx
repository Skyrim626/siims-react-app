import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const StudentProfilePage = () => {
  const navigate = useNavigate();

  const profileRef = useRef();

  // Sample student data
  const student = {
    name: "Jane Smith",
    role: "IT Intern",
    profilePic: "/src/assets/images/company/company-profile-photo.jpg", // Placeholder for profile picture
    education: {
      department: "College of Information Technology and Computing",
      course: "Bachelor of Science in Computer Science",
    },
    contact: {
      email: "jane.doe@example.com",
      phone: "+63 123 4567",
      address: "123 Main Street, Central Business District, Metro Manila, 1234",
    },
    languages: ["English", "Filipino", "Spanish"],
    aboutMe:
      "I am a dedicated and enthusiastic software development intern currently pursuing a Bachelor of Science in Computer Science at the University of Science and Technology of Southern Philippines (USTP). With a passion for technology and a keen interest in software development, I am eager to apply my academic knowledge and skills in a real-world setting.",
    skills: [
      "JavaScript",
      "React.js",
      "HTML & CSS",
      "Node.js",
      "Version Control (Git)",
      "Problem-Solving",
      "Team Collaboration",
    ],
    workExperience: [
      {
        title: "Software Development Intern",
        company: "Web Innovations Ltd.",
        address: "456 Innovation Street, Cagayan de Oro, Philippines",
        startDate: "1 August 2024",
        endDate: "31 December 2024",
      },
      {
        title: "Junior Web Developer (Part-Time)",
        company: "Tech Support Services",
        address: "789 Support Lane, Cagayan de Oro, Philippines",
        startDate: "1 June 2023",
        endDate: "31 July 2024",
      },
    ],
    educationBackground: [
      {
        school:
          "University of Science and Technology of Southern Philippines (USTP)",
        details: "BS in Computer Science (Expected Graduation 2025)",
        address: "Cagayan de Oro, Philippines",
        startDate: "1 June 2021",
        endDate: "31 May 2025",
      },
      {
        school: "Cagayan de Oro Science High School",
        details: "High School Diploma",
        address: "789 Science Road, Cagayan de Oro, Philippines",
        startDate: "1 June 2019",
        endDate: "31 May 2021",
      },
    ],
  };

  const SectionCard = ({ title, children }) => (
    <div className="p-4 border rounded-md shadow-md bg-gray-50 relative">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Set Title
    doc.setFontSize(18);
    doc.text("Student Profile", 105, 20, { align: "center" });

    // Start position for content
    let yPosition = 30; // Set starting Y-position after title

    // Helper function to add a page break if content exceeds the page height
    const checkPageHeight = () => {
      if (yPosition > 270) {
        // Check if content exceeds 270 (a little above the bottom margin)
        doc.addPage(); // Add a new page
        yPosition = 20; // Reset Y-position after new page
      }
    };

    // Add Profile Picture
    if (student.profilePicture) {
      doc.addImage(student.profilePicture, "JPEG", 15, yPosition, 30, 30); // Adjust size and position
      yPosition += 35; // Add space after profile picture
    }

    // Add Basic Information
    doc.setFontSize(12);
    doc.text("Name:", 50, yPosition);
    doc.text(student.name, 80, yPosition);
    yPosition += 10;

    doc.text("Role:", 50, yPosition);
    doc.text(student.role, 80, yPosition);
    yPosition += 20; // Spacing between sections

    checkPageHeight(); // Check if content fits on the page

    // Current Education
    doc.text("Current Education", 15, yPosition);
    doc.line(15, yPosition + 2, 200, yPosition + 2); // Line separator
    yPosition += 10;

    doc.text("Department:", 20, yPosition);
    doc.text(student.education.department, 80, yPosition);
    yPosition += 10;

    doc.text("Course:", 20, yPosition);
    doc.text(student.education.course, 80, yPosition);
    yPosition += 20; // Increase spacing between sections

    checkPageHeight(); // Check for page overflow

    // Contact Information
    doc.text("Contact", 15, yPosition);
    doc.line(15, yPosition + 2, 200, yPosition + 2); // Line separator
    yPosition += 10;

    doc.text("Email:", 20, yPosition);
    doc.text(student.contact.email, 80, yPosition);
    yPosition += 10;

    doc.text("Phone:", 20, yPosition);
    doc.text(student.contact.phone, 80, yPosition);
    yPosition += 10;

    doc.text("Address:", 20, yPosition);
    doc.text(student.contact.address, 80, yPosition);
    yPosition += 20; // Spacing between sections

    checkPageHeight(); // Check if content exceeds page height

    // Skills
    doc.text("Skills", 15, yPosition);
    doc.line(15, yPosition + 2, 200, yPosition + 2); // Line separator
    yPosition += 10;

    student.skills.forEach((skill, index) => {
      doc.text(`${index + 1}. ${skill}`, 20, yPosition);
      yPosition += 10;
      checkPageHeight(); // Check if content fits
    });

    // Work Experience
    doc.text("Work Experience", 15, yPosition);
    doc.line(15, yPosition + 2, 200, yPosition + 2);
    yPosition += 10;

    student.workExperience.forEach((job, index) => {
      doc.text(`- ${job.title} at ${job.company}`, 20, yPosition);
      yPosition += 8;

      doc.text(`(${job.startDate} - ${job.endDate})`, 20, yPosition);
      yPosition += 8;

      doc.text(job.address, 30, yPosition);
      yPosition += 16;

      checkPageHeight(); // Check if content fits
    });

    // Education Background
    const educationStartY = yPosition;
    doc.text("Education Background", 15, educationStartY);
    doc.line(15, educationStartY + 2, 200, educationStartY + 2);
    yPosition = educationStartY + 10;

    student.educationBackground.forEach((edu, index) => {
      doc.text(`- ${edu.school}`, 20, yPosition);
      yPosition += 8;

      doc.text(`(${edu.details})`, 20, yPosition);
      yPosition += 8;

      doc.text(edu.address, 30, yPosition);
      yPosition += 16;

      doc.text(`${edu.startDate} - ${edu.endDate}`, 30, yPosition);
      yPosition += 16; // Add space after education details

      checkPageHeight(); // Check if content fits
    });

    // Save PDF
    doc.save(`${student.name.replace(/ /g, "_")}_Profile.pdf`);
  };

  return (
    <div
      ref={profileRef}
      className="container mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6"
    >
      {/* Header Section */}
      <div className="flex items-center space-x-6 border-b pb-4 mb-6">
        <img
          src={student.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{student.name}</h1>
          <p className="text-lg text-gray-600">{student.role}</p>
        </div>
        <div className="space-x-4">
          <button
            onClick={exportToPDF}
            className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600"
          >
            Export to PDF
          </button>
          <button
            onClick={() => navigate("/auth/student/edit-profile")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Sections */}
      <SectionCard title="Education">
        <p>{student.education.department}</p>
        <p>{student.education.course}</p>
      </SectionCard>

      <SectionCard title="Contact">
        <p>{student.contact.email}</p>
        <p>{student.contact.phone}</p>
        <p>{student.contact.address}</p>
      </SectionCard>

      <SectionCard title="Languages">
        <ul>
          {student.languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="About Me">
        <p>{student.aboutMe}</p>
      </SectionCard>

      <SectionCard title="Skills">
        <ul>
          {student.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Work Experience">
        {student.workExperience.map((job, index) => (
          <div className="mt-3" key={index}>
            <p>
              {job.title} at {job.company}
            </p>
            <p>
              {job.startDate} - {job.endDate}
            </p>
            <p>{job.address}</p>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Education Background">
        {student.educationBackground.map((edu, index) => (
          <div className="mt-3" key={index}>
            <p>
              {edu.school} ({edu.details})
            </p>
            <p>{edu.address}</p>
            <p>
              {edu.startDate} - {edu.endDate}
            </p>
          </div>
        ))}
      </SectionCard>
    </div>
  );
};

export default StudentProfilePage;
