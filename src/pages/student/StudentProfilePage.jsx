import React, { useRef } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import { formatDateOnly } from "../../utils/formatDate";
import { getFullAddress } from "../../utils/formatAddress";

const StudentProfilePage = () => {
  // Fetch Data
  const { profile } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  // Variables Container
  const {
    user,
    educations,
    work_experiences,
    program: program,
    program: { college },
    ...student
  } = profile;

  // console.log(profile);

  const SectionCard = ({ title, children }) => (
    <div className="p-6 border rounded-lg shadow-lg bg-gray-50 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div>{children}</div>
    </div>
  );

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Set Title
    doc.setFontSize(18);
    doc.text("Student Profile", 105, 20, { align: "center" });

    // Start position for content
    let yPosition = 30;

    // Helper function to add a page break if content exceeds the page height
    const checkPageHeight = () => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    };

    // Add Profile Picture
    if (student.profilePicture) {
      doc.addImage(student.profilePicture, "JPEG", 15, yPosition, 30, 30);
      yPosition += 35;
    }

    // Add Basic Information
    doc.setFontSize(12);
    doc.text("Name:", 50, yPosition);
    doc.text(student.name, 80, yPosition);
    yPosition += 10;

    doc.text("Role:", 50, yPosition);
    doc.text(student.role, 80, yPosition);
    yPosition += 20;

    checkPageHeight();

    // Current Education
    doc.text("Current Education", 15, yPosition);
    doc.line(15, yPosition + 2, 200, yPosition + 2);
    yPosition += 10;

    doc.text("Department:", 20, yPosition);
    doc.text(student.education.department, 80, yPosition);
    yPosition += 10;

    doc.text("Course:", 20, yPosition);
    doc.text(student.education.course, 80, yPosition);
    yPosition += 20;

    checkPageHeight();

    // Contact Information
    doc.text("Contact", 15, yPosition);
    doc.line(15, yPosition + 2, 200, yPosition + 2);
    yPosition += 10;

    doc.text("Email:", 20, yPosition);
    doc.text(student.contact.email, 80, yPosition);
    yPosition += 10;

    doc.text("Phone:", 20, yPosition);
    doc.text(student.contact.phone, 80, yPosition);
    yPosition += 10;

    doc.text("Address:", 20, yPosition);
    doc.text(student.contact.address, 80, yPosition);
    yPosition += 20;

    checkPageHeight();

    // Skills
    doc.text("Skills", 15, yPosition);
    doc.line(15, yPosition + 2, 200, yPosition + 2);
    yPosition += 10;

    student.skills.forEach((skill, index) => {
      doc.text(`${index + 1}. ${skill}`, 20, yPosition);
      yPosition += 10;
      checkPageHeight();
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

      checkPageHeight();
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
      yPosition += 16;

      checkPageHeight();
    });

    // Save PDF
    doc.save(`${student.name.replace(/ /g, "_")}_Profile.pdf`);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl space-y-6">
      {/* Header Section */}
      <div className="flex items-center space-x-6 border-b pb-6 mb-6">
        <img
          src={user.profile_url || student.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {user.first_name} {user.middle_name} {user.last_name}
          </h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={exportToPDF}
            className="bg-orange-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-orange-600 transition"
          >
            Export to PDF
          </button>

          <button
            onClick={() => navigate("edit", { state: { profile } })}
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <SectionCard title="Contact Information">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone_number}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {getFullAddress({
            street: user.street,
            barangay: user.barangay,
            province: user.province,
            city: user.city_municipality,
            postalCode: user.postal_code,
          })}
        </p>
      </SectionCard>

      <SectionCard title="About Me">
        <p>{student.aboutMe || "No information provided."}</p>
      </SectionCard>

      <SectionCard title="Work Experience">
        {work_experiences.map((job, index) => (
          <div className="space-y-2 mt-3" key={index}>
            <p>
              <strong>{job.job_position}</strong> at {job.company_name}
            </p>
            <p>
              <strong>Duration:</strong> {formatDateOnly(job.start_date)} -{" "}
              {formatDateOnly(job.end_date)}
            </p>
            <p>
              <strong>Location:</strong> {job.full_address}
            </p>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Education Background">
        {educations.map((edu, index) => (
          <div className="space-y-2 mt-3" key={index}>
            <p>
              <strong>{edu.school_name}</strong>
            </p>
            <p>
              <strong>Location:</strong> {edu.full_address}
            </p>
            <p>
              <strong>Duration:</strong> {formatDateOnly(edu.start_date)} -{" "}
              {formatDateOnly(edu.end_date)}
            </p>
          </div>
        ))}
      </SectionCard>
    </div>
  );
};

export default StudentProfilePage;
