import React, { useRef, useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import { formatDateOnly } from "../../utils/formatDate";
import { getFullAddress } from "../../utils/formatAddress";

const StudentProfilePage = () => {
  // Fetch Data
  const { profile } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    educations,
    work_experiences,
    program: program,
    program: { college },
    ...student
  } = profile;

  const [profilePic, setProfilePic] = useState(user.profile_url || student.profilePic);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);

      // Optional: Add upload logic here to send the file to a backend server
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    // PDF generation logic
    doc.save(`${student.name.replace(/ /g, "_")}_Profile.pdf`);
  };

  const SectionCard = ({ title, children }) => (
    <div className="p-6 border rounded-lg shadow-lg bg-gray-50 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl space-y-6">
      {/* Header Section */}
      <div className="flex items-center space-x-6 border-b pb-6 mb-6">
        <div className="relative">
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
          />
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
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
